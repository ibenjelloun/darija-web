import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsRoutingModule } from './words-routing.module';
import { WordsComponent } from './words.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, WordsRoutingModule],
  declarations: [WordsComponent],
  exports: [WordsComponent]
})
export class WordsModule {}
