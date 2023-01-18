import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { EventTimeSelectorComponent } from '../shared/event-time-selector/event-time-selector.component';
import { QuarterRangeSelectorComponent } from '../shared/quarter-range-selector/quarter-range-selector.component';
import { UserConfirmationDialogComponent } from '../shared/user-confirmation-dialog/user-confirmation-dialog.component';
import { UserSelectorComponent } from '../shared/user-selector/user-selector.component';
import { CreateEditStudentPointComponent } from './create-edit-student-point/create-edit-student-point.component';
import { StudentPoint } from './interfaces/StudentPoint';
import { StudentPointsService } from './services/student-points.service';
import { StudentPointsDataSource } from './student-point.datasource';

@Component({
  selector: 'spms-student-points',
  templateUrl: './student-points.component.html',
  styleUrls: ['./student-points.component.scss']
})
export class StudentPointsComponent implements OnInit {
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
  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // services and other components
  constructor(private studentPointService: StudentPointsService, public dialog: MatDialog, private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataSource = new StudentPointsDataSource(this.studentPointService)
    this.dataSource.loadStudentPoints(1, 5)

    // checks if admin and sets to var
    // would remove actions from columns to display if not admin
    this.authService.isAdmin().subscribe(()=> this.isAdmin = true, () => {this.isAdmin=false; this.columnsToDisplay.pop()})
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
  // removes quarter filter
  removeQuarterFilter() {
    this.quarter_name = ''
    this.quarter_range_id = ''
    this.loadStudentPoints()
  }

}
