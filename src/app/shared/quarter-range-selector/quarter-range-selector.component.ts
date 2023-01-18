import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, tap } from 'rxjs';
import { QuarterRangesDataSource } from 'src/app/quarters/quarters.datasource';
import { QuartersService } from 'src/app/quarters/services/quarters.service';

@Component({
  selector: 'spms-quarter-range-selector',
  templateUrl: './quarter-range-selector.component.html',
  styleUrls: ['./quarter-range-selector.component.scss']
})
export class QuarterRangeSelectorComponent implements OnInit, AfterViewInit {
  // columns to be displayed on datatable
  displayedColumns: string[] = ['actions', 'quarter', 'start_range', 'end_range']
  //datasource of the table
  dataSource!: QuarterRangesDataSource
  // for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private quarterRangeService: QuartersService, public dialogRef: MatDialogRef<QuarterRangeSelectorComponent>) { }
  // loads datasource 
  ngOnInit(): void {
    this.dataSource = new QuarterRangesDataSource(this.quarterRangeService)
    this.dataSource.loadQuarterRanges(1, 5)
  }

  ngAfterViewInit() {
    // would be delayed by 100 ms after paginator events happen then would load events 
    this.paginator.page.pipe(debounceTime(100),
      tap(() => this.loadQuarterRanges())).subscribe()
  }
  // loads quarter range items from datasource
  loadQuarterRanges() {
    this.dataSource.loadQuarterRanges(this.paginator.pageIndex + 1, this.paginator.pageSize)
  }

}
