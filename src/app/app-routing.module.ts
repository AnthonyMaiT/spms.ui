import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './app-nav/profile/profile.component';
import { AdminGuard } from './guards/admin.guard';
import { StaffGuard } from './guards/staff.guard';

// routes to direct user to certain components
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  // only a logged in user can see home page
  { path: '', component: HomeComponent, canActivate: [LoginGuard], canLoad: [LoginGuard]},
  { path: 'profile', component: ProfileComponent, canActivate:[LoginGuard], canLoad: [LoginGuard] },
  // users is lazy loaded so would only generate when user is admin
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AdminGuard], canLoad: [AdminGuard]},
  // quarters is lazy loaded so would only activate/load when user is logged in
  { path: 'quarters', loadChildren: () => import('./quarters/quarters.module').then(m => m.QuartersModule), canActivate:[LoginGuard], canLoad: [LoginGuard] },
  // event is lazy loaded so would only activate/load when user is logged in
  { path: 'event', loadChildren: () => import('./events/event/event.module').then(m => m.EventModule), canActivate:[LoginGuard], canLoad: [LoginGuard] },
  // event times is lazy loaded so would only activate/load when user is logged in
  { path: 'event-times', loadChildren: () => import('./events/event-times/event-times.module').then(m => m.EventTimesModule), canActivate:[LoginGuard], canLoad: [LoginGuard] },
  // student point is lazy loaded so would only activate/load when user is logged in
  { path: 'student-points', loadChildren: () => import('./student-points/student-points.module').then(m => m.StudentPointsModule), canActivate:[LoginGuard], canLoad: [LoginGuard] },
  // adding point is lazy loaded so would only activate/load when staff/admin is logged in
  { path: 'add-point', loadChildren: () => import('./add-point/add-point.module').then(m => m.AddPointModule), canActivate:[StaffGuard], canLoad: [StaffGuard] },
    // adding point is lazy loaded so would only activate/load when user is logged in
  { path: 'prizes', loadChildren: () => import('./prizes/prizes.module').then(m => m.PrizesModule), canActivate:[LoginGuard], canLoad: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
