import { TestBed, inject } from '@angular/core/testing';

import { ConjugaisonServiceService } from './conjugaison-service.service';

describe('ConjugaisonServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConjugaisonServiceService]
    });
  });

  it('should be created', inject([ConjugaisonServiceService], (service: ConjugaisonServiceService) => {
    expect(service).toBeTruthy();
  }));
});
