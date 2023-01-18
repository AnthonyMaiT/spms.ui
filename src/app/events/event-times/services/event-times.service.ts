import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SchoolEvent } from '../../event/interfaces/event';
import { CreateUpdateEventTime } from '../interfaces/create-update-event-times';
import { EventTime } from '../interfaces/event-time';
import { PaginateEventTime } from '../interfaces/paginate-event-times';

@Injectable({
  providedIn: 'root'
})
export class EventTimesService {
  getRecentEventTimes$ = this.http.get<EventTime[]>(environment.apiUrl+'/event-times/current', {withCredentials: true})
  // connects to httpclient to pass in data to api
  constructor(private http: HttpClient) { }
  // gets all event times
  getEventTimes(pageIndex: number = 1, pageSize: number = 5, event_id: string = '', quarter_range_id: string ='') {
    return this.http.get<PaginateEventTime>(environment.apiUrl + '/event-times', {
      withCredentials: true,
      params: new HttpParams().set('size', pageSize)
        .set('page', pageIndex)
        .set('event_id', event_id)
        .set('quarter_range_id', quarter_range_id)
    })
  }
  // pass in data to api to create an event time
  createEventTime(eventTime: CreateUpdateEventTime) {
    return this.http.post<EventTime>(environment.apiUrl + '/event-times', eventTime, { withCredentials: true })
  }
  // updates an event time in api
  updateEventTime(id: number, eventTime: CreateUpdateEventTime) {
    return this.http.put<EventTime>(environment.apiUrl + `/event-times/${id}`, eventTime, { withCredentials: true })
  }
  // delete an event time in api
  deleteEventTime(id: number) {
    return this.http.delete(environment.apiUrl + `/event-times/${id}`, { withCredentials: true })
  }
  // get the current events ongoing 
  getRecentEventTimes() {
    return this.http.get<EventTime[]>(environment.apiUrl+'/event-times/current', {withCredentials: true})
  }
}
