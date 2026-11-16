import { isValidCardNumber } from './validators.js';
import { getCardType } from './cardType.js';

export class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  static get markup() {
    return `
      <form class="card-form-widget">
        <div class="control">
          <label for="card-input">Номер карты</label>
          <div class="input-wrapper">
            <input
              type="text"
              id="card-input"
              class="input"
              maxlength="19"
              placeholder="0000 0000 0000 0000"
              autocomplete="off"
            >
            <span class="card-logo" data-card-type="unknown"></span>
          </div>
        </div>
        <button type="submit" class="submit">Проверить</button>
        <div class="result"></div>
      </form>
    `;
  }

  static get selector() { return '.card-form-widget'; }
  static get inputSelector() { return '.input'; }
  static get submitSelector() { return '.submit'; }
  static get logoSelector() { return '.card-logo'; }
  static get resultSelector() { return '.result'; }

  bindToDOM() {
    this.parentEl.innerHTML = CardFormWidget.markup;

    this.element = this.parentEl.querySelector(CardFormWidget.selector);
    this.input = this.element.querySelector(CardFormWidget.inputSelector);
    this.submit = this.element.querySelector(CardFormWidget.submitSelector);
    this.logo = this.element.querySelector(CardFormWidget.logoSelector);
    this.result = this.element.querySelector(CardFormWidget.resultSelector);

    this.element.addEventListener('submit', this.onSubmit);
    this.input.addEventListener('input', this.onInput);
  }

  onInput() {
    const type = getCardType(this.input.value);
    this.logo.dataset.cardType = type;
    this.logo.className = `card-logo card-logo--${type}`;
  }

  onSubmit(event) {
    event.preventDefault();
    const valid = isValidCardNumber(this.input.value);

    this.input.classList.toggle('valid', valid);
    this.input.classList.toggle('invalid', !valid);

    this.result.textContent = valid
      ? 'Номер карты корректен'
      : 'Номер карты некорректен';
    this.result.className = `result ${valid ? 'result--valid' : 'result--invalid'}`;
  }
}