import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAllenamentoPreferitoComponent } from './card-allenamento-preferito.component';

describe('CardAllenamentoPreferitoComponent', () => {
  let component: CardAllenamentoPreferitoComponent;
  let fixture: ComponentFixture<CardAllenamentoPreferitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAllenamentoPreferitoComponent]
    });
    fixture = TestBed.createComponent(CardAllenamentoPreferitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
