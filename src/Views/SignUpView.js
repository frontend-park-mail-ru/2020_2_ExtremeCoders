import { Paths, Events } from '../Constants.js';
import globalEventBus from '../EventBus.js';
import { template as tmp } from './PugTemplates/SignUpForm.js';

export default class SignUpView {
  constructor(element) {
    this.element = element;
    globalEventBus.on(Events.userModelEvents.signUp.fail, SignUpView.showErrors.bind(this));
  }

  render() {
    this.element.innerHTML = tmp();
    const form = document.getElementsByTagName('form')[0];
    const backButton = document.getElementsByName('back')[0];

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.signUpViewEvents.submit, { target: 'SignUpView', data: new FormData(form) });
    });
    backButton.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.redirect, { path: Paths.signInPage });
    });
  }

  static showErrors(errors) {
    SignUpView.clearErrors();
    console.log('SIGN UP ERRORS SHOW', errors);
    const emailField = document.getElementsByName('email')[0];
    const passwordField1 = document.getElementsByName('password1')[0];
    const passwordField2 = document.getElementsByName('password2')[0];
    const nameField = document.getElementsByName('name')[0];
    const surnameField = document.getElementsByName('surname')[0];
    if (errors.password1) {
      SignUpView.createError(passwordField1, 'passwordField1Error', errors.password1);
    } else if (errors.password2) {
      SignUpView.createError(passwordField2, 'passwordField2Error', errors.password2);
    }
    if (errors.email) {
      SignUpView.createError(emailField, 'emailError', errors.email);
    }
    if (errors.name) {
      SignUpView.createError(nameField, 'nameError', errors.name);
    }
    if (errors.surname) {
      SignUpView.createError(surnameField, 'surnameError', errors.surname);
    }
  }

  static createError(input, msgBoxName, text) {
    const msgElem = document.getElementById(msgBoxName);
    if (msgElem) {
      msgElem.innerHTML = text;
    }
    if (!msgElem) {
      const msgElem = document.createElement('label');
      msgElem.id = msgBoxName;
      msgElem.innerHTML = text;
      // input.parentNode.appendChild(msgElem);
      input.parentNode.before(msgElem);
    }
  }

  static clearErrors() {
    const names = ['passwordField1Error', 'passwordField2Error', 'emailError', 'nameError', 'surnameError'];
    names.forEach((el) => {
      const msgElem = document.getElementById(el);
      console.log('MESSAGE ELEMT', el, msgElem);
      if (msgElem) {
        msgElem.innerHTML = '';
      }
    });
  }
}
