import { User } from "./user"
// interface for getting all users and total amount of them
export interface PaginateUser {
    items: User[]
    total: number
    page: number
    size: number
  }