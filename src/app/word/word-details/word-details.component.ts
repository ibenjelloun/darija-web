import { Word } from './../model/word';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'dar-word-details',
  template: `<div>
                    <dar-word [word]="word"></dar-word>
                    TYPE
                    {{word.type}}
                    EXAMPLES
                    <dar-word-examples [examples]="word.examples"></dar-word-examples>
                    CONJUGATION_PRESENT
                    <div *ngIf="word?.type == 'VERB'">
                        <dar-conjugaison [conjugaison]="word.conjugaisonPresent"></dar-conjugaison>
                    </div>
                    DETAILS
          </div>`
})
export class WordDetailsComponent {
  @Input() word: Word;
}
