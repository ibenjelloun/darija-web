import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dar-authentification',
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
export class AuthentificationComponent {

  user$: Observable<User>;

  constructor(private _authService: AuthService) {
    this.user$ = this._authService.getUser();
  }

  loginWithGoogle() {
    this._authService.loginWithGoogle();
  }

  logout() {
    this._authService.logout();
  }

}
