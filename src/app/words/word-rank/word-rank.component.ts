import { Component, Input } from '@angular/core';
import { Vote } from '../model/word';
import { WordsService } from '../services/words.service';

@Component({
  selector: 'dar-word-rank',
  template: `
    <button mat-button (click)="voteUp()"><mat-icon
    [color]="(userVote?.vote === 'up' ? 'primary' : 'basic')">thumb_up</mat-icon></button>
    {{ rank }}
    <button mat-button (click)="voteDown()"><mat-icon
    [color]="(userVote?.vote === 'down' ? 'primary' : 'basic')">thumb_down</mat-icon></button>
  `
})
export class WordRankComponent {
  _votes: Vote[];
  rank: number;
  userVote: Vote;
  @Input() wordId;
  @Input() userId;
  @Input()
  set votes(votes: Vote[]) {
    this._votes = votes;
    this.userVote = votes ? votes.find(_ => _.userId === this.userId) : undefined;
    this.rank = this.computeWordRank(votes);
  }

  constructor(private _wordsService: WordsService) {}

  computeWordRank(votes: Vote[]): number {
    return votes && votes.length > 0
      ? votes
          .map(_ => {
            let vote = 0;
            if (_.vote === 'up') {
              vote = 1;
            }
            if (_.vote === 'down') {
              vote = -1;
            }
            return vote;
          })
          .reduce((a, b) => a + b)
      : 0;
  }

  voteUp() {
    this._wordsService.voteUp(this.wordId);
  }

  voteDown() {
    this._wordsService.voteDown(this.wordId);
  }
}
