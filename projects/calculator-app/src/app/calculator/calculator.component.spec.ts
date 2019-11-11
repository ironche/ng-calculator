import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator.component';
import { ExpressionDisplayComponent } from './components/expression-display/expression-display.component';
import { HistoryDisplayComponent } from './components/history-display/history-display.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { CommandPanelComponent } from './components/command-panel/command-panel.component';
import { ExpressionService } from './services/expression/expression.service';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        ExpressionDisplayComponent,
        HistoryDisplayComponent,
        ErrorDisplayComponent,
        CommandPanelComponent,
        CalculatorComponent
      ],
      providers: [
        ExpressionService
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

  it('should update expression value', () => {
    component.updateExpressionValue('1');
    component.updateExpressionValue('2');
    component.updateExpressionValue('3');
    expect(component.input.value).toBe('123');
  });
});
