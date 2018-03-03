import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Word } from './model/word';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { WordsService } from './services/words.service';

@Component({
  selector: 'dar-words',
  templateUrl: './words.component.html',
  styleUrls: ['words.component.css']
})
export class WordsComponent {
  words$ = new Observable<Word[]>();
  wordsSubject$ = new Subject<string>();
  searchField: FormControl;

  constructor(private _wordsService: WordsService) {
    this.searchField = new FormControl('');
    const dlsh = this._wordsService.getDynamicLocalSearchHandler();
    this.words$ = dlsh.words$;
    this.wordsSubject$ = dlsh.localSubject$;
    this.searchField.valueChanges.subscribe(() =>
      this.wordsSubject$.next(this.searchField.value)
    );
  }
}
