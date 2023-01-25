import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuarterRange } from '../quarters/interfaces/quarter-range';
import { PagedUserPoints } from '../users/interfaces/paged-user-points';
import { UserPoints } from '../users/interfaces/user-points';
import { Winner } from '../winners/interfaces/Winner';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private http: HttpClient) { }

  // gets the leaderboard for the current quarter that is paginated
  getLeaderboard(pagedIndex: number = 1, pageSize: number = 5) {
    return this.http.get<PagedUserPoints>(environment.apiUrl+'/current-leaderboards', {withCredentials: true,
      params: new HttpParams().set('page', pagedIndex)
                              .set('size', pageSize)
    })
  }
  // gets the past quarter from api
  getPastQuarter() {
    return this.http.get<QuarterRange>(environment.apiUrl+'/past-quarter', {withCredentials:true})
  }
  // gets the past winners from api with quarter range
  getPastWinners(quarter_range_id: string = '') {
    return this.http.get<Winner[]>(environment.apiUrl+'/past-winners', {withCredentials: true,
      params: new HttpParams().set('quarter_range_id', quarter_range_id)
    })
  }
  // gets the current user's amount of points
  getCurrentUserPoints() {
    return this.http.get<UserPoints>(environment.apiUrl+'/current-points', {withCredentials: true})
  }


}
