import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionDisplayComponent } from './expression-display.component';

describe('ExpressionDisplayComponent', () => {
  let component: ExpressionDisplayComponent;
  let fixture: ComponentFixture<ExpressionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
