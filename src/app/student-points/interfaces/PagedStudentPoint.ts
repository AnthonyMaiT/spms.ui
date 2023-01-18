import { StudentPoint } from "./StudentPoint"
// student point paged
export interface PagedStudentPoint {
    items: StudentPoint[]
    total: number
    page: number
    size: number
}