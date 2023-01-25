import { UserPoints } from "./user-points"
// returns a paginated list of user points
export interface PagedUserPoints {
    items: UserPoints[]
    total: number
    page: number
    size: number
}