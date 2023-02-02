import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUpdatePrize } from '../interfaces/CreateUpdatePrize';
import { Prize } from '../interfaces/Prizes';
import { PrizesService } from '../services/prizes.service';

@Component({
  selector: 'spms-create-update-prizes',
  templateUrl: './create-update-prizes.component.html',
  styleUrls: ['./create-update-prizes.component.scss']
})
export class CreateUpdatePrizesComponent implements OnInit {
  // initialize form to add/update prize
  prizeForm!: FormGroup
  // api error message for server exceptions
  apiErrorMessage = ''
  // connects to services and modules for component
  constructor(private prizeService: PrizesService, public dialogRef: MatDialogRef<CreateUpdatePrizesComponent>,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public prize: Prize,
    private snackBar: MatSnackBar) { }
  // when component is opened, create form/ add fields to it
  ngOnInit(): void {
    this.prizeForm = this.fb.group({
      name: ['', [Validators.required]],
      level: ['', [Validators.required]]
    })
    if (this.prize) {
      this.prizeForm.patchValue({
        name: this.prize.name,
        level: this.prize.level
      })
    }
  }
  // closes the dialog 
  close() {
    this.dialogRef.close()
  }

  createOrEdit() {
    // makes a const to add to db
    const newPrize: CreateUpdatePrize = {
      name: this.prizeForm.get('name')?.value,
      level: this.prizeForm.get('level')?.value
    }
    // for editing a prize in db then return snackbar or error
    if (this.prize) {
      this.prizeService.updatePrize(this.prize.id, newPrize).subscribe((data) => {
        this.snackBar.open('Prize Updated Succesfully','',{
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        })
        this.dialogRef.close()
      }, (error) => {
        this.apiErrorMessage = error.error.detail
      })
      // for creating a prize in db then return snackbar or error message
    } else {
      this.prizeService.createPrize(newPrize).subscribe((data) => {
        this.snackBar.open('Event Created Succesfully','',{
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        })
        this.dialogRef.close()
      }, (error) => {
        this.apiErrorMessage = error.error.detail
      })
    }
  }

}
