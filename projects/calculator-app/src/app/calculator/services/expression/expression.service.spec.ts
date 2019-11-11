import { TestBed } from '@angular/core/testing';
import { ExpressionService } from './expression.service';

describe('ExpressionService', () => {
  let service: ExpressionService;
  let expression: string;
  let parsed: string[];
  let resolved: number;

  beforeAll(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ExpressionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve simple expression', () => {
    expression = '1-2+3';
    parsed = service.parse(expression);
    resolved = service.resolve(expression);
    expect(parsed).toEqual(['1', '2', '-', '3', '+']);
    expect(resolved).toBe(2);
  });

  it('should resolve expression with floating numbers', () => {
    expression = '12.5-2.5+3';
    parsed = service.parse(expression);
    resolved = service.resolve(expression);
    expect(parsed).toEqual(['12.5', '2.5', '-', '3', '+']);
    expect(resolved).toBe(13);
  });

  it('should resolve expression with parentheses', () => {
    expression = '1+(2+3)';
    parsed = service.parse(expression);
    resolved = service.resolve(expression);
    expect(parsed).toEqual(['1', '2', '3', '+', '+']);
    expect(resolved).toBe(6);
  });

  it('should resolve expression starting with parenthesis', () => {
    expression = '(10+20)';
    parsed = service.parse(expression);
    resolved = service.resolve(expression);
    expect(parsed).toEqual(['10', '20', '+']);
    expect(resolved).toBe(30);
  });

  it('should resolve expression with operators of different precedence', () => {
    expression = '1+20*3';
    parsed = service.parse(expression);
    resolved = service.resolve(expression);
    expect(parsed).toEqual(['1', '20', '3', '*', '+']);
    expect(resolved).toBe(61);
  });

  it('should resolve expression with function', () => {
    expression = '(cos(0)+2)/3';
    parsed = service.parse(expression);
    resolved = service.resolve(expression);
    expect(parsed).toEqual(['0', 'cos', '2', '+', '3', '/']);
    expect(resolved).toBe(1);
  });

  it('should resolve expression with multiple functions', () => {
    expression = '((sin(0)+cos(0))+tan(0))';
    parsed = service.parse(expression);
    resolved = service.resolve(expression);
    expect(parsed).toEqual(['0', 'sin', '0', 'cos', '+', '0', 'tan', '+']);
    expect(resolved).toBe(1);
  });

  it('should throw exception if there are unknown tokens', () => {
    expression = '1^1';
    expect(() => service.resolve(expression)).toThrowError('Unknown token');
  });

  it('should throw exception if there are unmatched parentheses', () => {
    expression = '(10+2';
    expect(() => service.resolve(expression)).toThrowError('Unmatched left parenthesis');

    expression = '10+2)';
    expect(() => service.resolve(expression)).toThrowError('Unmatched right parenthesis');
  });

  it('should resolve expression with signed numbers', () => {
    expression = 'pos(2)-neg(3)';
    parsed = service.parse(expression);
    resolved = service.resolve(expression);
    expect(parsed).toEqual(['2', 'pos', '3', 'neg', '-']);
    expect(resolved).toBe(5); // +2-(-3) == -2+3 == 1
  });
});
