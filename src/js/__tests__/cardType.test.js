import { getCardType } from '..//cardType.js';

describe('getCardType', () => {
  test.each([
    ['4111111111111111', 'visa'],
    ['4222222222222', 'visa'],
    ['5555555555554444', 'mastercard'],
    ['5105105105105100', 'mastercard'],
    ['2221000000000009', 'mastercard'],
    ['2720999999999996', 'mastercard'],
    ['378282246310005', 'amex'],
    ['371449635398431', 'amex'],
    ['2200000000000004', 'mir'],
    ['2204123456789012', 'mir'],
    ['6200000000000005', 'unionpay'],
    ['6221558812340000', 'unionpay'],
    ['8100000000000000', 'unionpay'],
    ['6011111111111117', 'discover'],
    ['6500000000000002', 'discover'],
    ['3530111333300000', 'jcb'],
    ['30569309025904', 'diners'],
    ['1234567890123456', 'unknown'],
    ['', 'unknown'],
  ])('"%s" → "%s"', (input, expected) => {
    expect(getCardType(input)).toBe(expected);
  });
});