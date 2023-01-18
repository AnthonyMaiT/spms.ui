import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventTimesService } from '../events/event-times/services/event-times.service';
import { CreateEditStudentPoint } from '../student-points/interfaces/CreateEditStudentPoint';
import { UserPointOut } from '../student-points/interfaces/UserPointOut';
import { StudentPointsService } from '../student-points/services/student-points.service';
import { UsersService } from '../users/services/users.service';

@Component({
  selector: 'spms-add-point',
  templateUrl: './add-point.component.html',
  styleUrls: ['./add-point.component.scss']
})
export class AddPointComponent implements OnInit {
  // form group for username
  usernameFormGroup!: FormGroup;
  // user for the username
  user!: UserPointOut | null;
  // error message for getting username 
  apiErrorMessage = ''
  // form group for selecting event
  eventFormGroup!: FormGroup;
  // gets the current events ongoing
  getCurrentEventTimes$ = this.eventTimeService.getRecentEventTimes$
  // checks if there is events
  hasEventTimes = false
  // if succesfully add event
  apiErrorMessage2 = ''
  // services and modules for component
  constructor(private _formBuilder: FormBuilder, private userService: UsersService, 
    private eventTimeService: EventTimesService, private studentPointService: StudentPointsService,
    private snackBar: MatSnackBar) {}
  // when component is loaded, initialize formgroups and get event times
  ngOnInit(): void {
    this.usernameFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
    });
    this.eventFormGroup = this._formBuilder.group({
      event_time_id: ['', Validators.required]
    })
    this.eventTimeService.getRecentEventTimes().subscribe((data) => {
      if (data.length == 0) {
        this.hasEventTimes = true
      } else {
        this.hasEventTimes = false
      }
    })
  }
  // gets the user after username input 
  getUser(): void {
    this.userService.findUser(this.usernameFormGroup.get('username')?.value).subscribe((data)=> {
      this.user = data
      this.apiErrorMessage = ''
    }, (error) => {
      this.user = null
      this.apiErrorMessage = error.error.detail
    })
  }
  // adds the point to the db and then return snackbar
  // message if error
  addPoint() {
    if (this.user) {
      const new_point: CreateEditStudentPoint = {
        user_id: this.user.id,
        event_time_id: this.eventFormGroup.get('event_time_id')?.value
      }
      this.studentPointService.createPoint(new_point).subscribe(() => {
        this.apiErrorMessage2 = ''
        this.snackBar.open('Succesfully Added Point','',{
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        })
      }, (error) => {
        this.apiErrorMessage2 = error.error.detail
      })
    } else {
      this.apiErrorMessage2 = 'There is no user to add'
    }

  }

}
