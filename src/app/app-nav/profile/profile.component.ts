import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/users/interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'spms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;

  constructor(private authService: AuthService, private route: Router) { this.user = this.authService.userValue }
  // in order to get user async without having to unsubscribe

  isStaff = false

  ngOnInit(): void {
    if (this.user) {
      if (this.user.role_type_id == 1 || this.user.role_type_id == 2) {
        this.isStaff = true
      }
    }  
  }

  // goes back to parent page
  goBack() {
    this.route.navigate(['..'])
  }

}
