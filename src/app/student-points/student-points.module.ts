import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentPointsRoutingModule } from './student-points-routing.module';
import { StudentPointsComponent } from './student-points.component';
import { CreateEditStudentPointComponent } from './create-edit-student-point/create-edit-student-point.component';
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
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    // components for module
    StudentPointsComponent,
    CreateEditStudentPointComponent
  ],
  imports: [
    // modules for the components
    CommonModule,
    StudentPointsRoutingModule,
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
    MatPaginatorModule,
    MatCardModule,
    PaginationModule
  ]
})
export class StudentPointsModule { }
