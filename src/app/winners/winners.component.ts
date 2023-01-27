import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { QuarterRangeSelectorComponent } from '../shared/quarter-range-selector/quarter-range-selector.component';
import { UserConfirmationDialogComponent } from '../shared/user-confirmation-dialog/user-confirmation-dialog.component';
import { UserSelectorComponent } from '../shared/user-selector/user-selector.component';
import { CreateWinnersComponent } from './create-winners/create-winners.component';
import { Winner } from './interfaces/Winner';
import { WinnersService } from './services/winners.service';
import { UpdateWinnersComponent } from './update-winners/update-winners.component';
import { WinnersDataSource } from './winners.datasource';

@Component({
  selector: 'spms-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {
  // checks if the current user is admin for features
  isAdmin: boolean = false
  // columns to be displayed in db
  displayedColumns: string[] = ['id', 'first_name', 'last_name','grade', 'top_points', 'points', 'prize', 'quarter', 'actions'];
  // for displaying/not displaying actions column
  columnsToDisplay: string[] = this.displayedColumns.slice()
  // datasource of table
  dataSource!: WinnersDataSource
  // filters for datatable
  student_name: string = ''
  quarter_name: string = ''
  user_id: string = ''
  quarter_range_id: string = ''
  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // services and other components
  constructor(private winnerService: WinnersService, public dialog: MatDialog, private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataSource = new WinnersDataSource(this.winnerService)
    this.dataSource.loadWinners(1, 5)

    // checks if admin and sets to var
    // would remove actions from columns to display if not admin
    this.authService.isAdmin().subscribe(()=> this.isAdmin = true, () => {this.isAdmin=false; this.columnsToDisplay.pop()})
  }

  // load winners from datasource with pagination
  loadWinners() {
    this.dataSource.loadWinners(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.user_id,
      this.quarter_range_id
    )
  }

  createWinners() {
    const dialogRef = this.dialog.open(CreateWinnersComponent, {
      height: '240',
      width: '475px',
    })
    // once closed, load winner in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadWinners() })
  }

  updateWinners(winner: Winner) {
    const dialogRef = this.dialog.open(UpdateWinnersComponent, {
      height: '240',
      width: '475px',
      data: winner
    })
    // once closed, load winner in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadWinners() })
  }

  deleteWinner(id: number) {
    // opens confirmation dialog and would load winner after submit
    const dialogRef = this.dialog.open(UserConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete winner?"

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.winnerService.deleteWinner(id).subscribe(() => {
          this.loadWinners()
          this.snackBar.open('Successfully Deleted Winner', '', {
            duration: 3000,
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          })
        })
      }
    });
  }

  // open select user to choose user for filter
  openSelectUser() {
    const dialogRef2 = this.dialog.open(UserSelectorComponent)
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.student_name = data.first_name + ' ' + data.last_name
        this.user_id = data.id
        this.loadWinners()
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
        this.loadWinners()
      }
    })
  }

  // removes user filter  
  removeUserFilter() {
    this.student_name = ''
    this.user_id = ''
    this.loadWinners()
  }
  // removes quarter filter
  removeQuarterFilter() {
    this.quarter_name = ''
    this.quarter_range_id = ''
    this.loadWinners()
  }
}
