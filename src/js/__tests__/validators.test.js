import { isValidCardNumber } from '..//validators.js';

describe('isValidCardNumber', () => {
  test.each([
    ['4111111111111111', true, 'Visa'],
    ['5555555555554444', true, 'Mastercard'],
    ['378282246310005', true, 'Amex'],
    ['2200000000000004', true, 'Мир'],
    ['6011111111111117', true, 'Discover'],
    ['3530111333300000', true, 'JCB'],
    ['30569309025904', true, 'Diners'],
    ['1234567890123456', false, 'случайные цифры'],
    ['4111 1111 1111 1111', true, 'с пробелами'],
    ['', false, 'пустая строка'],
    ['abc', false, 'буквы'],
    ['4111111111111112', false, 'неверная контрольная сумма'],
  ])('"%s" → %s (%s)', (input, expected) => {
    expect(isValidCardNumber(input)).toBe(expected);
  });
});