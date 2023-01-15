import { Moment } from "moment"
// interface for updating/creating event time
export interface CreateUpdateEventTime {
    start_time: Moment
    end_time: Moment
    event_id: number
}