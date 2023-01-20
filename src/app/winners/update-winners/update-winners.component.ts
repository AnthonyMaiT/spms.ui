import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrizeSelectorComponent } from 'src/app/shared/prize-selector/prize-selector.component';
import { UpdateWinner } from '../interfaces/UpdateWinner';
import { Winner } from '../interfaces/Winner';
import { WinnersService } from '../services/winners.service';

@Component({
  selector: 'spms-update-winners',
  templateUrl: './update-winners.component.html',
  styleUrls: ['./update-winners.component.scss']
})
export class UpdateWinnersComponent implements OnInit {
  // initialize winner form
  winnerForm!: FormGroup
  // prizeName for selecting prize
  prizeName = ''
  // connects to service and modules
  constructor(private winnerService: WinnersService, public dialogRef: MatDialogRef<UpdateWinnersComponent>,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public winner: Winner, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }
  // when component is loaded, add form fields and current prize of winner
  ngOnInit(): void {
    this.winnerForm = this.fb.group({
      prize_id: ['', [Validators.required]]
    })
    this.winnerForm.patchValue({
      prize_id: this.winner.prize_id
    })
    this.prizeName = this.winner.prize.name
  }
  // close dialog
  close() {
    this.dialogRef.close()
  }
  // edits the prize for the winner then snackbar
  edit() {
    const newWinner: UpdateWinner = {
      prize_id: this.winnerForm.get('prize_id')?.value
    }
    this.winnerService.updateWinner(this.winner.id, newWinner).subscribe((data) => {
      this.snackBar.open('Winner Updated Succesfully','',{
        duration: 3000,
        horizontalPosition: 'right',
        panelClass: ['snackbar-success']
      })
      this.dialogRef.close()
    })
  }

  openSelectPrize() {
    const dialogRef2 = this.dialog.open(PrizeSelectorComponent)
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.prizeName = data.name
        this.winnerForm.get('prize_id')?.setValue(data.id)
      }
    })
  }

}
