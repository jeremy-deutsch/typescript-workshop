import * as React from "react";
import { fetchMarkets } from "../api/requests";
import { MarketData } from "../api/apiTypes";

interface Props {
  id: string;
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
    fetchMarkets(this.props.id).then(markets => {
      this.setState({ markets });
    });
  }

  render() {
    return <div />;
  }
}

export default Event;
