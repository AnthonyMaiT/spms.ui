import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, tap } from 'rxjs';
import { UsersService } from 'src/app/users/services/users.service';
import { UsersDataSource } from 'src/app/users/users.datasource';

@Component({
  selector: 'spms-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit, AfterViewInit {
  // columns to be displayed on datatable
  displayedColumns: string[] = ['actions', 'username', 'first_name', 'last_name','grade']
  //datasource of the table
  dataSource!: UsersDataSource
  // filters for columns
  usernameFilter: string = '';
  firstNameFilter: string = '';
  lastNameFilter: string = '';
  gradeFilter?: number;
  roleTypeIdFilter?: number;
  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UsersService, public dialogRef: MatDialogRef<UserSelectorComponent>) { }
  // initializes datasource
  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService)
    this.dataSource.loadUsers(this.usernameFilter, this.firstNameFilter, this.lastNameFilter,
      this.gradeFilter, 3, 1, 5, 'desc', 'id')
  }

  // when called, would get users again and return to first page 
  applyFilter() {
    this.loadUsers()
    this.paginator.firstPage()
  }

  ngAfterViewInit() {
    // would be delayed by 100 ms after paginator events happen then would load events 
    this.paginator.page.pipe(debounceTime(100),
      tap(() => this.loadUsers())).subscribe()
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
      3,
      (this.paginator.pageIndex + 1), // api paginator first page is at 1
      this.paginator.pageSize,
      'desc',
      'id'
    )
  }

}
