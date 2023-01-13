import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUpdateQuarterRange } from '../interfaces/create-update-quarter-range';
import { QuarterRange } from '../interfaces/quarter-range';
import { QuartersService } from '../services/quarters.service';
import { CustomValidator } from '../validators/custom-validator';

@Component({
  selector: 'spms-create-edit-quarter-range',
  templateUrl: './create-edit-quarter-range.component.html',
  styleUrls: ['./create-edit-quarter-range.component.scss']
})
export class CreateEditQuarterRangeComponent implements OnInit {

  // formgroup for creating or editing quarter ranges
  quarterRangeForm!: FormGroup
  // gets quarters from api as stream
  getQuarters$ = this.quartersService.getQuarters$
  // error message from api
  apiErrorMessage = ''
  // connects to services and modules
  constructor(private quartersService: QuartersService, public dialogRef: MatDialogRef<CreateEditQuarterRangeComponent>,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public quarterRange: QuarterRange,
    private snackBar: MatSnackBar) { }
  // when component is loaded, create a form with certain fields
  ngOnInit(): void {
    this.quarterRangeForm = this.fb.group({
      quarter_id: ['', [Validators.required]],
      start_range: ['', [Validators.required]],
      end_range: ['', [Validators.required]]
    }, {validators: CustomValidator.validateDate})
    // when editing form, pass in from quarterRange data
    if (this.quarterRange) {
      this.quarterRangeForm.patchValue({
        quarter_id: this.quarterRange.quarter_id,
        start_range: this.quarterRange.start_range,
        end_range: this.quarterRange.end_range
      })
    }
  }
  // closes the dialog
  close() {
    this.dialogRef.close()
  }
  // creates/edit to call to api
  createOrEdit() {
    // quarter range interface to pass to api
    const newQuarterRange: CreateUpdateQuarterRange = {
      quarter_id: this.quarterRangeForm.get('quarter_id')?.value,
      start_range: this.quarterRangeForm.get('start_range')?.value,
      end_range: this.quarterRangeForm.get('end_range')?.value,
    }
    // when editing user, passes in id and opens snackbar
    // set error message if conflicts
    if (this.quarterRange) {
      this.quartersService.updateQuarterRange(this.quarterRange.id, newQuarterRange).subscribe((data) => {
        this.snackBar.open('Quarter Range Updated Succesfully','',{
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        })
        this.dialogRef.close()
      }, (error) => {
        this.apiErrorMessage = error.error.detail
      })
    } else {
      // when creating a user
      // sets error message when conflicts in api
      this.quartersService.createQuarterRange(newQuarterRange).subscribe((data) => {
        this.snackBar.open('Quarter Range Created Succesfully','',{
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
