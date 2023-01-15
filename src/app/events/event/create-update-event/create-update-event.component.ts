import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUpdateEvent } from '../interfaces/create-update-event';
import { SchoolEvent } from '../interfaces/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'spms-create-update-event',
  templateUrl: './create-update-event.component.html',
  styleUrls: ['./create-update-event.component.scss']
})
export class CreateUpdateEventComponent implements OnInit {

  // forgroup for creating/editing events
  eventForm!: FormGroup
  // api error message
  apiErrorMessage = ''
  // connects to services and modules
  constructor(private eventService: EventService, public dialogRef: MatDialogRef<CreateUpdateEventComponent>,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public event: SchoolEvent,
    private snackBar: MatSnackBar) { }
  // when component is loaded, create a form with certain fields
  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      is_sport: [false]
    })
    // when editing form, pass in from event data
    if (this.event) {
      this.eventForm.patchValue({
        name: this.event.name,
        is_sport: this.event.is_sport
      })
    }
  }

  // closes the dialog
  close() {
    this.dialogRef.close()
  }
  // creates/edit to call to api
  createOrEdit() {
    // event interface to pass to api
    const newEvent: CreateUpdateEvent = {
      name: this.eventForm.get('name')?.value,
      is_sport: this.eventForm.get('is_sport')?.value
    }
    // when editing event, pass in id and open snackbar
    // set error message if conflicts
    if (this.event) {
      this.eventService.updateEvent(this.event.id, newEvent).subscribe((data) => {
        this.snackBar.open('Event Updated Succesfully','',{
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        })
        this.dialogRef.close()
      }, (error) => {
        this.apiErrorMessage = error.error.detail
      })
    } else {
      // when creating event
      // sets error message when conflicts
      this.eventService.createEvent(newEvent).subscribe((data) => {
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
