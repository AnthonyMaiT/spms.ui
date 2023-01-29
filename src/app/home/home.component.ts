import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { QuarterRange } from '../quarters/interfaces/quarter-range';
import { QuartersService } from '../quarters/services/quarters.service';
import { AuthService } from '../services/auth.service';
import { LeaderboardService } from '../services/leaderboard.service';
import { PagedStudentPoint } from '../student-points/interfaces/PagedStudentPoint';
import { PagedUserPoints } from '../users/interfaces/paged-user-points';
import { User } from '../users/interfaces/user';
import { UserPoints } from '../users/interfaces/user-points';
import { Winner } from '../winners/interfaces/Winner';

@Component({
  selector: 'spms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: User;

  // for returning user points and past winners
  pagedPoints!: PagedUserPoints
  points!: UserPoints[]
  winners!: Winner[]
  userPoints: number = 0
  // used to show user points
  showCurrentPoints = true;
  currentQuarter!: QuarterRange

  constructor(private leaderboardService: LeaderboardService, private quartersService: QuartersService, private authService: AuthService) { this.user = this.authService.userValue }

  ngOnInit(): void {
    // gets current quarter for leaderboard data
    this.quartersService.getCurrentQuarter().subscribe((data) => {
      this.currentQuarter = data
      // gets the leaderboard from the service and set to var
      this.leaderboardService.getLeaderboard(1, 5, this.currentQuarter.id.toString()).subscribe((data) => {
        if (data) {
          this.pagedPoints = data
          this.points = data.items
        }
      }, (error) => {

      })
      // gets the current user points if there are any
      if (this.user.role_type_id == 3) {
        this.leaderboardService.getUserPoints(this.currentQuarter.id.toString()).subscribe((data) => {
          this.userPoints = data.points
          this.showCurrentPoints = true
        }, (error) => {
          if (error.error.detail == 'No student points found for user') {
            this.showCurrentPoints = true
          } else {
            this.showCurrentPoints = false;
          }
        })
      } else {
        this.showCurrentPoints = false
      }
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
  }
  // for ngx-pagination
  pageChanged(event: PageChangedEvent) {
    this.leaderboardService.getLeaderboard(event.page, event.itemsPerPage, this.currentQuarter.id.toString()).subscribe((data) => {
      if (data) {
        this.pagedPoints = data
        this.points = data.items
      }
    })
  }

}
