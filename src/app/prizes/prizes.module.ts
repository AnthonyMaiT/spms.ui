import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrizesRoutingModule } from './prizes-routing.module';
import { PrizesComponent } from './prizes.component';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateUpdatePrizesComponent } from './create-update-prizes/create-update-prizes.component';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio'; 


@NgModule({
  declarations: [
    // components for module
    PrizesComponent,
    CreateUpdatePrizesComponent
  ],
  imports: [
    // features/modules for component
    CommonModule,
    PrizesRoutingModule,
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
    MatPaginatorModule,
    MatSelectModule,
    MatRadioModule
  ]
})
export class PrizesModule { }
