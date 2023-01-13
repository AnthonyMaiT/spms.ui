// interface to use when creating user
export interface CreateUser {
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    role_type_id: number,
    grade?: number
}