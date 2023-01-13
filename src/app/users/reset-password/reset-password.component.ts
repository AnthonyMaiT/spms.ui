import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from 'src/app/app-nav/change-password/change-password.component';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPassword } from './reset-password';

@Component({
  selector: 'spms-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  // services for dialog, auth, and snackbar
  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
    public authService: AuthService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: number) { }

  // var to change password
  newPassword: string = '';
  confirmNewPassword: string = '';
  errorMessage = '';

  // closes dialog
  close(): void {
    this.dialogRef.close()
  }

  // checks if valid passwords then submits and show snackbar/close
  resetPassword() {
    // makes a resetpassword interface to add to db
    const password: ResetPassword = {
      new_password: this.newPassword,
      confirm_new_password: this.confirmNewPassword
    }
    // checks if passwords do not match
    if (this.newPassword != this.confirmNewPassword) {
      this.errorMessage = 'Passwords do not match!'
    } else {
      // would reset password and show snackbar and close
      this.authService.resetPassword(password, this.id).subscribe(
        ()=> {
          this.snackBar.open('Successfully Resetted Password','',{
            duration: 3000,
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          })
          this.dialogRef.close()
        }
      )
    }
  }

}
