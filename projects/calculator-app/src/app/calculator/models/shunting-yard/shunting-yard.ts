import { Operator } from './operator';

export class ShuntingYard {
  private operators: { [name: string]: Operator } = {};
  private functions: { [name: string]: Operator } = {};

  log(): void {
    console.log(this.operators);
  }

  addFunction(func: Operator): void {
    this.functions[func.name] = func;
    this.operators[func.name] = func;
  }

  addOperator(operator: Operator): void {
    this.operators[operator.name] = operator;
  }

  parse(expression: string): string[] {
    const output: string[] = [];
    const stack: string[] = [];
    let sign: string;
    let lastToken: string;
    let token: string;

    for (let i = 0, len = expression.length; i < len; i++) {
      token = expression[i];
      if (token === ' ') {
        continue; // ignore spaces
      }
      if (sign) {
        sign += token;
        token = sign;
        sign = null;
      }
      if (this.isLeftParenthesis(token)) {
        stack.push(token);
      } else if (this.isFunction(token)) {
        stack.push(token);
      } else if (this.isRightParenthesis(token)) {
        let operator;
        while ((operator = stack.pop()) && !this.isLeftParenthesis(operator)) {
          if (!this.isFunction(operator)) {
            output.push(operator);
          }
        }
        if (typeof operator === 'undefined') {
          throw new Error('Mismatched right parenthesis');
        }
      } else if (this.isOperator(token)) {
        if (!lastToken || lastToken === '(') {
          sign = token;
          continue;
        }
        while (stack.length) {
          const thisOperator = this.operators[token];
          const operator = this.operators[stack[stack.length - 1]];
          if (!operator || !thisOperator) {
            break;
          }
          if (
            (thisOperator.hasLeftAssociativity() && thisOperator.isLessOrEqual(operator))
            || thisOperator.isLess(operator)
          ) {
            output.push(stack.pop());
          } else {
            break;
          }
        }
        stack.push(token);
      } else {
        if (!lastToken || this.isLeftParenthesis(lastToken) || this.isOperator(lastToken)) {
          output.push(token);
        } else {
          output[output.length - 1] += token;
        }
      }
      lastToken = token;
    }

    while (stack.length) {
      token = stack.pop()
      if (this.isLeftParenthesis(token)) {
        throw new Error('Mismatched left parenthesis');
      }
      output.push(token);
    }

    return output;
  }

  resolveRpn(arr: string[]): number {
    const stack = [];

    for (let i = 0, len = arr.length; i < len; i++) {
      const op = this.operators[arr[i]];
      if (op) {
        console.log(op.name, op.paramsCount, stack);
        stack.push(op.method(...stack.splice(-op.paramsCount)));
      } else {
        console.log(stack);
        stack.push(parseFloat(arr[i]));
      }
    }

    return stack[0];
  }

  resolve(expression: string): number {
    return this.resolveRpn(this.parse(expression));
  }

  private isLeftParenthesis(token: any): boolean {
    return token === '(';
  }

  private isRightParenthesis(token: any): boolean {
    return token === ')';
  }

  private isOperator(token: any): boolean {
    return Object.keys(this.operators).includes(token) && !this.isFunction(token);
  }

  private isFunction(token: any): boolean {
    return Object.keys(this.functions).includes(token);
  }
}
