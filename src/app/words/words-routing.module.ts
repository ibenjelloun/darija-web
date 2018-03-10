import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WordsComponent } from './words.component';
import { WordEditorComponent } from './word-editor/word-editor.component';
import { AuthenticationGuard } from '../core/guards/authentication-guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: WordsComponent },
      { path: 'add', component: WordEditorComponent, canActivate: [AuthenticationGuard] },
      { path: 'update/:id', component: WordEditorComponent }
    ])
  ],
  exports: [RouterModule]
})
export class WordsRoutingModule {}
