import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../users/interfaces/user';

@Component({
  selector: 'spms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user!: User

  error = false; // for label to say credentials were incorrect
  username: string = ''; // stores username
  password: string = ''; // stores password

  // connects component to router and authservice
  constructor(private route: Router, private authService: AuthService) { this.user = this.authService.userValue }

  ngOnInit(): void {
    // if user is already logged in
    if (this.user) {
      if (!this.user.id) {
        this.route.navigate(['/'])
      }
    }
  }

  login() {
    // adds username and password to formdata in order to login
    var formData: any = new FormData();
    formData.append('username', this.username)
    formData.append('password', this.password)
    // logs in user
    this.authService.login(formData).subscribe(
      data => {
        // after login, reroutes to root
        this.route.navigate(['/']);
      },
      error => {
        // would show label if credentials are wrong
          this.error = true
      });
  }

}
