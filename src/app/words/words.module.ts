import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsRoutingModule } from './words-routing.module';
import { WordsComponent } from './words.component';
import { MaterialModule } from '../material/material.module';
import { WordsListComponent } from './words-list/words-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WordsService } from './services/words.service';
import { WordEditorComponent } from './word-editor/word-editor.component';

@NgModule({
  imports: [CommonModule, MaterialModule, WordsRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [WordsComponent, WordsListComponent, WordEditorComponent],
  exports: [WordsComponent],
  providers: [WordsService]
})
export class WordsModule {}
