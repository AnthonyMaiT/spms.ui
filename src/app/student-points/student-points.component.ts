import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { debounceTime, tap } from 'rxjs';
import { QuartersService } from '../quarters/services/quarters.service';
import { AuthService } from '../services/auth.service';
import { LeaderboardService } from '../services/leaderboard.service';
import { EventTimeSelectorComponent } from '../shared/event-time-selector/event-time-selector.component';
import { QuarterRangeSelectorComponent } from '../shared/quarter-range-selector/quarter-range-selector.component';
import { UserConfirmationDialogComponent } from '../shared/user-confirmation-dialog/user-confirmation-dialog.component';
import { UserSelectorComponent } from '../shared/user-selector/user-selector.component';
import { PagedUserPoints } from '../users/interfaces/paged-user-points';
import { UserPoints } from '../users/interfaces/user-points';
import { Winner } from '../winners/interfaces/Winner';
import { CreateEditStudentPointComponent } from './create-edit-student-point/create-edit-student-point.component';
import { StudentPoint } from './interfaces/StudentPoint';
import { StudentPointsService } from './services/student-points.service';
import { StudentPointsDataSource } from './student-point.datasource';

@Component({
  selector: 'spms-student-points',
  templateUrl: './student-points.component.html',
  styleUrls: ['./student-points.component.scss']
})
export class StudentPointsComponent implements OnInit, AfterViewInit {
  // checks if the current user is admin for features
  isAdmin: boolean = false
  // columns to be displayed in db
  displayedColumns: string[] = ['id', 'event_name', 'start_time', 'end_time', 'student_name', 'actions'];
  // for displaying/not displaying actions column
  columnsToDisplay: string[] = this.displayedColumns.slice()
  // datasource of table
  dataSource!: StudentPointsDataSource
  // filters for datatable
  student_name: string = ''
  event_name: string = ''
  quarter_name: string = ''
  user_id: string = ''
  event_time_id: string = ''
  quarter_range_id: string = ''

  pagedPoints!: PagedUserPoints
  points!: UserPoints[]
  userPoints: number = 0
  // used to show user points
  showCurrentPoints = true;

  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // services and other components
  constructor(private studentPointService: StudentPointsService, public dialog: MatDialog, private authService: AuthService,
    private snackBar: MatSnackBar, private quarterService: QuartersService, private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.dataSource = new StudentPointsDataSource(this.studentPointService)

    // gets the current quarter for filtering it
    this.quarterService.getCurrentQuarter().subscribe((data) => {
      if (data) {
        this.quarter_name = data.quarter.quarter;
        this.quarter_range_id = data.id.toString();
        this.dataSource.loadStudentPoints(1, 5, this.user_id, this.event_time_id, this.quarter_range_id)

        // gets the leaderboard from the service and set to var
        this.leaderboardService.getLeaderboard(1, 5, data.id.toString()).subscribe((data) => {
          if (data) {
            this.pagedPoints = data
            this.points = data.items
          }
        }, (error) => {

        })
        // gets the current user points if there are any
        this.leaderboardService.getUserPoints(data.id.toString()).subscribe((data) => {
          this.userPoints = data.points
          this.showCurrentPoints = true
        }, (error) => {
          if (error.error.detail == 'No student points found for user') {
            this.showCurrentPoints = true
          } else {
            this.showCurrentPoints = false;
          }
        })
      }
    }, (error) => {
      this.dataSource.loadStudentPoints(1, 5, '0')
    })

    // checks if admin and sets to var
    // would remove actions from columns to display if not admin
    this.authService.isAdmin().subscribe(() => this.isAdmin = true, () => { this.isAdmin = false; this.columnsToDisplay.pop() })
  }

  ngAfterViewInit() {
    // would be delayed by 100 ms after paginator events happen then would load events 
    this.paginator.page.pipe(debounceTime(100),
      tap(() => this.loadStudentPoints())).subscribe()
  }

