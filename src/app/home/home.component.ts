import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'spms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
