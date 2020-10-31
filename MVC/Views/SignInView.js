import {
  createButton, createHref, createInput, createText,
} from './components.js';

import { Events, Pathes } from '../Constants.js';
import { globalEventBus } from '../EventBus.js';
import { signinformTemplate as tmp } from './PugTemplates/SignInForm.js';

export default class SignInView {
  constructor(element) {
    this.element = element;
    globalEventBus.on(Events.userModelEvents.signIn.fail, this.showErrors.bind(this));
  }

  render() {
    this.element.innerHTML = '';
    this.element.innerHTML = tmp();

    const form = document.getElementsByTagName('form')[0];
    const signUpButton = document.getElementsByName('signup')[0];
    const backButton = document.getElementsByName('back')[0];

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      globalEventBus.emit(Events.signInViewEvents.submit, { target: 'SignInView', data: formData });
    });

    backButton.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.goBack);
    });

    signUpButton.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.redirect, { path: Pathes.signUp });
    });
  }

  showErrors(errors) {
    console.log('SIGN IN ERRORS SHOW', errors.errors);
    const passwordField = document.getElementsByName('password')[0];
    const emailField = document.getElementsByName('email')[0];
    console.log(errors.password);
    if (errors.password) {
      passwordField.value = '';
      passwordField.placeholder = errors.password;
    }
    if (errors.email) {
      emailField.value = '';
      emailField.placeholder = errors.email;
    }
  }
}
