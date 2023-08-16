import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isloggedin()) {
      console.log('this.authService.isloggedin() ' + this.authService.isloggedin()) ;
      if (route.url.length > 0) {
        const menu = route.url[0].path;
        if (menu === 'user') {
          console.log('this.authService.isloggedin() ' + this.authService.isloggedin()) ;
          console.log(this.authService.getrole() + ' this.authService.isloggedin() ' + this.authService.isloggedin()) ;

          if (this.authService.getrole() === 'admin') {
           return true;
          } else {
            this.router.navigate(['']);
            this.toastr.warning('You do not have access.');
            return false;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
