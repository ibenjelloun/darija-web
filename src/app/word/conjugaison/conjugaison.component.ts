import { Conjugaison } from './../model/word';
import { Component, Input } from '@angular/core';


@Component({
    selector: 'dar-conjugaison',
    template: `<div>
                    <div>ana {{conjugaison.ana}}</div>
                    <div>nta {{conjugaison.nta}}</div>
                    <div>nti {{conjugaison.nti}}</div>
                    <div>houa {{conjugaison.houa}}</div>
                    <div>hia {{conjugaison.hia}}</div>
                    <div>7na {{conjugaison.hna}}</div>
                    <div>ntouma {{conjugaison.ntouma}}</div>
                    <div>houma {{conjugaison.houma}}</div>
                </div>`
})
export class ConjugaisonComponent {
    @Input()
    conjugaison: Conjugaison;
}
