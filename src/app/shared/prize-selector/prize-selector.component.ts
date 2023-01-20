import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, tap } from 'rxjs';
import { PrizesDataSource } from 'src/app/prizes/prizes.datatable';
import { PrizesService } from 'src/app/prizes/services/prizes.service';

@Component({
  selector: 'spms-prize-selector',
  templateUrl: './prize-selector.component.html',
  styleUrls: ['./prize-selector.component.scss']
})
export class PrizeSelectorComponent implements OnInit, AfterViewInit {
  // columns to display for datatable
  displayedColumns: string[] = ['actions', 'name', 'level']
  // datasource for datatable
  dataSource!: PrizesDataSource
  // filters for datatable
  nameFilter = ''
  // pagination for datatable
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // connects to service and dialogref for componnet 
  constructor(private prizesService: PrizesService, public dialogRef: MatDialogRef<PrizeSelectorComponent>) { }
  // whne componnet is loaded, load datatable
  ngOnInit(): void {
    this.dataSource = new PrizesDataSource(this.prizesService)
    this.dataSource.loadPrizes(1, 5, this.nameFilter)
  }
  // for pagination and delay time
  ngAfterViewInit(): void {
    this.paginator.page.pipe(debounceTime(100),
      tap(()=> this.dataSource.loadPrizes())).subscribe()
  }
  // applies filter to table
  applyFilter() {
    this.loadPrizes()
    this.paginator.firstPage()
  }
  // load prizes from datasource
  loadPrizes() {
    this.dataSource.loadPrizes(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.nameFilter
    )
  }

}
