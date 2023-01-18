import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentPointsComponent } from './student-points.component';

// routes to root of component which is student-points
const routes: Routes = [{ path: '', component: StudentPointsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentPointsRoutingModule { }
