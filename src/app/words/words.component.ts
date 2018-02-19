import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Word } from './model/word';

@Component({
  selector: 'dar-words',
  templateUrl: './words.component.html'
})
export class WordsComponent {

  wordsCollection: AngularFirestoreCollection<Word>;
  words$: Observable<Word[]>;

  constructor(private afs: AngularFirestore, private afdb: AngularFireDatabase) {
    this.words$ = this.afdb.list<Word>('words', ref => ref.limitToLast(10)).valueChanges();
  }
}
