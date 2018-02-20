import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
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
  wordsCollection: AngularFirestoreCollection<Word>;
  words$ = new Observable<Word[]>();
  wordsSubject$ = new Subject<string>();
  searchField: FormControl;

  constructor(
    private afs: AngularFirestore,
    private afdb: AngularFireDatabase
  ) {
    this.searchField = new FormControl('');
    this.words$ = this.wordsSubject$.switchMap(search =>
      this.afdb
        .list<Word>('words', ref => ref.orderByChild('darija').equalTo(search))
        .valueChanges()
    );
    this.searchField.valueChanges.subscribe(() =>
      this.wordsSubject$.next(this.searchField.value)
    );
  }
}
