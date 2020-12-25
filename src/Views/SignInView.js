import { Events, Paths } from '../Constants.js';
import globalEventBus from '../EventBus.js';
import { template as tmp } from './PugTemplates/SignInForm.js';

export default class SignInView {
  constructor(element, title) {
    this.element = element;
    this.title = title;
    globalEventBus.on(Events.userModelEvents.signIn.fail, SignInView.showErrors.bind(this));
  }

  render() {
    this.title.text = 'Войти';
    this.element.innerHTML = tmp();

    const form = document.getElementsByTagName('form')[0];
    const signUpButton = document.getElementsByName('signup')[0];

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      globalEventBus.emit(Events.signInViewEvents.submit, { target: 'SignInView', data: formData });
    });

    signUpButton.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.redirect, { path: Paths.signUpPage });
    });
  }

  static showErrors(errors) {
    const passwordField = document.getElementsByName('password')[0];
    const emailField = document.getElementsByName('email')[0];
    if (errors.password) {
      this.createError(passwordField, 'passwordError', errors.password);
    }
    if (errors.email) {
      this.createError(emailField, 'emailError', errors.email);
    }
  }

  createError(input, msgBoxName, text) {
    const msgElem = document.getElementById(msgBoxName);
    if (msgElem) {
      msgElem.innerHTML = text;
    }
    if (!msgElem) {
      const msgElem = document.createElement('p');
      msgElem.id = msgBoxName;
      msgElem.innerHTML = text;
      input.parentNode.appendChild(msgElem);
    }
  }
}
