import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Word } from '../model/word';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { firestore, User } from 'firebase/app';
import { share } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class WordsService implements OnDestroy {
  private _allWords: Observable<Word[]>;
  private _words: Word[];
  private _user: User;
  private _wordsSubscription: Subscription;
  private _userSubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private _authService: AuthService
  ) {
    this._wordsSubscription = this.getAllWords().subscribe(
      words => (this._words = words)
    );
    this._userSubscription = this._authService
      .getUser()
      .subscribe(user => (this._user = user));
  }

  public getAllWords(): Observable<Word[]> {
    if (!this._allWords) {
      this._allWords = this.afs
        .collection<any>('words')
        .snapshotChanges()
        .pipe(map(actions => actions.map(this.actionToWord)), share());
    }
    return this._allWords;
  }

  public getDynamicLocalSearchHandler(): { localSubject$; words$ } {
    const localSubject$ = new Subject<string>();
    const words$ = localSubject$.switchMap(search =>
      of(
        this._words ?
        this._words
          .filter(
            word =>
             word.french &&
              word.darija &&
              (word.french.toLowerCase().includes(search.toLowerCase()) ||
                word.darija.toLowerCase().includes(search.toLowerCase()))
          )
          .slice(0, 5) : []
      )
    );
    return { localSubject$: localSubject$, words$: words$ };
  }

  public getDynamicSearchHandler(): { fireSubject$; words$ } {
    const fireSubject$ = new Subject<string>();
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

  public getWord(id: string): Observable<Word> {
    return Observable.fromPromise(
      this.afs
        .collection<Word>('words')
        .doc<Word>(id)
        .ref.get()
    ).pipe(map(doc => <Word>(doc.data())));
  }

  public add(word: Word): Observable<string> {
    word.createdBy = this._user.displayName;
    return Observable.fromPromise(
      this.afs.collection<Word>('words').add(word)
    ).pipe(map(doc => doc.id));
  }

  public update(id: string, word: Word): Observable<boolean> {
    word.updatedBy = this._user.displayName;
    return Observable.fromPromise(
      this.afs.firestore.doc('words/' + id).update(word)
    ).pipe(map(() => true));
  }

  actionToWord = a => {
    const word = a.payload.doc.data() as Word;
    word.id = a.payload.doc.id;
    return word;
  }

  ngOnDestroy() {
    this._wordsSubscription.unsubscribe();
    this._userSubscription.unsubscribe();
  }
}
