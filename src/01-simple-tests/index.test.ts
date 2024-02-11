// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Add })).toEqual(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 1, action: Action.Subtract })).toEqual(5);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 4, action: Action.Multiply })).toEqual(20);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 4, action: Action.Divide })).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Exponentiate })).toEqual(81);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 4, action: 'other' })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'a', b: 2, action: Action.Add })).toEqual(null);
  });
});
