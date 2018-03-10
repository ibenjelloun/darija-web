import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Word } from './model/word';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { WordsService } from './services/words.service';
import { AuthService } from '../core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'dar-words',
  templateUrl: './words.component.html',
  styleUrls: ['words.component.css']
})
export class WordsComponent {
  words$ = new Observable<Word[]>();
  wordsSubject$ = new Subject<string>();
  searchField: FormControl;

  constructor(
    private _wordsService: WordsService,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.searchField = new FormControl('');
    const dlsh = this._wordsService.getDynamicLocalSearchHandler();
    this.words$ = dlsh.words$;
    this.wordsSubject$ = dlsh.localSubject$;
    this.searchField.valueChanges.subscribe(() =>
      this.wordsSubject$.next(this.searchField.value)
    );
  }

  addWord() {
    this._authService.user.pipe(first())
    .subscribe(user => {
      if (!user || user.isAnonymous) {
        this._snackBar.open(
          'Pour ajouter un mot, veuillez vous authentifier.',
          'ok',
          {
            duration: 5000
          }
        );
      } else {
        this._router.navigate(['/words/add']);
      }
    });
  }
}
