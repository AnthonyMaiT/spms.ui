import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, finalize, Observable } from "rxjs";
import { UserStep } from "./interfaces/userStep";
import { UserStepsService } from "./services/user-steps.service";

export class UserStepsDataSource implements DataSource<UserStep> {
    // subjects for user steps, loading, and count
    private userStepsSubjects = new BehaviorSubject<UserStep[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private count = new BehaviorSubject<number>(0)
    // sets loading/count as observable
    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.count.asObservable();
    // connects to user step service
    constructor(private userStepService: UserStepsService) {}
    // makes user step subject an observable
    connect(collectionViewer: CollectionViewer): Observable<UserStep[]> {
        return this.userStepsSubjects.asObservable();
    }
    // completes observable stream for subjects
    disconnect(collectionViewer: CollectionViewer): void {
        this.userStepsSubjects.complete()
        this.count.complete()
        this.loadingSubject.complete()
    }
    // loads steps from service with pagination and filters
    loadSteps(pageIndex: number = 1, pageSize: number =5, user_id: string = '') {
        this.loadingSubject.next(true)
        this.userStepService.getSteps(pageIndex, pageSize, user_id).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(data => {this.userStepsSubjects.next(data.items); this.count.next(data.total)})
    }
}