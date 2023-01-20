import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateWinner } from '../interfaces/CreateWinner';
import { PagedWinner } from '../interfaces/PagedWinner';
import { UpdateWinner } from '../interfaces/UpdateWinner';
import { Winner } from '../interfaces/Winner';

@Injectable({
  providedIn: 'root'
})
export class WinnersService {

  constructor(private http: HttpClient) { }
  // get winners from db with pagination and filters
  getWinners(pageIndex: number = 1, pageSize: number = 5, quarter_range_id: string = '', user_id: string = '') {
    return this.http.get<PagedWinner>(environment.apiUrl+'/student-winners', {withCredentials:true,
      params: new HttpParams().set('size',pageSize)
                              .set('page', pageIndex)
                              .set('student_id', user_id)
                              .set('quarter_range_id', quarter_range_id)
    })
  }
  // add winner to db
  createWinner(winner: CreateWinner) {
    return this.http.post<Winner[]>(environment.apiUrl +'/student-winners', winner, {withCredentials: true})
  }
  // update winner in db
  updateWinner(id: number, winner: UpdateWinner) {
    return this.http.put<Winner>(environment.apiUrl+`/student-winners/${id}`, winner, {withCredentials: true})
  }
  // delete winner from db
  deleteWinner(id: number) {
    return this.http.delete(environment.apiUrl+`/student-winners/${id}`, {withCredentials: true})
  }
}
