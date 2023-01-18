import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPointRoutingModule } from './add-point-routing.module';
import { AddPointComponent } from './add-point.component';
import {MatStepperModule} from '@angular/material/stepper'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    // component for module
    AddPointComponent
  ],
  imports: [
    // modules for component to use
    CommonModule,
    AddPointRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class AddPointModule { }
