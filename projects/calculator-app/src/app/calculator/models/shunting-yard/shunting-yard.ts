import { Operator } from './operator';

export class ShuntingYard {
  private operators: { [name: string]: Operator } = {};
  private functions: { [name: string]: Operator } = {};
  private operatorMasks: string[] = [];
  private functionMasks: string[] = [];
  private numberMasks: string[] = [`\\d+\\.?\\d+`, `\\d`];
  private parenthesesMasks: string[] = [`\\(`, `\\)`];
  private tokenMasks: RegExp;

  addFunction(func: Operator): void {
    this.functions[func.name] = func;
    this.functionMasks.push(func.name);
  }

  addOperator(operator: Operator): void {
    this.operators[operator.name] = operator;
    this.operatorMasks.push(operator.name.replace(/(\+|\-|\*|\/)/g, `\\$1`));
  }

  parse(expression: string, output: string[] = [], operators: string[] = []): string[] {
    if (expression) {
      const token = this.getNextToken(expression);
      if (token) {
        if (this.isFunction(token)) {
          operators.push(token);
        } else if (this.isLeftParenthesis(token)) {
          operators.push(token);
        } else if (this.isRightParenthesis(token)) {
          let operator = this.top(operators);
          while (operator && !this.isLeftParenthesis(operator)) {
            output.push(operators.pop());
            operator = this.top(operators);
          }
          if (this.isLeftParenthesis(operator)) {
            operator = operators.pop();
          }
          if (!operator) {
            throw new Error('Unmatched right parenthesis');
          }
        } else if (this.isOperator(token)) {
          let operator = this.top(operators);
          while (
            operator
            && !this.isLeftParenthesis(operator)
            && (
              this.isFunction(operator)
              || this.operators[operator].isGreater(this.operators[token])
              || (
                this.operators[operator].isEqual(this.operators[token])
                && this.operators[operator].hasLeftAssociativity()
              )
            )
          ) {
            output.push(operators.pop());
            operator = this.top(operators);
          }
          operators.push(token);
        } else {
          // token is number
          output.push(token);
        }
        // continue to next token
        this.parse(expression.slice(token.length), output, operators);
      } else {
        throw new Error('Unknown token');
      }
    } else {
      while (operators.length) {
        const operator = this.top(operators);
        if (this.isLeftParenthesis(operator)) {
          throw new Error('Unmatched left parenthesis');
        }
        output.push(operators.pop());
      }
    }
    return output;
  }

  resolveRpn(arr: string[]): number {
    const stack = [];

    for (let i = 0, len = arr.length; i < len; i++) {
      const op = this.operators[arr[i]] || this.functions[arr[i]];
      if (op) {
        stack.push(op.method(...stack.splice(-op.paramsCount)));
      } else {
        stack.push(parseFloat(arr[i]));
      }
    }

    if (isNaN(stack[0])) {
      throw new Error('Result is not a number');
    }

    return stack[0];
  }

  resolve(expression: string): number {
    return this.resolveRpn(this.parse(expression));
  }

  private isLeftParenthesis(token: string): boolean {
    return token === '(';
  }

  private isRightParenthesis(token: string): boolean {
    return token === ')';
  }

  private isOperator(token: string): boolean {
    return Object.keys(this.operators).includes(token);
  }

  private isFunction(token: string): boolean {
    return Object.keys(this.functions).includes(token);
  }

  private getNextToken(expression: string): string {
    if (!this.tokenMasks) {
      const masks = [
        ...this.operatorMasks,
        ...this.functionMasks,
        ...this.numberMasks,
        ...this.parenthesesMasks
      ].join('|');
      this.tokenMasks = new RegExp(`^(${masks})`, '');
    }
    const res = expression.match(this.tokenMasks);
    return res ? res[0] : null;
  }

  private top(stack: string[] = []) {
    return stack.length ? stack[stack.length - 1] : null;
  }
}
