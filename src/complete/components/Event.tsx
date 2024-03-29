import React from "react";
import { fetchMarkets } from "../api/requests";
import { MarketData, EventType } from "../api/apiTypes";

interface Props {
  id: string;
  name: string;
  type: string;
}

interface State {
  markets: MarketData[];
}

class Event extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      markets: []
    };
  }

  componentDidMount() {
    this.fetchMarketsForId(this.props.id);
  }
  componentDidUpdate(prevProps: Props) {
    if (this.props.id !== prevProps.id) {
      this.fetchMarketsForId(this.props.id);
    }
  }

  fetchMarketsForId(id: string) {
    fetchMarkets(id).then(markets => {
      this.setState({ markets });
    });
  }

  render() {
    const { markets } = this.state;
    const { name, type } = this.props;
    const typeName = isEventType(type) && eventTypeMapping[type];
    return (
      <div>
        <h2>{name}</h2>
        <h4>Type: </h4>
        {typeName}
        <h4>Markets:</h4>
        <ul>
          {markets.map(market => (
            <li key={market.id}>
              {market.name} (volume: {volumeAdjective(market.volume)})
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function volumeAdjective(volume: number | null) {
  if (volume === null) return "N/A";
  if (volume === 0) return "none";
  if (volume < 100) return "very little";
  if (volume < 800) return "some";
  if (volume < 3000) return "moderate";
  if (volume < 20000) return "a lot";
  if (volume < 80000) return "hot";
  return "super hot";
}

function isEventType(type: string): type is EventType {
  return Object.values(EventType).includes(type);
}

const eventTypeMapping = {
  [EventType.FOOTBALL]: "Football",
  [EventType.POLITICS]: "Politics",
  [EventType.CRICKET]: "Cricket"
};

export default Event;
