import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './app-nav/profile/profile.component';
import { AdminGuard } from './guards/admin.guard';

// routes to direct user to certain components
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  // only a logged in user can see home page
  { path: '', component: HomeComponent, canActivate: [LoginGuard], canLoad: [LoginGuard]},
  { path: 'profile', component: ProfileComponent },
  // users is lazy loaded so would only generate when user is admin
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AdminGuard], canLoad: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
