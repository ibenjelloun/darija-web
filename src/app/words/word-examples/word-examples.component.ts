import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WordExample } from '../model/word';

@Component({
  selector: 'dar-word-examples',
  templateUrl: './word-examples.component.html',
  styleUrls: ['./word-examples.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WordExamplesComponent),
      multi: true
    }
  ]
})
export class WordExamplesComponent implements ControlValueAccessor {

  wordExamples: {darija, french}[] = [];
  disabled = false;
  onChange = (wordExamples: {darija, french}[]) => {};
  onTouched = () => {};

  constructor() { }

  changed() {
    this.onChange(this.wordExamples);
  }

  add() {
    this.wordExamples.push({darija: '', french: ''});
    this.onChange(this.wordExamples);
  }

  delete(i: number) {
    this.wordExamples.splice(i, 1);
  }

  writeValue(wordExamples: {darija, french}[]): void {
    this.wordExamples = wordExamples ?  wordExamples : [];
    this.onChange(this.wordExamples);
  }

  registerOnChange(fn: (wordExamples: {darija, french}[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
