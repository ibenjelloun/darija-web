
export class Word {
  id: number;
  darija: string;
  french: string;
  relevance: number;
  examples: PhraseExample[];
  type: WordType;
  racine: string;
  conjugaisonPresent: Conjugaison;
  conjugaisonPast: Conjugaison;
  conjugaisonFuture: Conjugaison;
  createdBy: string;
  updatedBy: string;
  lastUpdate: Date;
}

export class Conjugaison {
  ana: string;
  nta: string;
  nti: string;
  houa: string;
  hia: string;
  hna: string;
  ntouma: string;
  houma: string;
}

export class PhraseExample {
  darija: string;
  french: string;
  relevance: number;
  createdBy: string;
}

export enum WordType {
  VERB = 'VERB',
  ADJECTIVE = 'ADJECTIVE',
  NOUN = 'NOUN'
}
