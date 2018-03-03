import { Injectable } from '@angular/core';

@Injectable()
export class ConjugaisonService {
  constructor() {}

  generatePresentConjugaison(racine: string) {
    return {
      ana: 'kan' + racine,
      nta: 'kat' + racine,
      nti: 'kat' + racine,
      houa: 'kay' + racine,
      hia: 'kat' + racine,
      hna: 'kan' + racine,
      ntouma: 'kat' + racine,
      houma: 'kay' + racine
    };
  }

  generatePastConjugaison(racine: string) {
    return {
      ana: racine + 't',
      nta: racine + 'ti',
      nti: racine + 't',
      houa: racine,
      hia: racine + 'et',
      hna: racine + 'na',
      ntouma: racine + 'tiw',
      houma: racine + 'o'
    };
  }

  generateFutureConjugaison(racine: string) {
    return {
      ana: 'ghadi n' + racine,
      nta: 'ghadi t' + racine,
      nti: 'ghadi n' + racine + 'i',
      houa: 'ghadi i' + racine,
      hia: 'ghadi t' + racine,
      hna: 'ghadi n' + racine + 'ou',
      ntouma: 'ghadi t' + racine + 'ou',
      houma: 'ghadi i' + racine + 'ou'
    };
  }
}
