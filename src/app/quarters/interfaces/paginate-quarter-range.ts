import { QuarterRange } from "./quarter-range";
// interface for paginatated quarter range
export interface PaginateQuarterRange {
    items: QuarterRange[]
    total: number
    page: number
    size: number
}