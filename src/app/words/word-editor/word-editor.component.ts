import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Word, WordType, WordExample } from '../model/word';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WordsService } from '../services/words.service';
import { tap, first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

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
    private _router: Router,
    public _snackBar: MatSnackBar
  ) {
    this.wordForm = this.fb.group({
      french: ['', Validators.required],
      darija: ['', Validators.required],
      examples: [],
      type: WordType.NOUN,
      racine: '',
      conjugaisonPresent: '',
      conjugaisonPasse: '',
      conjugaisonFutur: ''
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
          .pipe(
            tap(word => {
              this.wordForm.patchValue(word);
              this.loading = false;
            })
          )
          .subscribe();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  update() {
    if (this.wordForm.valid) {
      this._wordsService
        .update(this.id, this.wordForm.value)
        .pipe(
          first(),
          tap(() =>
            this._snackBar.open('Mot mis à jour avec succès.', 'ok', {
              duration: 5000
            })
          )
        )
        .subscribe();
    }
  }

  create() {
    if (this.wordForm.valid) {
      this._wordsService
        .add(this.wordForm.value)
        .pipe(
          first(),
          tap(() =>
            this._snackBar.open('Mot créé avec succès.', 'ok', {
              duration: 5000
            })
          ),
          tap(id => this._router.navigate(['/words/update/' + id]))
        )
        .subscribe();
    } else {
      this._snackBar.open('Veuillez compléter le formulaire.', 'ok', {
        duration: 5000
      });
      this.wordForm.markAsDirty();
    }
  }
}
