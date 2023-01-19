import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, finalize, Observable } from "rxjs";
import { Prize } from "./interfaces/Prizes";
import { PrizesService } from "./services/prizes.service";

export class PrizesDataSource implements DataSource<Prize> {
    // subjects for prizes, loading, and count
    private prizeSubjects = new BehaviorSubject<Prize[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private count = new BehaviorSubject<number>(0)
    // sets loading/count as observable
    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.count.asObservable();
    // connects to prize service
    constructor(private prizeService: PrizesService) {}
    // makes prize subject an observable
    connect(collectionViewer: CollectionViewer): Observable<Prize[]> {
        return this.prizeSubjects.asObservable();
    }
    // completes observable stream for subjects
    disconnect(collectionViewer: CollectionViewer): void {
        this.prizeSubjects.complete()
        this.count.complete()
        this.loadingSubject.complete()
    }
    // loads prizes from service with pagination and filters
    loadPrizes(pageIndex: number = 1, pageSize: number =5, nameFilter: string='') {
        this.loadingSubject.next(true)
        this.prizeService.getPrizes(pageIndex, pageSize, nameFilter).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(data => {this.prizeSubjects.next(data.items); this.count.next(data.total)})
    }
}