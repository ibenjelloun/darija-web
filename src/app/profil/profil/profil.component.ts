import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'dar-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  data;

  constructor(private _profileService: ProfilService) { }

  ngOnInit() {
    this.data = this._profileService.getProfilInfo();
  }
}
