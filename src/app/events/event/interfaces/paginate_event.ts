import { SchoolEvent } from "./event"
// paginate event interface
export interface PaginateEvent {
    items: SchoolEvent[]
    total: number
    page: number
    size: number
  }