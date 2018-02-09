import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from './core/services/auth.service';
import { User } from '@firebase/auth-types';


interface Word {
  id: string;
  fr: string;
  ma: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  wordsCollection: AngularFirestoreCollection<Word>;
  words$: Observable<Word[]>;
  user$: Observable<User>;
  test;

  constructor(private afs: AngularFirestore, private afdb: AngularFireDatabase,
    private _authService: AuthService) {
    this.user$ = this._authService.getUser();

    this.wordsCollection = this.afs.collection('words');
    this.words$ = this.wordsCollection.valueChanges();

    this.test = this.afdb.list('words').valueChanges();
  }
}
