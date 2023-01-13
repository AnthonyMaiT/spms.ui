import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/app-nav/change-password/change-password.component';
import { UsersService } from '../services/users.service';
import { CreateUser } from '../interfaces/create_user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../interfaces/user';
import { UpdateUser } from '../interfaces/update_user';

@Component({
  selector: 'spms-create-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {

  // form for creating a user
  userForm!: FormGroup
  // hides password
  hide = true;
  // streamable roletype for roletype field
  getRoleTypes$ = this.userService.getRoleTypes$

  // connects to dialogRef, formbuilder, snackbar, user data, and user service
  constructor(public dialogRef: MatDialogRef<CreateEditUserComponent>,
    private fb: FormBuilder, private userService: UsersService,
    private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public user: User,
  ) { }
  // when component is opened, create form instance
  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      role_type_id: ['', [Validators.required]]
    })
    // when there is user data for editing a user
    if (this.user) {
      this.userForm.patchValue({
        username: this.user.username,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        role_type_id: this.user.role_type_id,
      })
      // editing user and see if they are student to show grade field
      if (this.user.role_type_id == 3) {
        this.userForm.addControl('grade', new FormControl('', [Validators.required]))
        this.userForm.patchValue({grade: this.user.grade})
      }
    // show password field instead when creating user
    } else {
      this.userForm.addControl('password', new FormControl('', [Validators.required]))
    }
    // when a value has changed
    this.onValueChanges();
  }

  onValueChanges() {
    // checks if role type is a student and would show grade. remove if not 
    this.userForm.get('role_type_id')?.valueChanges.subscribe((data) => {
      if (data == 3) {
        this.userForm.addControl('grade', new FormControl('', [Validators.required]))
      } else {
        if (this.userForm.get('grade')) {
          this.userForm.removeControl('grade')
        }
      }
    })
  }

  // closes the create/edit user dialog
  close() {
    this.dialogRef.close()
  }
  // create/edit user to api
  createOrEdit() {
    // to edit user and pass form to api in order to update
    // snackbar when success and closes after
    if (this.user) {
      const updatedUser: UpdateUser = {
        username: this.userForm.get('username')?.value,
        first_name: this.userForm.get('first_name')?.value,
        last_name: this.userForm.get('last_name')?.value,
        grade: this.userForm.get('grade')?.value,
        role_type_id: this.userForm.get('role_type_id')?.value
      }
      this.userService.updateUser(updatedUser, this.user.id).subscribe(() => {
        this.snackBar.open('Succesfully Edited User','',{
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        })
        this.dialogRef.close()
      })
    // to create user 
    // snack bar when success and closes after
    } else {
      const newUser: CreateUser = {
        username: this.userForm.get('username')?.value,
        password: this.userForm.get('password')?.value,
        first_name: this.userForm.get('first_name')?.value,
        last_name: this.userForm.get('last_name')?.value,
        grade: this.userForm.get('grade')?.value,
        role_type_id: this.userForm.get('role_type_id')?.value
      }
      this.userService.createUser(newUser).subscribe((data) => {
        this.snackBar.open('User Created Succesfully','',{
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        })
        this.dialogRef.close()
      })
    }
  }
}
