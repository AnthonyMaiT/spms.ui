import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../users/interfaces/user';

@Component({
  selector: 'spms-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {

  user!: User;

  constructor(
    private authService: AuthService
  ) { 
    this.user = this.authService.userValue
  }
  // checks if user is an admin/staff
  isAdmin: boolean = false
  isStaff: boolean = false
  // tab for help center
  currentTab = 'Home'

  ngOnInit(): void {
    // defines isAdmin and isStaff for certain help pages
    if (this.user) {
      if (this.user.role_type_id == 1) {
        this.isAdmin = true
      }
      if (this.user.role_type_id == 2 || this.user.role_type_id == 1) {
        this.isStaff = true
      }
    }
  }
}
