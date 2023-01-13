import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserConfirmationDialogComponent } from './user-confirmation-dialog/user-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


// shared module for other components to use 
@NgModule({
  declarations: [
    UserConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    MatDialogModule
  ],
  entryComponents: [UserConfirmationDialogComponent]
})
export class SharedModule { }
