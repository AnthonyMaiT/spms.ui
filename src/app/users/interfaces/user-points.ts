import { UserPointOut } from "src/app/student-points/interfaces/UserPointOut";
// inteface for returning users with number of points for the quarter
export interface UserPoints {
    User: UserPointOut
    points: number
}