import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserStepComponent } from './user-step.component';

// routes component to /user-steps
const routes: Routes = [{ path: '', component: UserStepComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserStepRoutingModule { }
