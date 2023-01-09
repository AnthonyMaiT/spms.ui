import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ChangePassword } from 'src/app/change-password/change-password';
import { User } from 'src/app/users/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

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

  changePassword(passwords: ChangePassword) {
    return this.http.put<User>(environment.apiUrl+'/users/change-password', passwords, {withCredentials:true})
  }
  
  // removes credentials from cookie to log out
  logout() {
    return this.http.get(environment.apiUrl+'/logout', {withCredentials: true})
  }
}
