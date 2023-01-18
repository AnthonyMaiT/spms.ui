import { EventTime } from "src/app/events/event-times/interfaces/event-time"
import { QuarterRange } from "src/app/quarters/interfaces/quarter-range"
import { UserPointOut } from "./UserPointOut"
// student point interface
export interface StudentPoint {
    id: number
    user_id: number
    user: UserPointOut
    event_time_id: number
    event_time: EventTime
    quarter_range_id: number
    quarter_range: QuarterRange
}