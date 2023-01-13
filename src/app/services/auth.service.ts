import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ChangePassword } from 'src/app/app-nav/change-password/change-password';
import { User } from 'src/app/users/interfaces/user';
import { environment } from 'src/environments/environment';
import { ResetPassword } from '../users/reset-password/reset-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  current_user?: User;

  // in order to get user async
  getUser$ = this.http.get<User>(environment.apiUrl+'/users/current', {withCredentials: true})

  // connnects to api to get access token from cookie data
  // if login is successful
  login(formData: FormData) {
    return this.http.post<FormData>(environment.apiUrl+'/login', formData, {withCredentials: true})
  }

  // checks if logged in and then returns current user
  currentUser() {
    return this.http.get<User>(environment.apiUrl+'/users/current', {withCredentials: true})
  }

  // checks if the user is an admin for guards and such
  isAdmin() {
    return this.http.get<boolean>(environment.apiUrl +'/users/isadmin', {withCredentials: true})
  }
  // checks if the user is staff for guards and such
  isStaff() {
    return this.http.get<boolean>(environment.apiUrl +'/users/isstaff', {withCredentials: true})
  }
  // changes password of the user to replace old
  changePassword(passwords: ChangePassword) {
    return this.http.put<User>(environment.apiUrl+'/users/change-password', passwords, {withCredentials:true})
  }
  // resets password of user in api without having to put in old password
  resetPassword(password: ResetPassword, id:number) {
    return this.http.put<User>(environment.apiUrl+`/users/reset-password/${id}`, password, {withCredentials: true})
  }
  
  // removes credentials from cookie to log out
  logout() {
    return this.http.get(environment.apiUrl+'/logout', {withCredentials: true})
  }
}
