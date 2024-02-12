// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 6, b: 1, action: Action.Subtract, expected: 5 },
    { a: 5, b: 4, action: Action.Multiply, expected: 20 },
    { a: 8, b: 4, action: Action.Divide, expected: 2 },
    { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
    { a: 3, b: 4, action: 'other', expected: null },
    { a: 'a', b: 2, action: Action.Add, expected: null }
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    `should return $expected when $a $action $b`,
    ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toEqual(expected);
  })
  // Consider to use Jest table tests API to test all cases above
});
