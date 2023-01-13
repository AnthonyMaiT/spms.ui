import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { distinctUntilChanged, fromEvent, tap, merge, debounceTime } from 'rxjs';
import { ChangePasswordComponent } from '../app-nav/change-password/change-password.component';
import { AuthService } from '../services/auth.service';
import { UserConfirmationDialogComponent } from '../shared/user-confirmation-dialog/user-confirmation-dialog.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { User } from './interfaces/user';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UsersService } from './services/users.service';
import { UsersDataSource } from './users.datasource';

@Component({
  selector: 'spms-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnInit {
  // column headers for datatable in html template
  displayedColumns: string[] = ['id', 'role_type', 'username', 'first_name',
    'last_name', 'grade', 'edited_at', 'created_at', 'actions'];
  // datasource of users (not defined yet)
  dataSource!: UsersDataSource
  // filters for columns
  usernameFilter: string = '';
  firstNameFilter: string = '';
  lastNameFilter: string = '';
  gradeFilter?: number;
  roleTypeIdFilter?: number;
  // gets role type stream and would run using async pipe
  getRoleTypes$ = this.userService.getRoleTypes$
  // for pagination and sorting  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // connects to services and dialog/snackbar feature
  constructor(
    private userService: UsersService,
    public dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }
  // when called, would get users again and return to first page 
  applyFilter() {
    this.loadUsers()
    this.paginator.firstPage()
  }

  ngAfterViewInit() {
    // when sort changes, resets back to first page
    this.sort.sortChange.subscribe(() => {this.paginator.pageIndex = 0});
    // would be delayed by 100 ms after paginator/sort events happen then would load users 
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        debounceTime(100),
        tap(() => this.loadUsers())
      )
      .subscribe();
  }
  // when component is opened, connects to datasource with default filters
  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService)
    this.dataSource.loadUsers(
      this.usernameFilter,
      this.firstNameFilter,
      this.lastNameFilter,
      this.gradeFilter,
      this.roleTypeIdFilter,
    )
  }
  // loads user from the datasource
  loadUsers() {
    // Get users
    // Assign the data to the data source for the table to render
    // along with filters, paginators, and sorting passed into data
    this.dataSource.loadUsers(
      this.usernameFilter,
      this.firstNameFilter,
      this.lastNameFilter,
      this.gradeFilter,
      this.roleTypeIdFilter,
      (this.paginator.pageIndex + 1), // api paginator first page is at 1
      this.paginator.pageSize,
      this.sort.direction,
      this.sort.active
    )
  }

  // opens dialog to edit a chosen user
  editUser(user: User) {
    // would open the component with specified height/width and data passed into it
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      height: '375px',
      width: '475px',
      data: user
    })
    // once closed, load users in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadUsers() })
  }
  // opens dialog to create a new user
  createUser() {
    // would open the component with specified height/width 
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      height: '375px',
      width: '475px',
    })
    // once closed, load users in case of changes
    dialogRef.afterClosed().subscribe(() => { this.loadUsers() })
  }
  // opens dialog to reset a user password
  resetPassword(id: number) {
    // opens it with id and loadUsers once closed
    const dialogRef = this.dialog.open(ResetPasswordComponent, { data: id })
    dialogRef.afterClosed().subscribe(() => { this.loadUsers() })
  }
  // deletes user from data
  deleteUser(id: number) {
    // checks if deleting self and would return a snackbar if so
    this.authService.currentUser().subscribe((data) => {
      if (data.id == id) {
        this.snackBar.open('Cannot Delete Self', '', {
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-danger']
        })
      } else {
        // opens confirmation dialog and would load users after submit
        const dialogRef = this.dialog.open(UserConfirmationDialogComponent, {
          disableClose: false
        });
        dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete user?"

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.userService.deleteUser(id).subscribe(() => this.loadUsers())
          }
        });
      }
    })
  }

}
