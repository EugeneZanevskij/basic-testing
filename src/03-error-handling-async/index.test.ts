// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(resolveValue('page')).resolves.toBe('page');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('message')).toThrow(new Error('message'));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(async () => await rejectCustomError()).rejects.toThrowError(new MyAwesomeError());
  });
});
