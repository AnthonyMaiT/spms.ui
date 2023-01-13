import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuartersRoutingModule } from './quarters-routing.module';
import { QuartersComponent } from './quarters.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateEditQuarterRangeComponent } from './create-edit-quarter-range/create-edit-quarter-range.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    // declares components for quarters
    QuartersComponent,
    CreateEditQuarterRangeComponent
  ],
  imports: [
    // modules for components to use
    CommonModule,
    QuartersRoutingModule,
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
    MatSelectModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class QuartersModule { }
