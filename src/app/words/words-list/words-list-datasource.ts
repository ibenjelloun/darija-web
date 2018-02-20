import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import { Word } from '../model/word';

export class WordsListDataSource extends DataSource<any> {

    words$: Observable<Word[]>;

    constructor(words$: Observable<Word[]>) {
        super();
        this.words$ = words$;
    }

    connect(): Observable<Word[]> {
        return this.words$;
    }

    disconnect() {
    }
}
