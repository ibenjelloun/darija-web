import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsRoutingModule } from './words-routing.module';
import { WordsComponent } from './words.component';
import { MaterialModule } from '../material/material.module';
import { WordsListComponent } from './words-list/words-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WordsService } from './services/words.service';
import { WordEditorComponent } from './word-editor/word-editor.component';
import { WordExamplesComponent } from './word-examples/word-examples.component';
import { ConjugaisonComponent } from './conjugaison/conjugaison.component';
import { ConjugaisonService } from './services/conjugaison.service';
import { HistoryService } from './services/history.service';
import { HistoryComponent } from './history/history.component';
import { TranslateModule } from '@ngx-translate/core';
import { WordRankComponent } from './word-rank/word-rank.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    WordsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [
    WordsComponent,
    WordsListComponent,
    WordEditorComponent,
    WordExamplesComponent,
    ConjugaisonComponent,
    HistoryComponent,
    WordRankComponent
  ],
  exports: [WordsComponent],
  providers: [WordsService, ConjugaisonService, HistoryService]
})
export class WordsModule {}
