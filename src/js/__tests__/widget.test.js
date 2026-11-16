import { CardFormWidget } from '..//widget.js';

describe('CardFormWidget (JSDOM)', () => {
  let container;
  let widget;

  beforeEach(() => {
    document.body.innerHTML = '<div class="container"></div>';
    container = document.querySelector('.container');
    widget = new CardFormWidget(container);
    widget.bindToDOM();
  });

  test('renders markup on bindToDOM', () => {
    expect(container.querySelector('.card-form-widget')).toBeTruthy();
    expect(container.querySelector('.input')).toBeTruthy();
    expect(container.querySelector('.submit')).toBeTruthy();
    expect(container.querySelector('.card-logo')).toBeTruthy();
  });

  describe.each([
    ['4111111111111111', 'visa', true],
    ['5555555555554444', 'mastercard', true],
    ['2200000000000004', 'mir', true],
    ['378282246310005', 'amex', true],
    ['6200000000000005', 'unionpay', true],
    ['1234567890123456', 'unknown', false],
  ])('card number "%s"', (number, expectedType, expectedValid) => {
    test(`input event sets logo data-card-type="${expectedType}"`, () => {
      widget.input.value = number;
      widget.input.dispatchEvent(new Event('input', { bubbles: true }));
      expect(widget.logo.dataset.cardType).toBe(expectedType);
    });

    test(`submit sets input class valid=${expectedValid}`, () => {
      widget.input.value = number;
      widget.submit.click();
      expect(widget.input.classList.contains('valid')).toBe(expectedValid);
      expect(widget.input.classList.contains('invalid')).toBe(!expectedValid);
    });
  });
});