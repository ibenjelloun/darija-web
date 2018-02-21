import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Word } from './model/word';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'dar-words',
  templateUrl: './words.component.html',
  styleUrls: ['words.component.css']
})
export class WordsComponent {
  words$ = new Observable<Word[]>();
  wordsSubject$ = new Subject<string>();
  searchField: FormControl;

  constructor(private afs: AngularFirestore) {
    this.searchField = new FormControl('');
    this.words$ = this.wordsSubject$.switchMap(search =>
      this.afs.collection<Word>('words', ref => ref.where('french', '==' , search)).valueChanges()
    );
    this.searchField.valueChanges.subscribe(() =>
      this.wordsSubject$.next(this.searchField.value)
    );
  }
}
