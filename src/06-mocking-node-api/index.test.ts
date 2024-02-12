// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 400);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 400);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 400);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {

  jest.mock('fs', () => ({
    existsSync: jest.fn(),
    readFile: jest.fn(),
  }));

  test('should call join with pathToFile', async () => {
    const pathToFile = 'text.txt';
    const joinSpy = jest.spyOn(require('path'), 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToCheck = 'someRandom.txt';
    require('fs').existsSync.mockReturnValue(false);
    const result = await readFileAsynchronously(pathToCheck);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToCheck = 'someRandom.txt';
    const data = 'some data';
    require('fs').existsSync.mockReturnValue(true);
    require('fs').readFile.mockResolvedValue(data);
    const result = await readFileAsynchronously(pathToCheck);
    expect(result).toBe(data);
  });
});
