import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/app';
import { map, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): Observable<boolean> {
    this._authService.getUser().pipe(first()).subscribe(user => user ? undefined : this._router.navigate(['/words']));
    return this._authService.getUser().pipe(map(user => user !== null));
  }
}
