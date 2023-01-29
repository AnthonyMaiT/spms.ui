import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, tap } from 'rxjs';
import { UserSelectorComponent } from '../shared/user-selector/user-selector.component';
import { UserStepsService } from './services/user-steps.service';
import { UserStepsDataSource } from './user-step.datasource';

@Component({
  selector: 'spms-user-step',
  templateUrl: './user-step.component.html',
  styleUrls: ['./user-step.component.scss']
})
export class UserStepComponent implements OnInit, AfterViewInit {
  // columns to be displayed on datatable
  displayedColumns: string[] = ['id', 'username', 'step', 'accessed_at']
  //datasource of the table
  dataSource!: UserStepsDataSource
  // filters for datatable
  user_id = ''
  user_name = ''
  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // services and other components
  constructor(private userStepsService: UserStepsService, public dialog: MatDialog) { }
  // when app is ran, run datatable
  ngOnInit(): void {
    this.dataSource = new UserStepsDataSource(this.userStepsService)
    this.dataSource.loadSteps(1 , 5, this.user_id)
  }

  ngAfterViewInit() {
    // would be delayed by 100 ms after paginator steps happen then would load steps 
    this.paginator.page.pipe(debounceTime(100),
      tap(() => this.loadSteps())).subscribe()
  }
  // loads steps from datasource
  loadSteps() {
    this.dataSource.loadSteps(this.paginator.pageIndex + 1, this.paginator.pageSize, this.user_id)
  }

  // open select user to choose user for filter
  openSelectUser() {
    const dialogRef2 = this.dialog.open(UserSelectorComponent)
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.user_name = data.first_name + ' ' + data.last_name
        this.user_id = data.id
        this.loadSteps()
      }
    })
  }

  // removes user filter  
  removeUserFilter() {
    this.user_name = ''
    this.user_id = ''
    this.loadSteps()
  }
}
