import { CardFormWidget } from './widget.js';

const container = document.querySelector('.container');
const widget = new CardFormWidget(container);
widget.bindToDOM();