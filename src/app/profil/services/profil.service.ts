import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { tap, first, switchMap, filter, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from '@firebase/util';

@Injectable({ providedIn: 'root' })
export class ProfilService implements OnDestroy {
  profilObject;
  subscription: Subscription;

  constructor(
    private _authService: AuthService,
    private afs: AngularFirestore
  ) {
    this.subscription = this.getUser()
      .pipe(map(user => user.uid), switchMap(id => this.getProfil(id)))
      .subscribe(profil => (this.profilObject = profil));
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

  getProfilObject() {
    return this.profilObject;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
