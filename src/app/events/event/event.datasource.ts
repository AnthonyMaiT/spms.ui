import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, finalize, Observable } from "rxjs";
import { EventService } from "./services/event.service";
import { SchoolEvent } from './interfaces/event';

// datasource for accessing events
export class EventsDataSource implements DataSource<SchoolEvent> {
    // subject for loading events 
    private eventSubjects = new BehaviorSubject<SchoolEvent[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    // sets loading as an observable
    // count subject to get the count of amount of users
    private count = new BehaviorSubject<number>(0);
    // defines these as an observable stream of data
    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.count.asObservable();
    // connects to service
    constructor(private eventService: EventService) { }
    // makes event an observable
    connect(collectionViewer: CollectionViewer): Observable<SchoolEvent[]> {
        return this.eventSubjects.asObservable()
    }
    // complete the stream of data
    disconnect(collectionViewer: CollectionViewer): void {
        this.eventSubjects.complete()
        this.loadingSubject.complete()
        this.count.complete()
    }
    // loads the data into the events subject source
    loadEvents(pageIndex: number = 1, pageSize: number = 5, nameFilter: string='') {
        this.loadingSubject.next(true)
        this.eventService.getEvents(pageIndex, pageSize, nameFilter).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(data => { this.eventSubjects.next(data.items); this.count.next(data.total) })
    }
}