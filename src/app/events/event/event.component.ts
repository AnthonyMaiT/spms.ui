import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserConfirmationDialogComponent } from 'src/app/shared/user-confirmation-dialog/user-confirmation-dialog.component';
import { CreateUpdateEventComponent } from './create-update-event/create-update-event.component';
import { EventsDataSource } from './event.datasource';
import { EventService } from './services/event.service';
import { SchoolEvent } from './interfaces/event';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, tap } from 'rxjs';
import { User } from 'src/app/users/interfaces/user';

@Component({
  selector: 'spms-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, AfterViewInit {

  user!: User

  // checks if the current user is admin for features
  isAdmin: boolean = false
  // columns to be displayed on datatable
  displayedColumns: string[] = ['id', 'name', 'is_sport', 'actions']
  // for displaying/not displaying actions column
  columnsToDisplay: string[] = this.displayedColumns.slice()
  //datasource of the table
  dataSource!: EventsDataSource
  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // services and other components
  constructor(private eventService: EventService, public dialog: MatDialog, private authService: AuthService,
    private snackBar: MatSnackBar) { this.user = this.authService.userValue }
  // when app is ran, load datasource
  ngOnInit(): void {
    this.dataSource = new EventsDataSource(this.eventService)
    this.dataSource.loadEvents(1, 5)

    //checks if admin and sets to var
    // would remove actions from columns to display
    if (this.user) {
      if (this.user.role_type_id == 1) {
        this.isAdmin = true
      }
    }    }

  ngAfterViewInit() {
    // would be delayed by 100 ms after paginator events happen then would load events 
    this.paginator.page.pipe(debounceTime(100),
      tap(() => this.loadEvents())).subscribe()
  }

  // to open create event dialog then loads event after
  createEvent() {
    const dialogRef = this.dialog.open(CreateUpdateEventComponent, {
      height: '240px',
      width: '475px',
    })
    // once closed, load event in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadEvents() })
  }


  // to open edit event dialog and loads event after
  editEvent(event: SchoolEvent) {
    // would open the component with specified height/width and data passed into it
    const dialogRef = this.dialog.open(CreateUpdateEventComponent, {
      height: '240px',
      width: '475px',
      data: event
    })
    // once closed, load event in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadEvents() })
  }

  // delets event from db
  deleteEvent(id: number) {
    // opens confirmation dialog and would load event time after submit
    const dialogRef = this.dialog.open(UserConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete event?"

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.deleteEvent(id).subscribe(() => {
          this.loadEvents()
          this.snackBar.open('Successfully Deleted Event', '', {
            duration: 3000,
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          })
        })
      }
    });
  }

  // load events from datasource with pagination
  loadEvents() {
    this.dataSource.loadEvents(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    )
  }



}
