import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => console.log(user)); }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
