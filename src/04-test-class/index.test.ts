// Uncomment the code below and write your tests
import { InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(10);
    expect(account.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(10);
    expect(() => account.withdraw(20)).toThrowError(new InsufficientFundsError(10));
  });

  test('should throw error when transferring more than balance', () => {
    const accountFrom = getBankAccount(10);
    const accountTo = getBankAccount(20);
    expect(() => accountFrom.transfer(20, accountTo)).toThrowError(new InsufficientFundsError(10));
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(10);
    expect(() => account.transfer(10, account)).toThrowError(new TransferFailedError());
  });

  test('should deposit money', () => {
    const account = getBankAccount(10);
    account.deposit(15);
    expect(account.getBalance()).toEqual(25);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(10);
    account.withdraw(10);
    expect(account.getBalance()).toEqual(0);
  });

  test('should transfer money', () => {
    const accountFrom = getBankAccount(10);
    const accountTo = getBankAccount(20);
    accountFrom.transfer(5, accountTo);
    expect(accountFrom.getBalance()).toEqual(5);
    expect(accountTo.getBalance()).toEqual(25);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(10);
    const fetchBalanceResult = async () => await account.fetchBalance();
    expect(fetchBalanceResult).not.toBeNull();
  });
  
  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(10);
    await account.synchronizeBalance();
    expect(account.getBalance()).not.toBe(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(10);
    expect(async () => await account.synchronizeBalance()).rejects.toThrow(new SynchronizationFailedError());
  });
});
