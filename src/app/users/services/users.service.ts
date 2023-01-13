import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUser } from '../interfaces/create_user';
import { PaginateUser } from '../interfaces/paginate_user';
import { RoleType } from '../interfaces/role_type';
import { UpdateUser } from '../interfaces/update_user';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // connects to http client to pass in http request to api
  constructor(private http: HttpClient) { }

  // get a role type stream 
  getRoleTypes$ = this.http.get<RoleType[]>(environment.apiUrl+'/users/role-types', {withCredentials: true})

  // gets user from api using paramters to filter, sort, and paginate
  getUsers(usernameFilter: string = '', firstNameFilter: string = '',
  lastNameFilter: string = '', gradeFilter?: number, roleTypeIdFilter?: number, pageIndex: number = 1, 
  pageSize: number = 5, sortDir: string = 'desc', sortColumn: string = 'id') {
    // each would set parameters for http request.
    // each if statements are based on the roletypeid filter and the grade filter as they can be null
    if (roleTypeIdFilter && gradeFilter) {
      return this.http.get<PaginateUser>(environment.apiUrl+'/users', {withCredentials:true,
        params: new HttpParams().set('usernameFilter', usernameFilter)
                                .set('firstNameFilter', firstNameFilter)
                                .set('lastNameFilter', lastNameFilter)
                                .set('roleTypeIdFilter', roleTypeIdFilter)
                                .set('gradeFilter', gradeFilter)
                                .set('size', pageSize)
                                .set('page', pageIndex)
                                .set('sortDir', sortDir)
                                .set('sortColumn', sortColumn)
      })
    } else if (gradeFilter) {
      return this.http.get<PaginateUser>(environment.apiUrl+'/users', {withCredentials:true,
        params: new HttpParams().set('usernameFilter', usernameFilter)
                                .set('firstNameFilter', firstNameFilter)
                                .set('lastNameFilter', lastNameFilter)
                                .set('gradeFilter', gradeFilter)
                                .set('size', pageSize)
                                .set('page', pageIndex)
                                .set('sortDir', sortDir)
                                .set('sortColumn', sortColumn)
      })
    } else if (roleTypeIdFilter) {
      return this.http.get<PaginateUser>(environment.apiUrl+'/users', {withCredentials:true,
        params: new HttpParams().set('usernameFilter', usernameFilter)
                                .set('firstNameFilter', firstNameFilter)
                                .set('lastNameFilter', lastNameFilter)
                                .set('roleTypeIdFilter', roleTypeIdFilter)
                                .set('size', pageSize)
                                .set('page', pageIndex)
                                .set('sortDir', sortDir)
                                .set('sortColumn', sortColumn)
      })
    }
    return this.http.get<PaginateUser>(environment.apiUrl+'/users', {withCredentials:true,
      params: new HttpParams().set('usernameFilter', usernameFilter)
                              .set('firstNameFilter', firstNameFilter)
                              .set('lastNameFilter', lastNameFilter)
                              .set('size', pageSize)
                              .set('page', pageIndex)
                              .set('sortDir', sortDir)
                              .set('sortColumn', sortColumn)
    })
  }

  // makes post request to api to add user to db
  createUser(user: CreateUser) {
    return this.http.post<User>(environment.apiUrl+'/users', user, {withCredentials:true})
  }

  // makes put request to api to update user in db
  updateUser(user: UpdateUser, id: number) {
    return this.http.put<User>(environment.apiUrl+`/users/${id}`, user, {withCredentials:true})
  }

  // deletes user from db through connecting to api
  deleteUser(id: number) {
    return this.http.delete(environment.apiUrl+`/users/${id}`, {withCredentials:true})
  }
}
