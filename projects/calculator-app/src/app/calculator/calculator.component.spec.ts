import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { ExpressionDisplayComponent } from './components/expression-display/expression-display.component';
import { HistoryDisplayComponent } from './components/history-display/history-display.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { CommandPanelComponent } from './components/command-panel/command-panel.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExpressionDisplayComponent,
        HistoryDisplayComponent,
        ErrorDisplayComponent,
        CommandPanelComponent,
        CalculatorComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
