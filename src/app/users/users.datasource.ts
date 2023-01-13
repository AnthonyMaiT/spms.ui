import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, finalize, Observable } from "rxjs";
import { User } from "./interfaces/user";
import { UsersService } from "./services/users.service";

// datasource for admin to access data
export class UsersDataSource implements DataSource<User> {
  // userSubject for dataSource. List of Users
  private usersSubject = new BehaviorSubject<User[]>([]);
  // loading subject to check if loading data
  private loadingSubject = new BehaviorSubject<boolean>(false);
  // count subject to get the count of amount of users
  private count = new BehaviorSubject<number>(0);
  // defines these as an observable stream of data
  public loading$ = this.loadingSubject.asObservable();
  public count$ = this.count.asObservable();
  // constructor to connect to the user service
  constructor(private usersService: UsersService) { }
  // connects to the user subject as an data stream
  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable()
  }
  // disconnects all active observable streams
  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete()
    this.loadingSubject.complete()
    this.count.complete()
  }
  // loads in users with filters, pagination, and sorting for params
  loadUsers(usernameFilter: string = '', firstNameFilter: string = '',
    lastNameFilter: string = '', gradeFilter?: number, roleTypeIdFilter?: number, pageIndex: number = 1, pageSize: number = 5,
    sortDir: string = 'desc', sortColumn: string = 'id') {
    // as source is data source is loading, would return true
    this.loadingSubject.next(true)
    // gets users from api service
    this.usersService.getUsers(
      usernameFilter,
      firstNameFilter,
      lastNameFilter,
      gradeFilter,
      roleTypeIdFilter,
      pageIndex,
      pageSize,
      sortDir,
      sortColumn
    ).pipe(finalize(() => this.loadingSubject.next(false))) // loading is back to false
      .subscribe(data => { this.usersSubject.next(data.items); this.count.next(data.total) }) // sets count and usersSubject from api
  }
}