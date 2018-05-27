import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { of } from 'rxjs';

@Component({
  selector: 'dar-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  words$;
  constructor(private _historyService: HistoryService) { }

  ngOnInit() {
    this.words$ = of(this._historyService.getWordsHistory());
  }

}
