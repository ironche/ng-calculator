import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpressionService } from './services/expression/expression.service';
import { History } from './models/history';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  history: History[] = [];
  calculatorForm = new FormGroup({
    expression: new FormControl('', Validators.required)
  });

  constructor(private expressionService: ExpressionService) { }

  get input(): AbstractControl {
    return this.calculatorForm.get('expression');
  }

  get error(): string {
    return this.calculatorForm.getError('expression');
  }

  updateExpressionValue(value: string): void {
    this.input.setValue(this.input.value + value);
  }

  onSubmit(): void {
    if (this.calculatorForm.valid) {
      try {
        const expression = this.input.value;
        const result = this.expressionService.resolve(expression);
        this.history.push({ expression, result });
        this.input.setValue('');
      } catch (e) {
        this.calculatorForm.setErrors({
          expression: e
        });
      }
    }
  }
}
