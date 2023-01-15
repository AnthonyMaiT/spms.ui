import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUpdateEvent } from '../interfaces/create-update-event';
import { SchoolEvent } from '../interfaces/event';
import { PaginateEvent } from '../interfaces/paginate_event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  // connects to httpclient to pass in data to api
  constructor(private http: HttpClient) { }

  // gets all events
  getEvents(pageIndex: number = 1, pageSize: number = 5, nameFilter: string = '') {
    return this.http.get<PaginateEvent>(environment.apiUrl + '/events', { withCredentials: true,
      params: new HttpParams().set('size',pageSize)
                              .set('page', pageIndex)
                              .set('nameFilter', nameFilter)
    })
  }
  // pass in data to api to create an event
  createEvent(event: CreateUpdateEvent) {
    return this.http.post<SchoolEvent>(environment.apiUrl + '/events', event, { withCredentials: true })
  }
  // updates an event in api
  updateEvent(id: number, event: CreateUpdateEvent) {
    return this.http.put<SchoolEvent>(environment.apiUrl + `/events/${id}`, event, { withCredentials: true })
  }
  // delete an event in api
  deleteEvent(id: number) {
    return this.http.delete(environment.apiUrl + `/events/${id}`, { withCredentials: true })
  }
}