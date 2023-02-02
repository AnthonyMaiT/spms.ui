import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }
  // allows user to load/activate modules and components depending if they are an admin or not
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.userValue
    if (user) {
      if (user.role_type_id == 2 || user.role_type_id == 1) {
        return true
      } else {
        this.router.navigate(['/'])
      }
    }
    return false
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.userValue
    if (user) {
      if (user.role_type_id == 2 || user.role_type_id == 1) {
        return true
      } else {
        this.router.navigate(['/'])
      }
    }
    return false
  }
}
