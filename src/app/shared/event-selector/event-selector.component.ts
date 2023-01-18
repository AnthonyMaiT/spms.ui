import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, tap } from 'rxjs';
import { EventsDataSource } from '../../events/event/event.datasource';
import { SchoolEvent } from '../../events/event/interfaces/event';
import { EventService } from '../../events/event/services/event.service';

@Component({
  selector: 'spms-event-selector',
  templateUrl: './event-selector.component.html',
  styleUrls: ['./event-selector.component.scss']
})
export class EventSelectorComponent implements OnInit, AfterViewInit {
  // columns to be displayed on datatable
  displayedColumns: string[] = ['actions', 'name', 'is_sport']
  //datasource of the table
  dataSource!: EventsDataSource
  // name filters for event
  nameFilter: string =''
  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private eventService: EventService, public dialogRef: MatDialogRef<EventSelectorComponent>) { }
  // initializes datasource
  ngOnInit(): void {
    this.dataSource = new EventsDataSource(this.eventService)
    this.dataSource.loadEvents(1, 5)
  }

  // when called, would get users again and return to first page 
  applyFilter() {
    this.loadEvents()
    this.paginator.firstPage()
  }

  ngAfterViewInit() {
    // would be delayed by 100 ms after paginator events happen then would load events 
    this.paginator.page.pipe(debounceTime(100),
      tap(() => this.loadEvents())).subscribe()
  }

  // load events from datasource with pagination
  loadEvents() {
    this.dataSource.loadEvents(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.nameFilter
    )
  }

}
