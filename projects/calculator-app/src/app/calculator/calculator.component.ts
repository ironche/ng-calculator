import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  calculatorForm = new FormGroup({
    expression: new FormControl('')
  });

  updateExpressionValue(value: string): void {
    const ctrl = this.calculatorForm.get('expression');
    ctrl.setValue(ctrl.value + value);
  }
}
