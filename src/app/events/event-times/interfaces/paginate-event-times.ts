import { EventTime } from "./event-time"
// paginated event time interface
export interface PaginateEventTime {
    items: EventTime[]
    total: number
    page: number
    size: number
  }