import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthService } from '../services/auth.service';
import { User } from '../users/interfaces/user';

@Component({
  selector: 'spms-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {

  user!: User;

  constructor(
    private authService: AuthService, 
    private route: Router,
    public dialog: MatDialog
  ) { 
    this.user = this.authService.userValue
  }

  // name for nav
  name:string = ''
  isAdmin: boolean = false
  isStaff: boolean = false

  ngOnInit(): void {
    // adds name from api to display on nav
    if (this.user) {
      this.name = this.user.first_name + ' ' + this.user.last_name
      if (this.user.role_type_id == 1) {
        this.isAdmin = true
      }
      if (this.user.role_type_id == 2 || this.user.role_type_id == 1) {
        this.isStaff = true
      }
    }
  }

  // used to access profile
  profile() {
    this.route.navigate(['/profile'])
  }

  // used to change password
  changePassword() {
    this.dialog.open(ChangePasswordComponent)
  }

  // logout user and redirects to login page
  logout() {
    this.authService.logout().subscribe(() => this.route.navigate(['/login']))
  }

}
