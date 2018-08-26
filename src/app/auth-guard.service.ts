import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CanActivate } from '../../node_modules/@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.map(user => {
      if (user) { return true; }
      this.router.navigate(['/login'], { queryParams: { retrunUrl: state.url } });
      return false;
    });
  }

}
