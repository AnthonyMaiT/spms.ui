import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { ChangePassword } from './change-password';

@Component({
  selector: 'spms-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  // services for dialog, auth, and snackbar
  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
    public authService: AuthService, private snackBar: MatSnackBar) { }

  // var to change password
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  errorMessage = '';

  // closes dialog
  close(): void {
    this.dialogRef.close()
  }

  // checks if valid passwords then submits and show snackbar/close
  changePassword() {
    const passwords: ChangePassword = {
      current_password: this.currentPassword,
      new_password: this.newPassword,
      confirm_new_password: this.confirmNewPassword
    }
    if (this.newPassword != this.confirmNewPassword) {
      this.errorMessage = 'Passwords do not match!'
    } else {
      this.authService.changePassword(passwords).subscribe(
        ()=> {
          this.snackBar.open('Password Changed Successfully','',{
            duration: 3000,
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          })
          this.dialogRef.close()
        },
        (err) => this.errorMessage = err.error.detail
      )
    }
  }

}
