import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';
import { WordsModule } from './words/words.module';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProfilModule } from './profil/profil.module';
import 'hammerjs';
import { HttpClientModule } from '@angular/common/http';
import { HelpComponent } from './help/help.component';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [AppComponent, HelpComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    OverlayModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MaterialModule,
    LayoutModule,
    WordsModule,
    AuthenticationModule,
    ProfilModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
