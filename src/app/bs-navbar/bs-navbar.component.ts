import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
