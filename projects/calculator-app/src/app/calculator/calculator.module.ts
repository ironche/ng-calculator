import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalculatorRoutingModule } from './calculator-routing.module';
import { ExpressionDisplayComponent } from './components/expression-display/expression-display.component';
import { HistoryDisplayComponent } from './components/history-display/history-display.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { CommandPanelComponent } from './components/command-panel/command-panel.component';
import { CalculatorComponent } from './calculator.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalculatorRoutingModule
  ],
  declarations: [
    ExpressionDisplayComponent,
    HistoryDisplayComponent,
    ErrorDisplayComponent,
    CommandPanelComponent,
    CalculatorComponent
  ]
})
export class CalculatorModule { }
