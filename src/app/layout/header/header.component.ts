import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dar-header',
  template: `
  <mat-toolbar class="darija-toolbar" color="primary">
    <mat-toolbar-row>
      <span>Darija</span>
      <button mat-icon-button [mat-menu-trigger-for]="menu">
        <mat-icon>more_vert</mat-icon>
      </button>
    </mat-toolbar-row>
    <mat-menu x-position="before" #menu="matMenu">
      <ng-container *ngIf="(user$ | async)">
        <div class="profil" mat-menu-item>
          <div class="profil-pic">
            <img src="{{(user$ | async)?.photoURL}}">
          </div>
          <div>
            &nbsp;{{(user$ | async)?.displayName}}
          </div>
        </div>
        <div mat-menu-item>
          <mat-slide-toggle [(ngModel)]="theme" (ngModelChange)="setTheme.emit($event)">
            {{ theme ? 'Clair' : 'Sombre'}}
          </mat-slide-toggle>
        </div>
        <button mat-menu-item (click)="logout()">Se déconnecter</button>
      </ng-container>
      <button *ngIf="!(user$ | async)" mat-menu-item (click)="login()">Se connecter</button>
    </mat-menu>
  </mat-toolbar>
  <mat-toolbar></mat-toolbar>
  `,
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  @Output() setTheme = new EventEmitter<boolean>();
  user$;
  theme = true;

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
