import { Prize } from "src/app/prizes/interfaces/Prizes"
import { QuarterRange } from "src/app/quarters/interfaces/quarter-range"
import { UserPointOut } from "src/app/student-points/interfaces/UserPointOut"
// interface for winner
export interface Winner {
    id: number
    top_points: boolean
    user_id: number
    points: number
    user: UserPointOut
    quarter_range_id: number
    quarter_range: QuarterRange
    prize_id: number
    prize: Prize
}