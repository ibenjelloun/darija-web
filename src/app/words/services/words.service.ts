import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Word, Vote } from '../model/word';
import { firestore, User } from 'firebase/app';
import { map, share, switchMap, tap, filter } from 'rxjs/operators';
import { Subject, Subscription, Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { of, from, combineLatest } from 'rxjs';

@Injectable()
export class WordsService implements OnDestroy {
  private _allWords: Observable<Word[]>;
  private _words: Word[];
  private _user: User;
  private _wordsSubscription: Subscription;
  private _userSubscription: Subscription;
  private isDataAvailableSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private afs: AngularFirestore,
    private _authService: AuthService
  ) {
    this._wordsSubscription = this.getAllWords()
      .pipe(tap(() => this.isDataAvailableSubject.next(false)))
      .subscribe(words => {
        this._words = words;
        this.isDataAvailableSubject.next(true);
      });
    this._userSubscription = this._authService
      .getUser()
      .subscribe(user => (this._user = user));
  }

  public isDataAvailable(): Observable<boolean> {
    return this.isDataAvailableSubject;
  }

  public getAllWords(): Observable<Word[]> {
    if (!this._allWords) {
      this._allWords = this.afs
        .collection<any>('words')
        .snapshotChanges()
        .pipe(map(actions => actions.map(this.actionToWord).sort((a, b) => a.french.localeCompare(b.french)), share()));
    }
    return this._allWords;
  }

  public getDynamicLocalSearchHandler(): { localSubject$; words$ } {
    const localSubject$ = new Subject<string>();
    const words$ = localSubject$.pipe(
      switchMap(search =>
        this.isDataAvailableSubject.pipe(filter(_ => _),
        map(() =>
          this._words
            ? this.getSearchResult(search)
            : []
        ))
      )
    );
    return { localSubject$: localSubject$, words$: words$ };
  }

  public getDynamicSearchHandler(): { fireSubject$; words$ } {
    const fireSubject$ = new Subject<string>();
    const words$ = fireSubject$.pipe(
      switchMap(search =>
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
      )
    );
    return { fireSubject$: fireSubject$, words$: words$ };
  }

  public getWord(id: string): Observable<Word> {
    return from(
      this.afs
        .collection<Word>('words')
        .doc<Word>(id)
        .ref.get()
    ).pipe(map(doc => <Word>doc.data()));
  }

  public add(word: Word): Observable<string> {
    word.createdBy = { id: this._user.uid, username: this._user.displayName };
    return from(
      this.afs.collection<Word>('words').add(word)
    ).pipe(map(doc => doc.id));
  }

  public update(id: string, word: Word): Observable<boolean> {
    word.updatedBy = { id: this._user.uid, username: this._user.displayName };
    return from(
      this.afs.firestore.doc('words/' + id).update(word)
    ).pipe(map(() => true));
  }

  public delete(id: string): Observable<boolean> {
    return from(
      this.afs.firestore.doc('words/' + id).delete()
    ).pipe(map(() => true));
  }

  actionToWord = a => {
    const word = a.payload.doc.data() as Word;
    word.id = a.payload.doc.id;
    return word;
  }

  actionToVote = a => {
    const vote = a.payload.doc.data() as Vote;
    vote.userId = a.payload.doc.id;
    return vote;
  }

  getVotes(id: string): Observable<Vote[]> {
    return this.afs
      .collection<Vote>('words/' + id + '/votes')
      .snapshotChanges()
      .pipe(map(actions => actions.map(this.actionToVote)));
  }

  voteUp(id: string): Observable<boolean> {
    return this.vote(id, 'up');
  }

  voteDown(id: string) {
    return this.vote(id, 'down');
  }

  voteCancel(id: string) {
    return this.vote(id, '');
  }

  private vote(id: string, vote: string): Observable<boolean> {
    return from(
      this.afs
        .collection<Vote>('words/' + id + '/votes')
        .doc(this._user.uid)
        .set({ vote: vote })
    ).pipe(map(() => true));
  }

  private getSearchResult(search) {
    return search ? this._words
    .filter(
      word =>
        word.french &&
        word.darija &&
        (word.french.toLowerCase().includes(search.toLowerCase()) ||
          word.darija.toLowerCase().includes(search.toLowerCase()))
    ) : this._words;
  }

  ngOnDestroy() {
    this._wordsSubscription.unsubscribe();
    this._userSubscription.unsubscribe();
  }
}
