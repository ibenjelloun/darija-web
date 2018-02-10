import { WordComponent } from './word/word.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WordDetailsComponent } from './word-details/word-details.component';
import { ConjugaisonComponent } from './conjugaison/conjugaison.component';
import { WordExamplesComponent } from './word-examples/word-examples.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    WordComponent,
    WordDetailsComponent,
    ConjugaisonComponent,
    WordExamplesComponent
  ],
  providers: [],
  exports: []
})
export class WordsModule {}
