import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './help/help.component';

export const routes: Routes = [
  { path: '', redirectTo: 'words', pathMatch: 'full' },
  {
    path: 'words',
    loadChildren: 'app/words/words.module#WordsModule'
  },
  {
    path: 'login',
    loadChildren:
      'app/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'profil',
    loadChildren: 'app/profil/profil.module#ProfilModule'
  },
  {
    path: 'help',
    component: HelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
