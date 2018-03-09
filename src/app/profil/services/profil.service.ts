import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { tap, first } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProfilService implements OnDestroy {
  authSubscription: Subscription;
  profil = new BehaviorSubject({});

  constructor(private _authService: AuthService, private afs: AngularFirestore) {
    this.authSubscription = this._authService.getUser().subscribe(user =>
      this.afs
        .collection<any>('users')
        .doc(user.uid)
        .valueChanges()
        .pipe(first())
        .subscribe(profil => this.profil.next(profil))
    );
  }

  getProfilInfo() {
    return { user: this._authService.getUser(), profil: this.profil };
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
