import * as React from "react";
import { EventData } from "../api/apiTypes";
import { fetchPopularEvents } from "../api/requests";
import Event from "./Event";

interface State {
  events: EventData[];
  selectedEvent: string | null;
}

class Menu extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      events: [],
      selectedEvent: null
    };
  }

  componentDidMount() {
    fetchPopularEvents().then(events => {
      this.setState({ events });
    });
  }

  render() {
    return (
      <div>
        <h1>What can you bet on on Smarkets?</h1>
        <div>
          <div>
            {this.state.events.map(event => (
              <button
                onClick={() => {
                  this.setState({ selectedEvent: event.id });
                }}
              >
                {event.name}
              </button>
            ))}
          </div>
          <div>
            {!!this.state.selectedEvent && (
              <Event id={this.state.selectedEvent} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
