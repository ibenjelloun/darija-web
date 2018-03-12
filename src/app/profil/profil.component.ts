import { Component, OnInit } from '@angular/core';
import { ProfilService } from './services/profil.service';

@Component({
  selector: 'dar-profil',
  template:
  `
    <dar-profil-details [user]="(data.user | async)" [profil]="(data.profil | async)"></dar-profil-details>
  `
})
export class ProfilComponent implements OnInit {
  data;

  constructor(private _profileService: ProfilService) {}

  ngOnInit() {
    this.data = this._profileService.getProfilInfo();
  }
}
