const PATTERNS = [
  // Мир: 2200-2204 (проверяем до mastercard 2-серии, чтобы не пересекались)
  { type: 'mir', regex: /^220[0-4]/ },
  // Mastercard: 51-55, 2221-2720
  { type: 'mastercard', regex: /^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d\d|27[01]\d|2720)/ },
  // American Express: 34, 37
  { type: 'amex', regex: /^3[47]/ },
  // Visa: 4
  { type: 'visa', regex: /^4/ },
  // UnionPay: 62, 81 (основные префиксы)
  { type: 'unionpay', regex: /^(62|81)/ },
  // Discover: 6011, 65, 644–649 (без 622 — он у UnionPay)
  { type: 'discover', regex: /^(6011|65|64[4-9])/ },
  // JCB: 3528-3589
  { type: 'jcb', regex: /^35(2[89]|[3-8]\d)/ },
  // Diners Club: 300-305, 36, 38
  { type: 'diners', regex: /^3(0[0-5]|[68])/ },
];

export function getCardType(value) {
  const digits = String(value).replace(/\D/g, '');
  if (!digits) return 'unknown';

  for (const { type, regex } of PATTERNS) {
    if (regex.test(digits)) return type;
  }
  return 'unknown';
}