import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Word, WordType, WordExample } from '../model/word';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WordsService } from '../services/words.service';
import { tap, first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { ConjugaisonService } from '../services/conjugaison.service';
import { AuthService } from '../../core/services/auth.service';
import { HistoryService } from '../services/history.service';

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
  user$;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _wordsService: WordsService,
    private _router: Router,
    public _snackBar: MatSnackBar,
    private _conjugaisonService: ConjugaisonService,
    private _authService: AuthService,
    private _historyService: HistoryService
  ) {
    this.wordForm = this.fb.group({
      french: ['', Validators.required],
      darija: ['', Validators.required],
      examples: [],
      type: WordType.NOUN,
      racine: '',
      conjugaisonPresent: '',
      conjugaisonPast: '',
      conjugaisonFuture: '',
      createdBy: undefined,
      updatedBy: undefined
    });
    this.user$ = this._authService.getUser();
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
              word.id = this.id;
              this._historyService.addWordToHistory(word);
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

  delete() {
    this._wordsService
      .delete(this.id)
      .pipe(
        first(),
        tap(() =>
          this._snackBar.open('Mot supprimé avec succès.', 'ok', {
            duration: 5000
          })
        )
      )
      .subscribe(() => this._router.navigate(['/words']));
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

  generatePresent() {
    if (this.wordForm.value.racine) {
      const conjugaisonPresent = this._conjugaisonService.generatePresentConjugaison(
        this.wordForm.value.racine
      );
      this.wordForm.patchValue(
        Object.assign(this.wordForm.value, {
          conjugaisonPresent: conjugaisonPresent
        })
      );
      this._snackBar.open('Génération de la conjugaison au présent effectué.', 'ok', {
        duration: 5000
      });
    } else {
      this._snackBar.open('Veuillez spécifier le champs racine.', 'ok', {
        duration: 5000
      });
    }
  }

  generatePast() {
    if (this.wordForm.value.racine) {
      const conjugaisonPast = this._conjugaisonService.generatePastConjugaison(
        this.wordForm.value.racine
      );
      this.wordForm.patchValue(
        Object.assign(this.wordForm.value, {
          conjugaisonPast: conjugaisonPast
        })
      );
      this._snackBar.open('Génération de la conjugaison au passé effectué.', 'ok', {
        duration: 5000
      });
    } else {
      this._snackBar.open('Veuillez spécifier le champs racine.', 'ok', {
        duration: 5000
      });
    }
  }

  generateFuture() {
    if (this.wordForm.value.racine) {
      const conjugaisonFuture = this._conjugaisonService.generateFutureConjugaison(
        this.wordForm.value.racine
      );
      this.wordForm.patchValue(
        Object.assign(this.wordForm.value, {
          conjugaisonFuture: conjugaisonFuture
        })
      );
      this._snackBar.open('Génération de la conjugaison au futur effectué.', 'ok', {
        duration: 5000
      });
    } else {
      this._snackBar.open('Veuillez spécifier le champs racine.', 'ok', {
        duration: 5000
      });
    }
  }
}
