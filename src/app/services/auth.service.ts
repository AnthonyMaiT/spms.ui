import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { ChangePassword } from 'src/app/app-nav/change-password/change-password';
import { User } from 'src/app/users/interfaces/user';
import { environment } from 'src/environments/environment';
import { ResetPassword } from '../users/reset-password/reset-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>
  public user!: Observable<User | null>

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'))
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  // connnects to api to get access token from cookie data
  // if login is successful
  login(formData: FormData) {
    return this.http.post<User>(environment.apiUrl + '/login', formData, { withCredentials: true }).pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user))
      this.userSubject.next(user);
      return user
    }))
  }

  // changes password of the user to replace old
  changePassword(passwords: ChangePassword) {
    return this.http.put<User>(environment.apiUrl + '/users/change-password', passwords, { withCredentials: true })
  }
  // resets password of user in api without having to put in old password
  resetPassword(password: ResetPassword, id: number) {
    return this.http.put<User>(environment.apiUrl + `/users/reset-password/${id}`, password, { withCredentials: true })
  }

  // removes credentials from cookie to log out
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(JSON.parse('{}'))
    return this.http.get(environment.apiUrl + '/logout', { withCredentials: true })
  }
}
