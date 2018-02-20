import { Component } from '@angular/core';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dar-authentication',
  templateUrl: 'authentication.component.html',
  styleUrls: ['authentication.component.css']
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
