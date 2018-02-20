import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsRoutingModule } from './words-routing.module';
import { WordsComponent } from './words.component';
import { MaterialModule } from '../material/material.module';
import { WordsListComponent } from './words-list/words-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MaterialModule, WordsRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [WordsComponent, WordsListComponent],
  exports: [WordsComponent]
})
export class WordsModule {}
