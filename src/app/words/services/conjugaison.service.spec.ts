import { TestBed, inject } from '@angular/core/testing';

import { ConjugaisonService } from './conjugaison.service';

describe('ConjugaisonServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConjugaisonService]
    });
  });

  it('should be created', inject([ConjugaisonService], (service: ConjugaisonService) => {
    expect(service).toBeTruthy();
  }));
});
