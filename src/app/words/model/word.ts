
export class Word {
    id: string;
    darija: string;
    french: string;
    relevance: number;
    examples: SamplePhrase[];
    type: WordType;
    racine: string;
    conjugaisonPresent: Conjugation;
    conjugaisonPast: Conjugation;
    conjugaisonFuture: Conjugation;
    createdBy: string;
    updatedBy: string;
    lastUpdate: Date;
}

export class Conjugation {
    ana: string;
    nta: string;
    nti: string;
    houa: string;
    hia: string;
    hna: string;
    ntouma: string;
    houma: string;
}

export class SamplePhrase {
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
