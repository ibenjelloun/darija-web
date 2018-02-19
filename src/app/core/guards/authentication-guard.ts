import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/app';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private _authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this._authService.getUser().pipe(map(user => user !== null));
  }
}
