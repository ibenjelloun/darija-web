import { Injectable, OnDestroy } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthService implements OnDestroy {
  user: Observable<firebase.User>;
  userObject: firebase.User;
  subscription: Subscription;

  constructor(private firebaseAuth: AngularFireAuth, private _router: Router) {
    this.user = firebaseAuth.authState;
    this.subscription = this.user.subscribe(_ => (this.userObject = _));
  }

  getUser(): Observable<firebase.User> {
    return this.user;
  }

  getUserObject(): firebase.User {
    return this.userObject;
  }

  loginWithGoogle(): Promise<any> {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    this._router.navigate(['']);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
