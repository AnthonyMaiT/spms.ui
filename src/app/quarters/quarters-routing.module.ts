import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuartersComponent } from './quarters.component';

// root route for quarters. path is /quarters
const routes: Routes = [{ path: '', component: QuartersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuartersRoutingModule { }
