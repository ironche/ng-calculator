import {Injectable} from '@angular/core';
import {Associativity, Operator, ShuntingYard} from '../../models/shunting-yard';

@Injectable({
  providedIn: 'root'
})
export class ExpressionService {
  private shuntingYard: ShuntingYard;

  constructor() {
    this.shuntingYard = new ShuntingYard();

    this.shuntingYard.addOperator(new Operator({ name: '+', precedence: 1, method: (a, b) => a + b } as Operator));
    this.shuntingYard.addOperator(new Operator({ name: '-', precedence: 1, method: (a, b) => a - b } as Operator));
    this.shuntingYard.addOperator(new Operator({ name: '*', precedence: 2, method: (a, b) => a * b } as Operator));
    this.shuntingYard.addOperator(new Operator({ name: '/', precedence: 2, method: (a, b) => a / b } as Operator));

    const trig = { precedence: 1, associativity: Associativity.RIGHT, paramsCount: 1 };
    this.shuntingYard.addFunction(new Operator(Object.assign({ name: 's', method: Math.sin }, trig) as Operator));
    this.shuntingYard.addFunction(new Operator(Object.assign({ name: 'c', method: Math.cos }, trig) as Operator));
    this.shuntingYard.addFunction(new Operator(Object.assign({ name: 't', method: Math.tan }, trig) as Operator));
  }

  resolve(expression: string): number {
    return this.shuntingYard.resolve(expression);
  }

  parse(expression: string): string[] {
    return this.shuntingYard.parse(expression);
  }

  // readonly OPERANDS: string[] = [`\\+`, `\\-`, `\\*`, `\\/`, `sin`, `cos`, `tan`];
  // readonly NUMBERS: string[] = [`\\d`, `\\d+\\.?\\d+`];
  // readonly GROUPS: string[] = [`\\(`, `\\)`];
  //
  // split(expression: string = ''): string[] {
  //   const regex = new RegExp('(' + [...this.NUMBERS, ...this.OPERANDS].join('|') + ')', 'g');
  //   return expression.split(regex).filter((val: string) => !!val);
  // }
  //
  // validate(expression: string): boolean {
  //   return this.split(expression).every((val: string) => /^$/.test(val));
  // }
}
