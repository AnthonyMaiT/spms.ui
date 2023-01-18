import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateEditStudentPoint } from '../interfaces/CreateEditStudentPoint';
import { PagedStudentPoint } from '../interfaces/PagedStudentPoint';
import { StudentPoint } from '../interfaces/StudentPoint';

@Injectable({
  providedIn: 'root'
})
export class StudentPointsService {

  constructor(private http: HttpClient) { }
  // gets the student points from db with filters and pagination
  getStudentPoints(pageIndex: number = 1, pageSize: number = 5, user_id: string = '', event_time_id: string = '', quarter_range_id: string ='') {
    return this.http.get<PagedStudentPoint>(environment.apiUrl+'/student-points', {withCredentials:true,
      params: new HttpParams().set('size',pageSize)
                              .set('page', pageIndex)
                              .set('student_id', user_id)
                              .set('event_time_id', event_time_id)
                              .set('quarter_range_id', quarter_range_id)
    })
  }
  // adds point to db
  createPoint(studentPoint: CreateEditStudentPoint) {
    return this.http.post<StudentPoint>(environment.apiUrl +'/student-points', studentPoint, {withCredentials: true})
  }
  // updates point in db
  updateStudentPoint(id: number, studentPoint: CreateEditStudentPoint) {
    return this.http.put<StudentPoint>(environment.apiUrl+`/student-points/${id}`, studentPoint, {withCredentials: true})
  }
  // delelets point from db
  deleteStudentPoint(id:number) {
    return this.http.delete(environment.apiUrl+`/student-points/${id}`, {withCredentials: true})
  }
}
