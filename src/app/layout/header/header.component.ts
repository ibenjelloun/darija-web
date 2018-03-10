import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dar-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  @Output() setNightMode = new EventEmitter<boolean>();
  @Input() nightMode;
  user$;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this.user$ = this._authService.getUser();
  }

  login() {
    this._router.navigate(['/login']);
  }

  logout() {
    this._authService.logout();
  }
}
