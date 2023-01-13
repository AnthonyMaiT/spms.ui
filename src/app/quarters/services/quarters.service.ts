import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUpdateQuarterRange } from '../interfaces/create-update-quarter-range';
import { Quarter } from '../interfaces/quarter';
import { QuarterRange } from '../interfaces/quarter-range';

@Injectable({
  providedIn: 'root'
})
export class QuartersService {

  // connects to httpclient to pass in data to api
  constructor(private http: HttpClient) { }

  // gets all four quarters fron api
  getQuarters$ = this.http.get<Quarter[]>(environment.apiUrl+'/quarters', {withCredentials: true})
  // gets all quarter ranges
  getQuarterRanges() {
    return this.http.get<QuarterRange[]>(environment.apiUrl+'/quarter-ranges', {withCredentials: true})
  }
  // pass in data to api to create a quarter range
  createQuarterRange(quarterRange: CreateUpdateQuarterRange) {
    return this.http.post<QuarterRange>(environment.apiUrl+'/quarter-ranges', quarterRange, {withCredentials: true})
  }
  // updates a quarter range in api
  updateQuarterRange(id:number, quarterRange: CreateUpdateQuarterRange) {
    return this.http.put<QuarterRange>(environment.apiUrl+`/quarter-ranges/${id}`, quarterRange, {withCredentials: true})
  }
  // delete a quarter range in api
  deleteQuarterRange(id: number) {
    return this.http.delete(environment.apiUrl+`/quarter-ranges/${id}`, {withCredentials: true})
  }
}
