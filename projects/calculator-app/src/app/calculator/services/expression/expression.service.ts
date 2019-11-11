import { Injectable } from '@angular/core';
import { Associativity, Operator, ShuntingYard } from '../../models/shunting-yard';

@Injectable({
  providedIn: 'root'
})
export class ExpressionService {
  private shuntingYard: ShuntingYard;

  constructor() {
    this.shuntingYard = new ShuntingYard();

    this.shuntingYard.addOperator(new Operator({ name: '+', method: (a, b) => a + b } as Operator));
    this.shuntingYard.addOperator(new Operator({ name: '-', method: (a, b) => a - b } as Operator));
    this.shuntingYard.addOperator(new Operator({ name: '*', precedence: 2, method: (a, b) => a * b } as Operator));
    this.shuntingYard.addOperator(new Operator({ name: '/', precedence: 2, method: (a, b) => a / b } as Operator));

    const func = { associativity: Associativity.RIGHT, paramsCount: 1 };
    this.shuntingYard.addFunction(new Operator(
      Object.assign({ name: 'neg', method: (a) => -a }, func) as Operator
    ));
    this.shuntingYard.addFunction(new Operator(
      Object.assign({ name: 'pos', method: (a) => a }, func) as Operator
    ));

    const degToRad = Math.PI / 180;
    const calc = (fn, a) => Math.round(fn(a * degToRad) * 100) / 100;

    this.shuntingYard.addFunction(new Operator(
      Object.assign({ name: 'sin', method: (a) => calc(Math.sin, a) }, func) as Operator
    ));
    this.shuntingYard.addFunction(new Operator(
      Object.assign({ name: 'cos', method: (a) => calc(Math.cos, a) }, func) as Operator
    ));
    this.shuntingYard.addFunction(new Operator(
      Object.assign({ name: 'tan', method: (a) => calc(Math.tan, a) }, func) as Operator
    ));
  }

  resolve(expression: string): number {
    return this.shuntingYard.resolve(expression);
  }

  parse(expression: string): string[] {
    return this.shuntingYard.parse(expression);
  }
}
