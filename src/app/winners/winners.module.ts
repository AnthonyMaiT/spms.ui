import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinnersRoutingModule } from './winners-routing.module';
import { WinnersComponent } from './winners.component';
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
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateWinnersComponent } from './create-winners/create-winners.component';
import { UpdateWinnersComponent } from './update-winners/update-winners.component';


@NgModule({
  declarations: [
    // components for the winner module
    WinnersComponent,
    CreateWinnersComponent,
    UpdateWinnersComponent
  ],
  imports: [
    // modules for the components
    CommonModule,
    WinnersRoutingModule,
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
    MatPaginatorModule
  ]
})
export class WinnersModule { }
