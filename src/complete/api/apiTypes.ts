export type EventState = "upcoming" | "live" | "halted";

export interface EventData {
  bettable: boolean;
  created: string;
  description: string | null;
  display_order: number | null;
  end_date: string | null;
  full_slug: string;
  id: string;
  inplay_enabled: boolean;
  modified: string;
  name: string;
  parent_id: string | null;
  short_name: string | null;
  slug: string;
  special_rules: string | null;
  start_date: string | null;
  start_datetime: string;
  state: string;
  type: string;
}

export type MarketState = "open" | "live" | "closed";

export interface MarketData {
  bet_delay: number;
  category: string;
  complete: boolean;
  contract_selections: null;
  description: string | null;
  display_order: number | null;
  event_id: string;
  id: string;
  inplay_enabled: boolean;
  market_type: {
    name: string;
    param?: string;
  } | null;
  name: string;
  slug: string;
  state: string;
  volume: number | null;
  winner_count: number | null;
}

export interface PopularEventsResult {
  events: EventData[];
}
