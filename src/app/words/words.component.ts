import { Component, OnInit } from '@angular/core';
import { Word } from './model/word';
import { FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { WordsService } from './services/words.service';
import { AuthService } from '../core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { first, filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'dar-words',
  templateUrl: './words.component.html',
  styleUrls: ['words.component.css']
})
export class WordsComponent implements OnInit {
  readonly alphabet = 'abcdefghijklmnopqrstuvwxyz';

  words$ = new Observable<Word[]>();
  wordsSubject$: Subject<string>;
  isDataAvailable$: Observable<boolean>;
  searchField: FormControl;

  constructor(
    private _wordsService: WordsService,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _cookieService: CookieService
  ) {
    this.searchField = new FormControl('');
    this.isDataAvailable$ = this._wordsService.isDataAvailable();
    const dlsh = this._wordsService.getDynamicLocalSearchHandler();
    this.words$ = dlsh.words$;
    this.wordsSubject$ = dlsh.localSubject$;
    this.searchField.valueChanges.subscribe(this.doSearch.bind(this));
  }

  ngOnInit() {
    this.isDataAvailable$
      .pipe(filter(_ => _), first())
      .subscribe(this.doSearch.bind(this));
  }

  doSearch() {
    const term =
      this.searchField.value !== ''
        ? this.searchField.value
        : null;
    this.wordsSubject$.next(term);
  }

  addWord() {
    this._authService.user.pipe(first()).subscribe(user => {
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

  getRandomSearch() {
    return this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
  }
}
