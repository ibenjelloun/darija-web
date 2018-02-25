import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Word } from '../model/word';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WordsService {
  constructor(private afs: AngularFirestore) {}

  public getDynamicSearchHandler(): { fireSubject$; words$ } {
    const fireSubject$ = new Subject<Word[]>();
    const words$ = fireSubject$.switchMap(search =>
      combineLatest(
        this.afs
          .collection<Word>('words', ref => ref.where('french', '==', search))
          .valueChanges(),
        this.afs
          .collection<Word>('words', ref => ref.where('darija', '==', search))
          .valueChanges()
      ).pipe(map(a => [...a[0], ...a[1]]))
    );
    return { fireSubject$: fireSubject$, words$: words$ };
  }

  public add(word: Word) {
    this.afs.collection<Word>('words').add(word);
  }

  public update(word: Word) {
    this.afs.firestore.doc('words/' + word.id).update(word);
  }
}
