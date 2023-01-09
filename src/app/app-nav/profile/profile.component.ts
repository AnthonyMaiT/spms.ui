import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'spms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }
  // in order to get user async without having to unsubscribe
  user$ = this.authService.getUser$

  isAdmin = false

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(()=>this.isAdmin=true, ()=>this.isAdmin=false)
  }

  // goes back to parent page
  goBack() {
    this.route.navigate(['..'])
  }

}
