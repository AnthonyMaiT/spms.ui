import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserConfirmationDialogComponent } from '../shared/user-confirmation-dialog/user-confirmation-dialog.component';
import { User } from '../users/interfaces/user';
import { CreateUpdatePrizesComponent } from './create-update-prizes/create-update-prizes.component';
import { Prize } from './interfaces/Prizes';
import { PrizesDataSource } from './prizes.datatable';
import { PrizesService } from './services/prizes.service';

@Component({
  selector: 'spms-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.scss']
})
export class PrizesComponent implements OnInit, AfterViewInit {
  user!: User
  // checks if the current user is admin for features
  isAdmin: boolean = false
  // columns to be displayed on datatable
  displayedColumns: string[] = ['id', 'name', 'level', 'actions']
  // for displaying/not displaying actions column
  columnsToDisplay: string[] = this.displayedColumns.slice()
  //datasource of the table
  dataSource!: PrizesDataSource
  // filters for datatable
  nameFilter = ''
  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // services and other components
  constructor(private prizesService: PrizesService, public dialog: MatDialog, private authService: AuthService,
    private snackBar: MatSnackBar) { this.user = this.authService.userValue
    }
  // when app is ran, run datatable
  ngOnInit(): void {
    this.dataSource = new PrizesDataSource(this.prizesService)
    this.dataSource.loadPrizes(1 , 5, this.nameFilter)

    //checks if admin and sets to var
    // would remove actions from columns to display
    if (this.user) {
      if (this.user.role_type_id == 1) {
        this.isAdmin = true
      }
    }    }

  ngAfterViewInit() {
    // would be delayed by 100 ms after paginator prizes happen then would load prizes 
    this.paginator.page.pipe(debounceTime(100),
      tap(() => this.loadPrizes())).subscribe()
  }

  // to open create prize dialog then loads prize after
  createPrize() {
    const dialogRef = this.dialog.open(CreateUpdatePrizesComponent, {
      height: '240px',
      width: '475px',
    })
    // once closed, load prize in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadPrizes() })
  }


  // to open edit prize dialog and loads prize after
  editPrize(prize: Prize) {
    // would open the component with specified height/width and data passed into it
    const dialogRef = this.dialog.open(CreateUpdatePrizesComponent, {
      height: '240px',
      width: '475px',
      data: prize
    })
    // once closed, load prize in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadPrizes() })
  }
  // deletes prize with confirmation from user
  deletePrize(id: number) {
    const dialogRef = this.dialog.open(UserConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete event?"

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.prizesService.deletePrize(id).subscribe(() => {
          this.loadPrizes()
          this.snackBar.open('Successfully Deleted Event', '', {
            duration: 3000,
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          })
        })
      }
    });
  }
  // loads prize from datasource
  loadPrizes() {
    this.dataSource.loadPrizes(this.paginator.pageIndex + 1, this.paginator.pageSize, this.nameFilter)
  }
}
