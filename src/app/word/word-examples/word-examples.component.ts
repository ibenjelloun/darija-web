import { Conjugaison, PhraseExample } from './../model/word';
import { Input } from '@angular/core';
import { Component } from '@angular/core';


@Component({
    selector: 'dar-word-examples',
    template: `
                <div *ngFor="let example of examples">
                    {{example.darija}} / {{example.french}}
                </div>
                `
})
export class WordExamplesComponent {
    @Input()
    examples: PhraseExample[];
}