  // to open create student point dialog and loads quarter range after
  createStudentPoint() {
    const dialogRef = this.dialog.open(CreateEditStudentPointComponent, {
      height: '400px',
      width: '475px',
    })
    // once closed, load student point in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadStudentPoints() })
  }

  // to open edit event dialog and loads point after
  editPoint(point: StudentPoint) {
    // would open the component with specified height/width and data passed into it
    const dialogRef = this.dialog.open(CreateEditStudentPointComponent, {
      height: '400px',
      width: '475px',
      data: point
    })
    // once closed, load point table in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadStudentPoints() })
  }
  // deletes point from db
  deletePoint(id: number) {
    // opens confirmation dialog and would load point after submit
    const dialogRef = this.dialog.open(UserConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete point?"

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentPointService.deleteStudentPoint(id).subscribe(() => {
          this.loadStudentPoints()
          this.snackBar.open('Successfully Deleted Point', '', {
            duration: 3000,
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          })
        })
      }
    });
  }

  // load student points from datasource with pagination
  loadStudentPoints() {
    this.dataSource.loadStudentPoints(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.user_id,
      this.event_time_id,
      this.quarter_range_id
    )
  }

  // open select user to choose user for filter
  openSelectUser() {
    const dialogRef2 = this.dialog.open(UserSelectorComponent)
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.student_name = data.first_name + ' ' + data.last_name
        this.user_id = data.id
        this.loadStudentPoints()
      }
    })
  }
  // filters quarter range from a datatable
  openSelectQuarterRange() {
    const dialogRef2 = this.dialog.open(QuarterRangeSelectorComponent, {
      width: '500px'
    })
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.quarter_name = data.quarter.quarter
        this.quarter_range_id = data.id
        // gets the leaderboard from the service and set to var
        this.leaderboardService.getLeaderboard(1, 5, data.id.toString()).subscribe((data) => {
          if (data) {
            this.pagedPoints = data
            this.points = data.items
          }
        }, (error) => {

        })
        // gets the current user points if there are any
        this.leaderboardService.getUserPoints(data.id.toString()).subscribe((data) => {
          this.userPoints = data.points
          this.showCurrentPoints = true
        }, (error) => {
          if (error.error.detail == 'No student points found for user') {
            this.showCurrentPoints = true
          } else {
            this.showCurrentPoints = false;
          }
        })
        this.loadStudentPoints()
      }
    })
  }

  // open select event time to choose event for filter
  openSelectEventTime() {
    const dialogRef2 = this.dialog.open(EventTimeSelectorComponent, {
      width: '600px'
    })
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.event_name = data.event.name
        this.event_time_id = data.id
        this.loadStudentPoints()
      }
    })
  }
  // removes event time filter
  removeEventTimeFilter() {
    this.event_name = ''
    this.event_time_id = ''
    this.loadStudentPoints()
  }
  // removes user filter  
  removeUserFilter() {
    this.student_name = ''
    this.user_id = ''
    this.loadStudentPoints()
  }

  // for ngx-pagination
  pageChanged(event: PageChangedEvent) {
    this.leaderboardService.getLeaderboard(event.page, event.itemsPerPage, this.quarter_range_id).subscribe((data) => {
      if (data) {
        this.pagedPoints = data
        this.points = data.items
      }
    })
  }

  // service calls for data
  exportUserPoint() {
    this.studentPointService.exportUserPoints(this.quarter_range_id).subscribe((data) => {
      this.downloadFile(data)
    })
  }

  // used to download file
  downloadFile(data: any) {
    // get the file name from the response
    let header_content = data.headers.get('content-disposition')
    let file = header_content.split('=')[1]
    // make a blob to export the data (excel file) to user
    const blob = new Blob([data.body], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
    const url = window.URL.createObjectURL(blob);
    // creates a link to for the name and content of file and downloads to user
    var link = document.createElement('a');
    link.href = url
    link.download = file
    link.click()
  }

}
