import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfilService } from './services/profil.service';

@Component({
  selector: 'dar-profil',
  template:
  `
    <dar-profil-details [user]="user$ | async" [profil]="profil$ | async"></dar-profil-details>
  `
})
export class ProfilComponent implements OnInit, OnDestroy {
  profil$;
  user$;

  sub;

  constructor(private _profileService: ProfilService) {}

  ngOnInit() {
    this._profileService.computeRank().subscribe();
    this.user$ = this._profileService.getUser();
    this.sub = this.user$.subscribe(user => this.profil$ = this._profileService.getProfil(user.uid));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
