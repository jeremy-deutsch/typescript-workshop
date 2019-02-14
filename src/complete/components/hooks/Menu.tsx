import React, { useState, useEffect } from "react";
import { EventData } from "../../api/apiTypes";
import { fetchPopularEvents } from "../../api/requests";
import Event from "./Event";

interface EventDataMap {
  [marketId: string]: EventData;
}

function Menu() {
  const [events, setEvents] = useState<EventDataMap>({});
  useEffect(() => {
    fetchPopularEvents().then(events => {
      const eventDataMap: EventDataMap = {};
      for (const event of events) {
        eventDataMap[event.id] = event;
      }
      setEvents(eventDataMap);
    });
  }, [setEvents]);

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const eventArray = Object.keys(events).map(id => events[id]);
  const selectedEventData =
    selectedEvent !== null ? events[selectedEvent] : null;
  return (
    <div className="container">
      <h1 className="title">What can you bet on on Smarkets?</h1>
      <div>
        <div className="eventButtons">
          {eventArray.map(event => (
            <button
              className="eventButton"
              onClick={() => {
                setSelectedEvent(event.id);
              }}
            >
              {event.name}
            </button>
          ))}
        </div>
        <div>
          {!!selectedEventData && (
            <Event
              id={selectedEventData.id}
              name={selectedEventData.name}
              type={selectedEventData.type}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
