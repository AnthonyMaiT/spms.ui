import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuarterRangeSelectorComponent } from 'src/app/shared/quarter-range-selector/quarter-range-selector.component';
import { CreateWinner } from '../interfaces/CreateWinner';
import { WinnersService } from '../services/winners.service';

@Component({
  selector: 'spms-create-winners',
  templateUrl: './create-winners.component.html',
  styleUrls: ['./create-winners.component.scss']
})
export class CreateWinnersComponent implements OnInit {
  // initiazlize winner form
  winnerForm!: FormGroup
  // error message from api
  apiErrorMessage = ''
  // for quarter fields
  quarter_name = ''
  quarter_range_id = ''
  // connects component to service and modules
  constructor(private winnerService: WinnersService, public dialogRef: MatDialogRef<CreateWinnersComponent>,
    private fb: FormBuilder, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }
  // add form fields to winner form
  ngOnInit(): void {
    this.winnerForm = this.fb.group({
      quarter_range_id: ['', [Validators.required]]
    })
  }
  // closes dialog
  close() {
    this.dialogRef.close()
  }
  // creates winner to db using form field
  // returns error message if there is error
  create() {
    const newWinner: CreateWinner = {
      quarter_range_id: this.winnerForm.get('quarter_range_id')?.value
    }
    this.winnerService.createWinner(newWinner).subscribe((data) => {
      this.snackBar.open('Winners Created Succesfully','',{
        duration: 3000,
        horizontalPosition: 'right',
        panelClass: ['snackbar-success']
      })
      this.dialogRef.close()
    }, (error) => {
      this.apiErrorMessage = error.error.detail
    })
  }

  // opens dialog to select quarter range
  openSelectQuarterRange() {
    const dialogRef2 = this.dialog.open(QuarterRangeSelectorComponent, {
      width: '500px'
    })
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.quarter_name = data.quarter.quarter
        this.winnerForm.get('quarter_range_id')?.setValue(data.id)
      }
    })
  }
  // removes filter from query
  removeQuarterFilter() {
    this.quarter_name = ''
    this.quarter_range_id = ''
  }

}
