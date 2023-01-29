import { User } from "src/app/users/interfaces/user"
// interface for a user's step
export interface UserStep {
    id: number
    user_id: number
    user: User
    step: string
}