import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'spms-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  // name for nav
  name:string = ''

  ngOnInit(): void {
    // adds name from api to display on nav
    this.authService.currentUser().subscribe((data) => {
      this.name = data.first_name + ' ' + data.last_name
    })
  }

  // logout user and redirects to login page
  logout() {
    this.authService.logout().subscribe(() => this.route.navigate(['/login']))
  }

}
