import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { UsersComponent } from './users.component';

// routes users component to the root of users and only admin access allowed
const routes: Routes = [{ path: '', component: UsersComponent, canActivate: [AdminGuard], canLoad: [AdminGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
