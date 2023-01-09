import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AuthService } from '../login/service/auth.service';
import { User } from '../users/interfaces/user';

@Component({
  selector: 'spms-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private route: Router,
    public dialog: MatDialog
  ) { }

  // name for nav
  name:string = ''

  ngOnInit(): void {
    // adds name from api to display on nav
    this.authService.currentUser().subscribe((data) => {
      this.name = data.first_name + ' ' + data.last_name
    })
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
