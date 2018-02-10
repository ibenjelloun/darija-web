import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from './core/services/auth.service';
import { User } from '@firebase/auth-types';
import { Word } from './word/model/word';

@Component({
  selector: 'dar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  wordsCollection: AngularFirestoreCollection<Word>;
  words$: Observable<Word[]>;
  user$: Observable<User>;

  constructor(private afs: AngularFirestore, private afdb: AngularFireDatabase,
    private _authService: AuthService) {
    this.user$ = this._authService.getUser();
    this.words$ = this.afdb.list<Word>('words', ref => ref.limitToLast(10)).valueChanges();
  }
}
