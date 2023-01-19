import { Prize } from "./Prizes"
// prize interface with pagination
export interface PaginatePrizes {
    items: Prize[]
    total: number
    page: number
    size: number
  }