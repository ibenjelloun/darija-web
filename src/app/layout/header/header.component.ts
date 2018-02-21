import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dar-header',
  template: `
  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span>Darija</span>
      <button mat-icon-button [mat-menu-trigger-for]="menu">
        <mat-icon>more_vert</mat-icon>
      </button>
    </mat-toolbar-row>
    <mat-menu x-position="before" #menu="matMenu">
      <button *ngIf="(user$ | async)" mat-menu-item (click)="logout()">Se déconnecter</button>
      <button *ngIf="!(user$ | async)" mat-menu-item (click)="login()">Se connecter</button>
    </mat-menu>
  </mat-toolbar>
  `,
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  user$;

  constructor(private _authService: AuthService, private _router: Router) {
    this.user$ = this._authService.getUser();
  }

  login() {
    this._router.navigate(['/login']);
  }

  logout() {
    this._authService.logout();
  }
}