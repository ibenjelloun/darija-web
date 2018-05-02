import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { tap, first, switchMap, filter, map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from '@firebase/util';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProfilService implements OnDestroy {
  private readonly rankComputeBaseApiUrl = 'https://us-central1-darija-web.cloudfunctions.net/api/validateFirebaseIdToken';
  profilObject;
  subscription: Subscription;

  constructor(
    private _authService: AuthService,
    private afs: AngularFirestore,
    private http: HttpClient
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

  computeRank() {
    return this._authService.getToken().pipe(
      filter(token => token),
      switchMap(token => {
        console.log(token);
        return this.http.get(this.rankComputeBaseApiUrl, { headers: new HttpHeaders({'Authorization': 'Bearer ' + token})});
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
