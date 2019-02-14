import * as popularEvents from "../data/popularEvents.json";
import * as popularEventMarkets from "../data/popularEventMarkets.json";

export function fetchPopularEvents() {
  return Promise.resolve(popularEvents.events);
}

export function fetchMarkets(eventId) {
  const marketsForEvent = popularEventMarkets.markets.filter(
    market => market.event_id === eventId
  );
  return Promise.resolve(marketsForEvent);
}
