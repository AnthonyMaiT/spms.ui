import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, finalize, Observable } from "rxjs";
import { StudentPoint } from "./interfaces/StudentPoint";
import { StudentPointsService } from "./services/student-points.service";

// datasrouce for accessing student point
export class StudentPointsDataSource implements DataSource<StudentPoint> {
    // subject for loading student point 
    private studentPointsSubjects = new BehaviorSubject<StudentPoint[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    // count subject to get the count of amount of student points
    private count = new BehaviorSubject<number>(0);
    // defines these as an observable stream of data
    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.count.asObservable();
    // connects to service
    constructor(private studentPointService: StudentPointsService) {}
    // makes student point an observable
    connect(collectionViewer: CollectionViewer): Observable<StudentPoint[]> {
        return this.studentPointsSubjects.asObservable()
    }
    // complete the stream of data
    disconnect(collectionViewer: CollectionViewer): void {
        this.studentPointsSubjects.complete()
        this.loadingSubject.complete()
        this.count.complete()
    }
    // loads the data into the student point subject source
    // has pagination and filters
    loadStudentPoints(pageIndex: number = 1, pageSize: number = 5, user_id: string = '', event_time_id: string = '',
        quater_range_id: string = '') {
        this.loadingSubject.next(true)
        this.studentPointService.getStudentPoints(pageIndex, pageSize, user_id, event_time_id, quater_range_id).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(data => {this.studentPointsSubjects.next(data.items); this.count.next(data.total)})
    }
}