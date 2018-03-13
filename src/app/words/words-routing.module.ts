import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WordsComponent } from './words.component';
import { WordEditorComponent } from './word-editor/word-editor.component';
import { AuthenticationGuard } from '../core/guards/authentication-guard';
import { HistoryComponent } from './history/history.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: WordsComponent },
      { path: 'add', component: WordEditorComponent, canActivate: [AuthenticationGuard] },
      { path: 'update/:id', component: WordEditorComponent },
      { path: 'history', component: HistoryComponent }
    ])
  ],
  exports: [RouterModule]
})
export class WordsRoutingModule {}
