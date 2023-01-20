import { Winner } from "./Winner"
// interface for winner pagination
export interface PagedWinner {
    items: Winner[]
    total: number
    page: number
    size: number
}