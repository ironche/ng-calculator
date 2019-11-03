import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-expression-display',
  templateUrl: './expression-display.component.html',
  styleUrls: ['./expression-display.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExpressionDisplayComponent),
      multi: true
    }
  ]
})
export class ExpressionDisplayComponent implements ControlValueAccessor {
  value: string;
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: string) => void = () => {};

  /* istanbul ignore next */
  registerOnChange(fn: (_: string) => void): void {
    this.onChangeCallback = fn;
  }

  /* istanbul ignore next */
  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  /* istanbul ignore next */
  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: string): void {
    const newValue = value || '';
    if (this.value !== newValue) {
      this.value = newValue;
      this.onChangeCallback(newValue);
      this.onTouchedCallback();
    }
  }
}
