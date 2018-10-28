import { Component, Input, OnChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Word } from '../model/word';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'dar-words-list',
  templateUrl: 'words-list.component.html',
  styleUrls: ['words-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
