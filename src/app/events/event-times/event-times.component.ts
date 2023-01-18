import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EventSelectorComponent } from 'src/app/shared/event-selector/event-selector.component';
import { QuarterRangeSelectorComponent } from 'src/app/shared/quarter-range-selector/quarter-range-selector.component';
import { UserConfirmationDialogComponent } from 'src/app/shared/user-confirmation-dialog/user-confirmation-dialog.component';
import { CreateUpdateEventTimesComponent } from './create-update-event-times/create-update-event-times.component';
import { EventTimesDataSource } from './event-times.datasource';
import { EventTime } from './interfaces/event-time';
import { EventTimesService } from './services/event-times.service';

@Component({
  selector: 'spms-event-times',
  templateUrl: './event-times.component.html',
  styleUrls: ['./event-times.component.scss']
})
export class EventTimesComponent implements OnInit, AfterViewInit {
  // checks if the current user is admin for features
  isAdmin: boolean = false
  // columns to be displayed on datatable
  displayedColumns: string[] = ['id', 'event.name', 'event.is_sport','start_time', 'end_time', 'actions']
  // for displaying/not displaying actions column
  columnsToDisplay: string[] = this.displayedColumns.slice()
  //datasource of the table
  dataSource!: EventTimesDataSource
  // filters for datatable
  quarter_name = ''
  event_name = ''
  quarter_range_id = ''
  event_id = ''
  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // services and other components
  constructor(private eventTimeService: EventTimesService, public dialog: MatDialog, private authService: AuthService,
    private snackBar: MatSnackBar) { }

  // when app is ran, load datasource
  ngOnInit(): void {
    this.dataSource = new EventTimesDataSource(this.eventTimeService)
    this.dataSource.loadEventTimes(1, 5)

    //checks if admin and sets to var
    // would remove actions from columns to display
    this.authService.isAdmin().subscribe(() => { this.isAdmin = true }, () => { this.isAdmin = false; this.columnsToDisplay.pop() })
  }

  ngAfterViewInit() {
    // would be delayed by 100 ms after paginator events happen then would load events 
    this.paginator.page.pipe(debounceTime(100),
      tap(() => this.loadEventTimes())).subscribe()
  }

  // to open create event time dialog then loads event times after
  createEventTime() {
    const dialogRef = this.dialog.open(CreateUpdateEventTimesComponent, {
      height: '350px',
      width: '475px',
    })
    // once closed, load event time in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadEventTimes() })
  }

  // to open edit event dialog and loads event after
  editEventTime(eventTime: EventTime) {
    // would open the component with specified height/width and data passed into it
    const dialogRef = this.dialog.open(CreateUpdateEventTimesComponent, {
      height: '350px',
      width: '475px',
      data: eventTime
    })
    // once closed, load event time in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadEventTimes() })
  }

  // delets event time from db
  deleteEventTime(id: number) {
    // opens confirmation dialog and would load event time after submit
    const dialogRef = this.dialog.open(UserConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete event time?"

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventTimeService.deleteEventTime(id).subscribe(() => {
          this.loadEventTimes()
          this.snackBar.open('Successfully Deleted Event Time', '', {
            duration: 3000,
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          })
        })
      }
    });
  }

  // load events from datasource with pagination
  loadEventTimes() {
    this.dataSource.loadEventTimes(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.event_id,
      this.quarter_range_id
    )
  }

  // opens dialog to select quarter range
  openSelectQuarterRange() {
    const dialogRef2 = this.dialog.open(QuarterRangeSelectorComponent, {
      width: '500px'
    })
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.quarter_name = data.quarter.quarter
        this.quarter_range_id = data.id
        this.loadEventTimes()
      }
    })
  }
  // removes filter from query
  removeQuarterFilter() {
    this.quarter_name = ''
    this.quarter_range_id = ''
    this.loadEventTimes()
  }

  // open select event to choose event for event time
  openSelectEvent() {
    const dialogRef2 = this.dialog.open(EventSelectorComponent)
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.event_name = data.name
        this.event_id = data.id
        this.loadEventTimes()
      }
    })
  }
  // removes filter from query
  removeEventFilter() {
    this.event_name = ''
    this.event_id = ''
    this.loadEventTimes()
  }


}
