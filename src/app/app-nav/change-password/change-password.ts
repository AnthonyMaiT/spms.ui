// change password interface to put into api
export interface ChangePassword {
    current_password: string
    new_password: string
    confirm_new_password: string
}