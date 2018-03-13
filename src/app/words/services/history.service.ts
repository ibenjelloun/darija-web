import { Injectable } from '@angular/core';
import { Word } from '../model/word';

@Injectable()
export class HistoryService {
  public addWordToHistory(word: Word) {
    let words = this.getWordsHistory();
    words = words ? words : [];
    words = words.length > 10 ? this.getWordsHistory().slice(0, 10) : words;
    words.push(word);
    localStorage.setItem('wordsHistory', JSON.stringify(words));
  }

  public getWordsHistory(): Word[] {
    return JSON.parse(localStorage.getItem('wordsHistory'));
  }
}
