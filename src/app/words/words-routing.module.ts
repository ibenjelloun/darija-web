import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WordsComponent } from './words.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: WordsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class WordsRoutingModule { }
