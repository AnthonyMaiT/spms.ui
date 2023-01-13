// interface for  Users
import { RoleType } from "./role_type"

export interface User {
    id: number
    username: string
    first_name: string
    last_name: string
    created_at: string
    grade: any
    edited_at: string
    role_type_id: number
    role_type: RoleType
  }