import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjugaisonComponent } from './conjugaison.component';

describe('ConjugaisonComponentComponent', () => {
  let component: ConjugaisonComponent;
  let fixture: ComponentFixture<ConjugaisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConjugaisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjugaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
