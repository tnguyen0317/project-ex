import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class CompanyGuard implements CanActivate {

  constructor(private auth: UserAuthService, private router: Router) {}
  
  canActivate() {
    if (this.auth.loggedIn() && ( this.auth.getRole() === 'company' )) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
