import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, tap } from 'rxjs';
import { EventTimesDataSource } from 'src/app/events/event-times/event-times.datasource';
import { EventTimesService } from 'src/app/events/event-times/services/event-times.service';
import { EventSelectorComponent } from '../event-selector/event-selector.component';
import { QuarterRangeSelectorComponent } from '../quarter-range-selector/quarter-range-selector.component';

@Component({
  selector: 'spms-event-time-selector',
  templateUrl: './event-time-selector.component.html',
  styleUrls: ['./event-time-selector.component.scss']
})
export class EventTimeSelectorComponent implements OnInit, AfterViewInit {
  // columns to be displayed on datatable
  displayedColumns: string[] = ['actions', 'name', 'start_time', 'end_time']
  //datasource of the table
  dataSource!: EventTimesDataSource
  // filters for datatable
  quarter_range_id = ''
  event_id = ''
  quarter_name = ''
  event_name = ''
  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private eventTimeService: EventTimesService, public dialogRef: MatDialogRef<EventTimeSelectorComponent>, public dialog: MatDialog) { }

  // initializes datatable
  ngOnInit(): void {
    this.dataSource = new EventTimesDataSource(this.eventTimeService)
    this.dataSource.loadEventTimes(1, 5)
  }

  // when called, would load events again and return to first page 
  applyFilter() {
    this.loadEventTime()
    this.paginator.firstPage()
  }

  ngAfterViewInit() {
    // would be delayed by 100 ms after paginator events happen then would load events 
    this.paginator.page.pipe(debounceTime(100),
      tap(() => this.loadEventTime())).subscribe()
  }

  // load event time from datasource with pagination
  loadEventTime() {
    this.dataSource.loadEventTimes(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.event_id,
      this.quarter_range_id
    )
  }

  openSelectQuarterRange() {
    const dialogRef2 = this.dialog.open(QuarterRangeSelectorComponent, {
      width: '500px'
    })
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.quarter_name = data.quarter.quarter
        this.quarter_range_id = data.id
        this.loadEventTime()
      }
    })
  }

  removeQuarterFilter() {
    this.quarter_name = ''
    this.quarter_range_id = ''
    this.loadEventTime()
  }

  // open select event to choose event for event time
  openSelectEvent() {
    const dialogRef2 = this.dialog.open(EventSelectorComponent)
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.event_name = data.name
        this.event_id = data.id
        this.loadEventTime()
      }
    })
  }

  removeEventFilter() {
    this.event_name = ''
    this.event_id = ''
    this.loadEventTime()
  }

}
