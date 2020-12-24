import { Events } from '../Constants.js';
import globalEventBus from '../EventBus.js';
import { template } from './PugTemplates/SendLetterForm.js';
import Navbar from './NavbarView.js';

export default class SendLetterView {
  constructor(element, title) {
    this.element = element;
    this.title = title;
    globalEventBus.on(Events.letterModelEvents.sendLetter.fail,
      SendLetterView.showErrors.bind(this));
  }

  render(data) {
    this.title.text = 'Отправить письмо';

    const newdata = data || {};
    this.element.innerHTML = '';
    Navbar.render();
    this.element.insertAdjacentHTML('beforeend', template(newdata));
    const form = document.getElementsByTagName('FORM')[0];
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.sendLetterView.sendLetter,
        new FormData(form));
    });
    const backButton = document.getElementsByName('back')[0];
    backButton.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.goBack);
    });
  }

  static showErrors(errors) {
    const reciever = document.getElementsByName('to')[0];
    const theme = document.getElementsByName('theme')[0];
    const text = document.getElementsByName('text')[0];
    if (errors.to) {
      reciever.value = '';
      reciever.placeholder = errors.to;
    }
    if (errors.theme) {
      theme.value = '';
      theme.placeholder = errors.theme;
    }
    if (errors.text) {
      text.value = '';
      text.placeholder = errors.text;
    }
  }
}
