import { Moment } from "moment"
import { SchoolEvent } from "../../event/interfaces/event"
// interface for event time
export interface EventTime {
    id: number
    start_time: Moment
    end_time: Moment
    event_id: number
    event: SchoolEvent
}