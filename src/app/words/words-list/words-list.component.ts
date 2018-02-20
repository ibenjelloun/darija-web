import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Word } from '../model/word';
import { WordsListDataSource } from './words-list-datasource';

@Component({
  selector: 'dar-words-list',
  templateUrl: 'words-list.component.html'
})
export class WordsListComponent implements OnChanges {
  @Input() words$: Observable<Word[]>;
  dataSource;
  displayedColumns = ['french', 'darija'];

  ngOnChanges() {
    this.dataSource = new WordsListDataSource(this.words$);
  }
}
