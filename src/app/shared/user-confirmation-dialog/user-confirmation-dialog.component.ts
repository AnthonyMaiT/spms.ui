import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'spms-user-confirmation-dialog',
  templateUrl: './user-confirmation-dialog.component.html',
  styleUrls: ['./user-confirmation-dialog.component.scss']
})
// confirmation dialog for user confirmation for deleting and such
export class UserConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<UserConfirmationDialogComponent>) {}
  // confirm message that component passes in
  public confirmMessage?:string;

}
