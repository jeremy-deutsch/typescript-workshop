import * as React from "react";
import { EventData } from "../api/apiTypes";
import { fetchPopularEvents } from "../api/requests";
import Event from "./Event";

interface EventDataMap {
  [marketId: string]: EventData;
}

interface State {
  events: EventDataMap;
  selectedEvent: string | null;
}

class Menu extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      events: {},
      selectedEvent: null
    };
  }

  componentDidMount() {
    fetchPopularEvents().then(events => {
      const eventDataMap: EventDataMap = {};
      for (const event of events) {
        eventDataMap[event.id] = event;
      }
      this.setState({ events: eventDataMap });
    });
  }

  render() {
    const { events, selectedEvent } = this.state;
    const eventArray = Object.keys(events).map(id => events[id]);
    const selectedEventData =
      selectedEvent !== null ? events[selectedEvent] : null;
    return (
      <div className="container">
        <h1 className="title">What can you bet on on Smarkets?</h1>
        <div>
          <div>
            {eventArray.map(event => (
              <button
                className="eventButton"
                onClick={() => {
                  this.setState({ selectedEvent: event.id });
                }}
              >
                {event.name}
              </button>
            ))}
          </div>
          <div>
            {!!selectedEventData && (
              <Event id={selectedEventData.id} name={selectedEventData.name} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
