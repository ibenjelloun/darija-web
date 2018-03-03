import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dar-conjugaison',
  templateUrl: './conjugaison.component.html',
  styleUrls: ['./conjugaison.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConjugaisonComponent),
      multi: true
    }
  ]
})
export class ConjugaisonComponent implements ControlValueAccessor {
  conjugaison: { ana; nta; nti; houa; hia; hna; ntouma; houma } = {
    ana: '',
    nta: '',
    nti: '',
    houa: '',
    hia: '',
    hna: '',
    ntouma: '',
    houma: ''
  };
  disabled = false;
  onChange = (wordExamples: {
    ana;
    nta;
    nti;
    houa;
    hia;
    hna;
    ntouma;
    houma;
  }) => {}
  onTouched = () => {};

  constructor() {}

  changed() {
    this.onChange(this.conjugaison);
  }

  writeValue(conjugaison: {
    ana;
    nta;
    nti;
    houa;
    hia;
    hna;
    ntouma;
    houma;
  }): void {
    this.conjugaison = conjugaison
      ? conjugaison
      : {
          ana: '',
          nta: '',
          nti: '',
          houa: '',
          hia: '',
          hna: '',
          ntouma: '',
          houma: ''
        };
    this.onChange(this.conjugaison);
  }

  registerOnChange(
    fn: (wordExamples: { ana; nta; nti; houa; hia; hna; ntouma; houma }) => void
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
