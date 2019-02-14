import * as React from "react";
import { fetchMarkets } from "../api/requests";
import { MarketData } from "../api/apiTypes";

interface Props {
  id: string;
  name: string;
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
    const { name } = this.props;
    return (
      <div>
        <h3>{name}</h3>
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

export default Event;
