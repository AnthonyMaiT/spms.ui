import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventTimesRoutingModule } from './event-times-routing.module';
import { EventTimesComponent } from './event-times.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateUpdateEventTimesComponent } from './create-update-event-times/create-update-event-times.component';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EventSelectorComponent } from './event-selector/event-selector.component';

@NgModule({
  declarations: [
    // components of event times
    EventTimesComponent,
    CreateUpdateEventTimesComponent,
    EventSelectorComponent
  ],
  imports: [
    // modules for components 
    CommonModule,
    EventTimesRoutingModule,
    HttpClientModule,
    MatDividerModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    SharedModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatCheckboxModule,
    MatPaginatorModule,
    NgxMatMomentModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    
  ]
})
export class EventTimesModule { }
