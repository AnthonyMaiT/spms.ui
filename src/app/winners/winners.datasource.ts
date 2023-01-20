import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, finalize, Observable } from "rxjs";
import { Winner } from "./interfaces/Winner";
import { WinnersService } from "./services/winners.service";

export class WinnersDataSource implements DataSource<Winner> {
    // subject for loading winner 
    private winnersSubjects = new BehaviorSubject<Winner[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    // count subject to get the count of amount of winners
    private count = new BehaviorSubject<number>(0);
    // defines these as an observable stream of data
    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.count.asObservable();

    constructor(private winnerService: WinnersService) {} 
    // makes winnersubject as a stream
    connect(collectionViewer: CollectionViewer): Observable<readonly Winner[]> {
        return this.winnersSubjects.asObservable()
    }
    // completes the data stream
    disconnect(collectionViewer: CollectionViewer): void {
        this.winnersSubjects.complete()
        this.count.complete()
        this.loadingSubject.complete()
    }
    // get winners from db with pagination and filters
    loadWinners(pageIndex: number = 1, pageSize: number = 5, user_id: string = '',
        quarter_range_id: string = '') {
        this.loadingSubject.next(true)
        this.winnerService.getWinners(pageIndex,pageSize,quarter_range_id,user_id).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(data => {this.winnersSubjects.next(data.items), this.count.next(data.total)})
    }
}