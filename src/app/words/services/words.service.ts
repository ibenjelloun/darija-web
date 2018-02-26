import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Word } from '../model/word';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { firestore } from 'firebase/app';

@Injectable()
export class WordsService {
  constructor(private afs: AngularFirestore) {}

  public getDynamicSearchHandler(): { fireSubject$; words$ } {
    const fireSubject$ = new Subject<Word[]>();
    const words$ = fireSubject$.switchMap(search =>
      combineLatest(
        this.afs
          .collection<any>('words', ref =>
            ref.where('french', '==', search).limit(5)
          )
          .snapshotChanges()
          .pipe(map(actions => actions.map(this.actionToWord))),
        this.afs
          .collection<Word>('words', ref =>
            ref.where('darija', '==', search).limit(5)
          )
          .snapshotChanges()
          .pipe(map(actions => actions.map(this.actionToWord)))
      ).pipe(map(a => [...a[0], ...a[1]]))
    );
    return { fireSubject$: fireSubject$, words$: words$ };
  }

  public getWord(id: string) {
    return Observable.fromPromise(this.afs.collection<Word>('words')
      .doc<Word>(id)
      .ref
      .get())
      .pipe(map(doc => doc.data()));
  }

  public add(word: Word): Observable<string> {
    return Observable.fromPromise(
      this.afs.collection<Word>('words').add(word)
    ).pipe(map(doc =>
      doc.id));
  }

  public update(word: Word): Observable<boolean> {
    return Observable.fromPromise(
      this.afs.firestore.doc('words/' + word.id).update(word)
    ).pipe(map(() => true));
  }

  actionToWord = a => {
    const word = a.payload.doc.data() as Word;
    word.id = a.payload.doc.id;
    return word;
  }
}
