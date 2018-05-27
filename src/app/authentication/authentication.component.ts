import { Component } from '@angular/core';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'dar-authentication',
  templateUrl: 'authentication.component.html',
  styleUrls: ['authentication.component.css']
})
export class AuthenticationComponent {

  constructor(private _authService: AuthService, private _router: Router) {
   this._authService.getUser()
   .pipe(first())
   .subscribe(user => {
     if (user) {
       this._router.navigate(['/words']);
     }
   });
  }

  loginWithGoogle() {
    this._authService.loginWithGoogle().then(_ => this._router.navigate(['/words']));
  }

  logout() {
    this._authService.logout();
  }

}
