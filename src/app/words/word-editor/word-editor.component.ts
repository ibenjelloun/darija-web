import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Word, WordType } from '../model/word';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WordsService } from '../services/words.service';
import { tap, first } from 'rxjs/operators';

@Component({
  selector: 'dar-word-editor',
  templateUrl: 'word-editor.component.html',
  styleUrls: ['word-editor.component.css']
})
export class WordEditorComponent implements OnInit, OnDestroy {
  id: string;
  wordForm: FormGroup;
  sub: any;
  wordTypes = Object.keys(WordType).map(_ => WordType[_]);
  creation = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _wordsService: WordsService,
    private _router: Router
  ) {
    this.wordForm = this.fb.group({
      french: ['', Validators.required],
      darija: ['', Validators.required],
      examples: '',
      type: '',
      racine: '',
      conjugaison: ''
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.loading = true;
        this.id = params['id'];
        this.creation = false;
        this._wordsService
          .getWord(this.id)
          .pipe(tap(word => {
            this.wordForm.patchValue(word);
            this.loading = false;
          }))
          .subscribe();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  update() {
    if (this.wordForm.valid) {
      this._wordsService.update(this.wordForm.value);
    }
  }

  create() {
    if (this.wordForm.valid) {
      this._wordsService
        .add(this.wordForm.value)
        .pipe(
          first(),
          tap(id => this._router.navigate(['/words/update/' + id]))
        );
    }
  }
}
