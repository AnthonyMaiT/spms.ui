import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventTimesComponent } from './event-times.component';

// routes event time component to event-times
const routes: Routes = [{ path: '', component: EventTimesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventTimesRoutingModule { }
