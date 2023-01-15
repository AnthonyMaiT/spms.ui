import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { UserConfirmationDialogComponent } from '../shared/user-confirmation-dialog/user-confirmation-dialog.component';
import { CreateEditQuarterRangeComponent } from './create-edit-quarter-range/create-edit-quarter-range.component';
import { QuarterRange } from './interfaces/quarter-range';
import { QuarterRangesDataSource } from './quarters.datasource';
import { QuartersService } from './services/quarters.service';

@Component({
  selector: 'spms-quarters',
  templateUrl: './quarters.component.html',
  styleUrls: ['./quarters.component.scss']
})
export class QuartersComponent implements OnInit {

  // checks if the current user is admin for features
  isAdmin: boolean = false
  // columns to be displayed in db
  displayedColumns: string[] = ['id', 'quarter', 'start_range', 'end_range', 'actions'];
  // for displaying/not displaying actions column
  columnsToDisplay: string[] = this.displayedColumns.slice()
  // datasource of table
  dataSource!: QuarterRangesDataSource
  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // services and other components
  constructor(private quarterService: QuartersService, public dialog: MatDialog, private authService: AuthService,
    private snackBar: MatSnackBar) { }
  // when app is ran, load datasource
  ngOnInit(): void {
    this.dataSource = new QuarterRangesDataSource(this.quarterService)
    this.dataSource.loadQuarterRanges(1, 5)

    // checks if admin and sets to var
    // would remove actions from columns to display if not admin
    this.authService.isAdmin().subscribe(()=> this.isAdmin = true, () => {this.isAdmin=false; this.columnsToDisplay.pop()})
  }
  // to open create quarter range dialog and loads quarter range after
  createQuarterRange() {
    const dialogRef = this.dialog.open(CreateEditQuarterRangeComponent, {
      height: '325px',
      width: '475px',
    })
    // once closed, load quarter-ranges in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadQuarterRanges() })
  }
  // to open edit quarter range dialog and loads quarter range after
  editQuarterRange(quarterRange: QuarterRange) {
    // would open the component with specified height/width and data passed into it
    const dialogRef = this.dialog.open(CreateEditQuarterRangeComponent, {
      height: '325px',
      width: '475px',
      data: quarterRange
    })
    // once closed, load users in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadQuarterRanges() })
  }
  // delets quarter range from db
  deleteQuarterRange(id: number) {
    // opens confirmation dialog and would load users after submit
    const dialogRef = this.dialog.open(UserConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete quarter range?"

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quarterService.deleteQuarterRange(id).subscribe(() => {
          this.loadQuarterRanges()
          this.snackBar.open('Successfully Deleted Quarter Range', '', {
            duration: 3000,
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          })
        })
      }
    });
  }
  // load quarter ranges from datasource with pagination
  loadQuarterRanges() {
    this.dataSource.loadQuarterRanges(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    )
  }

}
