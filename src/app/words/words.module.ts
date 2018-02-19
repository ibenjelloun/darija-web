import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsRoutingModule } from './words-routing.module';
import { WordsComponent } from './words.component';

@NgModule({
  imports: [CommonModule, WordsRoutingModule],
  declarations: [WordsComponent],
  exports: [WordsComponent]
})
export class WordsModule {}
