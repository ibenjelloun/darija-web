import { Component } from '@angular/core';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dar-authentication',
  template: `
              <ng-container *ngIf="!(user$ | async)">
                <button (click)="loginWithGoogle()">
                  Login
                </button>
              </ng-container>
              <ng-container *ngIf="(user$ | async)">
                <button (click)="logout()">
                  Logout
                </button>
              </ng-container>
            `
})
export class AuthenticationComponent {

  user$: Observable<User>;

  constructor(private _authService: AuthService, private _router: Router) {
    this.user$ = this._authService.getUser();
  }

  loginWithGoogle() {
    this._authService.loginWithGoogle().then(_ => this._router.navigate(['/words']));
  }

  logout() {
    this._authService.logout();
  }

}
