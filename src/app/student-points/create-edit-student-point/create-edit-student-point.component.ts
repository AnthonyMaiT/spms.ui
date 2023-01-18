import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventSelectorComponent } from 'src/app/shared/event-selector/event-selector.component';
import { EventTimeSelectorComponent } from 'src/app/shared/event-time-selector/event-time-selector.component';
import { UserSelectorComponent } from 'src/app/shared/user-selector/user-selector.component';
import { CreateEditStudentPoint } from '../interfaces/CreateEditStudentPoint';
import { StudentPoint } from '../interfaces/StudentPoint';
import { StudentPointsService } from '../services/student-points.service';

@Component({
  selector: 'spms-create-edit-student-point',
  templateUrl: './create-edit-student-point.component.html',
  styleUrls: ['./create-edit-student-point.component.scss']
})
export class CreateEditStudentPointComponent implements OnInit {
  // formgroup for creating or editing point
  pointForm!: FormGroup
  // error message from api
  apiErrorMessage = ''
  // student name
  student_name = ''
  // event name
  event_name =''
  // connects to services and modules
  constructor(private studentPointService: StudentPointsService, public dialogRef: MatDialogRef<CreateEditStudentPointComponent>,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public studentPoint: StudentPoint, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }
  // initializes pointForm depending on if creating/editing point
  ngOnInit(): void {
    this.pointForm = this.fb.group({
      user_id: ['', [Validators.required]],
      event_time_id: ['', [Validators.required]]
    })
    if (this.studentPoint) {
      this.pointForm.patchValue({
        user_id: this.studentPoint.user_id,
        event_time_id: this.studentPoint.event_time_id
      })
      this.student_name = this.studentPoint.user.first_name + ' ' + this.studentPoint.user.last_name
      this.event_name = this.studentPoint.event_time.event.name
    }
  }
  // closes dialog
  close() {
    this.dialogRef.close()
  }
  // creates/updates the student points based on values
  createOrEdit() {
    const newPoint: CreateEditStudentPoint = {
      user_id: this.pointForm.get('user_id')?.value,
      event_time_id: this.pointForm.get('event_time_id')?.value
    }
    if (this.studentPoint) {
      this.studentPointService.updateStudentPoint(this.studentPoint.id, newPoint).subscribe((data) => {
        this.snackBar.open('Student Point Updated Succesfully','',{
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        })
        this.dialogRef.close()
      }, (error) => {
        this.apiErrorMessage = error.error.detail
      })
    } else {
      this.studentPointService.createPoint(newPoint).subscribe((data)=> {
        this.snackBar.open('Student Point Created Succesfully','',{
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

  // open select user to choose user for point
  openSelectUser() {
    const dialogRef2 = this.dialog.open(UserSelectorComponent)
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.student_name = data.first_name + ' ' + data.last_name
        this.pointForm.get('user_id')?.setValue(data.id)
      }
    })
  }

  // open select event time to choose user for point
  openSelectEventTime() {
    const dialogRef2 = this.dialog.open(EventTimeSelectorComponent, {
      width: '600px'
    })
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.event_name = data.event.name
        this.pointForm.get('event_time_id')?.setValue(data.id)
      }
    })
  }

}
