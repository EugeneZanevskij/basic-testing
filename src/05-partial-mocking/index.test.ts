// Uncomment the code below and write your tests
import console from 'console';
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    unmockedFunction();
    expect(mockOne).not.toHaveBeenCalled();
    expect(mockTwo).not.toHaveBeenCalled();
    expect(mockThree).not.toHaveBeenCalled();
  });
  
  test('unmockedFunction should log into console', () => {
    const consoleLog = jest.spyOn(console, 'log');
    // const mock = jest.fn().mockReturnValue('I am not mocked');
    unmockedFunction();
    expect(consoleLog).toHaveBeenCalled();
  });
});