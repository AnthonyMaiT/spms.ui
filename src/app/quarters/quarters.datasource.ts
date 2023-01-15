import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, finalize, Observable } from "rxjs";
import { QuarterRange } from "./interfaces/quarter-range";
import { QuartersService } from "./services/quarters.service";

// datasrouce for accessing quarter-ranges
export class QuarterRangesDataSource implements DataSource<QuarterRange> {
    // subject for loading quarterranges 
    private quarterRangesSubjects = new BehaviorSubject<QuarterRange[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    // count subject to get the count of amount of users
    private count = new BehaviorSubject<number>(0);
    // defines these as an observable stream of data
    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.count.asObservable();
    // connects to service
    constructor(private quarterService: QuartersService) {}
    // makes quaterRange an observable
    connect(collectionViewer: CollectionViewer): Observable<QuarterRange[]> {
        return this.quarterRangesSubjects.asObservable()
    }
    // complete the stream of data
    disconnect(collectionViewer: CollectionViewer): void {
        this.quarterRangesSubjects.complete()
        this.loadingSubject.complete()
    }
    // loads the data into the quarter range subject source
    loadQuarterRanges(pageIndex: number = 1, pageSize: number = 5) {
        this.loadingSubject.next(true)
        this.quarterService.getQuarterRanges().pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(data => {this.quarterRangesSubjects.next(data.items); this.count.next(data.total)})
    }
}