import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '../model/word';
import { WordsListDataSource } from './words-list-datasource';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'dar-words-list',
  templateUrl: 'words-list.component.html'
})
export class WordsListComponent implements OnChanges {
  @Input() words: Word[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource;
  displayedColumns = ['french', 'darija', 'type'];

  ngOnChanges() {
    // this.dataSource = new WordsListDataSource(this.words$);
    if (this.words) {
      this.dataSource = new MatTableDataSource<Word>(this.words);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
