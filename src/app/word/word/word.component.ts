import { Word } from './../model/word';
import { Input } from '@angular/core';
import { Component } from '@angular/core';


@Component({
    selector: 'dar-word',
    template: `{{word.darija}} / {{word.french}}`
})
export class WordComponent {

    @Input()
    word: Word;
}
