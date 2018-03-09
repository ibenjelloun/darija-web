import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren:
      'app/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'profil',
    loadChildren:
      'app/profil/profil.module#ProfilModule'
  },
  {
    path: '',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'words',
        loadChildren: 'app/words/words.module#WordsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
