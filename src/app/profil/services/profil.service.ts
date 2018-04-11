import { Injectable } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { tap, first, switchMap, filter } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from '@firebase/util';

@Injectable()
export class ProfilService {

  constructor(
    private _authService: AuthService,
    private afs: AngularFirestore
  ) {
  }

  getProfil(uid) {
    return this.afs
        .collection<any>('users')
        .doc(uid)
        .valueChanges();
  }

  getUser() {
    return this._authService.getUser();
  }
}
