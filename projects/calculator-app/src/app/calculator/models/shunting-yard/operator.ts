export enum Associativity {
  LEFT = 'left-to-right',
  RIGHT = 'right-to-left'
}

export class Operator {
  name: string;
  precedence: number;
  method: (...args: any[]) => any;
  paramsCount: number;
  associativity: Associativity;

  constructor(obj: Operator) {
    Object.assign(this, obj);

    if (!this.associativity) {
      this.associativity = Associativity.LEFT;
    }

    if (!this.paramsCount) {
      this.paramsCount = 2;
    }

    if (!this.precedence) {
      this.precedence = 1;
    }
  }

  isGreater(op: Operator): boolean {
    return this.precedence > op.precedence;
  }

  isLess(op: Operator): boolean {
    return this.precedence < op.precedence;
  }

  isEqual(op: Operator): boolean {
    return this.precedence === op.precedence;
  }

  isGreaterOrEqual(op: Operator): boolean {
    return !this.isLess(op);
  }

  isLessOrEqual(op: Operator): boolean {
    return !this.isGreater(op);
  }

  hasLeftAssociativity(): boolean {
    return this.associativity === Associativity.LEFT;
  }

  hasRightAssociativity(): boolean {
    return this.associativity === Associativity.RIGHT;
  }
}
