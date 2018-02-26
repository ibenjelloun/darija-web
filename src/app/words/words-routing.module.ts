import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WordsComponent } from './words.component';
import { WordEditorComponent } from './word-editor/word-editor.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: WordsComponent },
      { path: 'add', component: WordEditorComponent },
      { path: 'update/:id', component: WordEditorComponent }
    ])
  ],
  exports: [RouterModule]
})
export class WordsRoutingModule {}
