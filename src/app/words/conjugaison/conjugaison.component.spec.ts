import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjugaisonComponentComponent } from './conjugaison-component.component';

describe('ConjugaisonComponentComponent', () => {
  let component: ConjugaisonComponentComponent;
  let fixture: ComponentFixture<ConjugaisonComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConjugaisonComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjugaisonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
