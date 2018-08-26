import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AngularFireAuth } from '../../node_modules/angularfire2/auth';
import { ActivatedRoute } from '../../node_modules/@angular/router';
import { AppUser } from './models/app-user';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('retrunUrl');
    localStorage.setItem('retrunUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) { return this.userService.get(user.uid); }
        return Observable.of(null);
      })
  }

}
