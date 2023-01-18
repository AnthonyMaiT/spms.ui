import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, finalize, Observable } from "rxjs";
import { EventTime } from "./interfaces/event-time";
import { EventTimesService } from "./services/event-times.service";

// datasource for accessing event times
export class EventTimesDataSource implements DataSource<EventTime> {
    // subject for loading event times
    private eventTimeSubjects = new BehaviorSubject<EventTime[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    // sets loading as an observable
    // count subject to get the count of amount of users
    private count = new BehaviorSubject<number>(0);
    // defines these as an observable stream of data
    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.count.asObservable();
    // connects to service
    constructor(private eventTimeService: EventTimesService) { }
    // makes event an observable
    connect(collectionViewer: CollectionViewer): Observable<EventTime[]> {
        return this.eventTimeSubjects.asObservable()
    }
    // complete the stream of data
    disconnect(collectionViewer: CollectionViewer): void {
        this.eventTimeSubjects.complete()
        this.loadingSubject.complete()
        this.count.complete()
    }
    // loads the data into the event times subject source
    // has filters 
    loadEventTimes(pageIndex: number = 1, pageSize: number = 5, event_id: string = '', quarter_range_id: string = '') {
        this.loadingSubject.next(true)
        this.eventTimeService.getEventTimes(pageIndex, pageSize, event_id, quarter_range_id).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(data => { this.eventTimeSubjects.next(data.items); this.count.next(data.total) })
    }
}