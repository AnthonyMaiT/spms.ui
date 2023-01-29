import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUserStep } from '../interfaces/createUserStep';
import { PaginateUserStep } from '../interfaces/paginateUserStep';
import { UserStep } from '../interfaces/userStep';

@Injectable({
  providedIn: 'root'
})
export class UserStepsService {

  constructor(private http: HttpClient) { }

  // get a paginated query of steps from api
  getSteps(pageIndex: number = 1, pageSize: number = 5, user_id: string = '') {
    return this.http.get<PaginateUserStep>(environment.apiUrl+'/user-steps', {withCredentials: true,
      params: new HttpParams().set('user_id', user_id)
                              .set('size', pageSize)
                              .set('page', pageIndex)
    })
  }

  // creates a user step
  createStep(step: CreateUserStep) {
    return this.http.post<UserStep>(environment.apiUrl+'/user-steps', step, {withCredentials: true})
  }
}
