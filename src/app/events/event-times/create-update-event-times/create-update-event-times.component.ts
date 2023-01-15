import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { EventSelectorComponent } from '../event-selector/event-selector.component';
import { CreateUpdateEventTime } from '../interfaces/create-update-event-times';
import { EventTime } from '../interfaces/event-time';
import { EventTimesService } from '../services/event-times.service';
import { EventTimeValidator } from '../validators/event-time-validator';

@Component({
  selector: 'spms-create-update-event-times',
  templateUrl: './create-update-event-times.component.html',
  styleUrls: ['./create-update-event-times.component.scss']
})
export class CreateUpdateEventTimesComponent implements OnInit {
  // forgroup for creating/editing events
  eventTimeForm!: FormGroup
  // event name for form
  eventName: string =''
  // connects to services and modules
  constructor(private eventTimeService: EventTimesService, public dialogRef: MatDialogRef<CreateUpdateEventTimesComponent>,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public eventTime: EventTime, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }
    // when component is loaded, create a form with certain fields
  ngOnInit(): void {
    this.eventTimeForm = this.fb.group({
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      event_id: [{value:'', disabled:true}, [Validators.required]]
    }, {validators: EventTimeValidator.validateDateTime})
    // when editing form, pass in from eventTime data
    if (this.eventTime) {
      this.eventTimeForm.patchValue({
        start_time: moment(this.eventTime.start_time),
        end_time: moment(this.eventTime.end_time),
        event_id: this.eventTime.event_id
      })
    }
  }

  // closes the dialog
  close() {
    this.dialogRef.close()
  }

  // creates/edit to call to api
  createOrEdit() {
    // eventTime interface to pass to api
    const newEventTime: CreateUpdateEventTime = {
      start_time: this.eventTimeForm.get('start_time')?.value,
      end_time: this.eventTimeForm.get('end_time')?.value,
      event_id: this.eventTimeForm.get('event_id')?.value
    }
    // when editing event time, pass in id and open snackbar
    if (this.eventTime) {
      this.eventTimeService.updateEventTime(this.eventTime.id, newEventTime).subscribe((data) => {
        this.snackBar.open('Event Time Updated Succesfully','',{
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        })
        this.dialogRef.close()
      })
    } else {
      // for creating event time
      this.eventTimeService.createEventTime(newEventTime).subscribe((data) => {
        this.snackBar.open('Event Time Created Succesfully','',{
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        })
        this.dialogRef.close()
      })
    }
  }
  // open select event to choose event for event time
  openSelectEvent() {
    const dialogRef2 = this.dialog.open(EventSelectorComponent)
    dialogRef2.afterClosed().subscribe(data => {
      if (data) {
        this.eventName = data.name
        this.eventTimeForm.get('event_id')?.setValue(data.id)
      }
    })
  }

}
