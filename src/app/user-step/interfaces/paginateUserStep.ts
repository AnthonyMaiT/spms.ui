import { UserStep } from "./userStep"
// paginated user step for datasource
export interface PaginateUserStep {
    items: UserStep[]
    total: number
    page: number
    size: number
  }