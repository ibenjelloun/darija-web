import { Component, Input } from '@angular/core';

@Component({
  selector: 'dar-profil-details',
  templateUrl: './profil-details.component.html',
  styleUrls: ['./profil-details.component.scss']
})
export class ProfilDetailsComponent {
  @Input() user;
  @Input() profil;

  computePercentOf(from, goal) {
    const toAchieve = goal - from;
    const current = this.profil ? (this.profil.rank - from) : 0;
    const value = (current / toAchieve);
    return (value > 1 ?  1 : value ) * 100;
  }
}
