import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrizesComponent } from './prizes.component';

// sets component to root which is /prizes
const routes: Routes = [{ path: '', component: PrizesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrizesRoutingModule { }
