import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  // allows user to access certain modules when logged in
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.userValue
    if (user) {
      if (user.id) {
        return true
      }
      this.router.navigate(['/login'])
      return false
    }
    this.router.navigate(['/login'])
    return false
  }
  // loads certain modules when user is logged in
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.userValue
    if (user) {
      if (user.id) {
        return true
      }
      this.router.navigate(['/login'])
      return false
    }
    this.router.navigate(['/login'])
    return false
  }
}
