import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { QuartersService } from '../quarters/services/quarters.service';
import { AuthService } from '../services/auth.service';
import { LeaderboardService } from '../services/leaderboard.service';
import { PagedStudentPoint } from '../student-points/interfaces/PagedStudentPoint';
import { PagedUserPoints } from '../users/interfaces/paged-user-points';
import { UserPoints } from '../users/interfaces/user-points';
import { Winner } from '../winners/interfaces/Winner';

@Component({
  selector: 'spms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // for returning user points and past winners
  pagedPoints!: PagedUserPoints
  points!: UserPoints[] 
  winners!: Winner[]
  userPoints: number = 0
  // used to show user points
  showCurrentPoints = true;

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    // gets the leaderboard from the service and set to var
    this.leaderboardService.getLeaderboard().subscribe((data) => {
      if (data) {
        this.pagedPoints = data
        this.points = data.items
      }
    }, (error) => {
      
    })
    // gets the past quarter from service then get past winner with the quarter
    this.leaderboardService.getPastQuarter().subscribe((data) => {
      if (data) {
        this.leaderboardService.getPastWinners(data.id.toString()).subscribe((data) => {
          this.winners = data
        })
      }
    }, (error) => {
      
    })
    // gets the current user points if there are any
    this.leaderboardService.getCurrentUserPoints().subscribe((data) => {
      this.userPoints = data.points
      this.showCurrentPoints = true
    }, (error) => {
      if (error.error.detail == 'No student points found for user') {
        this.showCurrentPoints = true
      } else {
        this.showCurrentPoints = false;
      }
    })
  }
  // for ngx-pagination
  pageChanged(event: PageChangedEvent) {
    this.leaderboardService.getLeaderboard(event.page, event.itemsPerPage).subscribe((data) => {
      if (data) {
        this.pagedPoints = data
        this.points = data.items
      }
    })
  }

}
