import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'spms.ui';

  // hides toolbar
  hideToolBar = true;

  // router to check page
  constructor(private route: Router) { }

  // checks page for certain criterias
  ngDoCheck(): void {
    // hides toolbar if on login page
    if (this.route.url === '/login') {
      this.hideToolBar = true
    } else {
      this.hideToolBar = false
    }
  }
}
