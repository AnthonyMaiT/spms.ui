// interface to update users
export interface UpdateUser {
    username: string,
    first_name: string,
    last_name: string,
    role_type_id: number,
    grade?: number
}