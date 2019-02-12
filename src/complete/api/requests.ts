import * as popularEvents from "../../data/popularEvents.json";
import * as popularEventMarkets from "../../data/popularEventMarkets.json";

import { EventData, MarketData } from "./apiTypes";

export function fetchPopularEvents(): Promise<EventData[]> {
  return Promise.resolve(popularEvents.events);
}

export function fetchMarkets(eventId: string): Promise<MarketData[]> {
  const marketsForEvent = popularEventMarkets.markets.filter(
    market => market.event_id === eventId
  );
  return Promise.resolve(marketsForEvent);
}
