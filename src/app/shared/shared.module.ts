import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserConfirmationDialogComponent } from './user-confirmation-dialog/user-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EventSelectorComponent } from './event-selector/event-selector.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { UserSelectorComponent } from './user-selector/user-selector.component';
import { EventTimeSelectorComponent } from './event-time-selector/event-time-selector.component';
import { QuarterRangeSelectorComponent } from './quarter-range-selector/quarter-range-selector.component';
import { MatIconModule } from '@angular/material/icon';


// shared module for other components to use 
@NgModule({
  declarations: [
    UserConfirmationDialogComponent,
    EventSelectorComponent,
    UserSelectorComponent,
    EventTimeSelectorComponent,
    QuarterRangeSelectorComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    MatDialogModule,
    EventSelectorComponent,
    UserSelectorComponent,
    EventTimeSelectorComponent,
    QuarterRangeSelectorComponent
  ],
  entryComponents: [UserConfirmationDialogComponent]
})
export class SharedModule { }
