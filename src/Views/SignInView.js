
import { Events, Paths } from '../Constants.js';
import  globalEventBus  from '../EventBus.js';
import { template as tmp } from './PugTemplates/SignInForm.js';

export default class SignInView {
  constructor(element) {
    this.element = element;
    globalEventBus.on(Events.userModelEvents.signIn.fail, this.showErrors.bind(this));
  }

  render() {
    this.element.innerHTML = tmp();

    const form = document.getElementsByTagName('form')[0];
    const signUpButton = document.getElementsByName('signup')[0];

    form.addEventListener('submit', (event) => {
      console.log('FORM SUBMIT');
      event.preventDefault();
      const formData = new FormData(form);
      globalEventBus.emit(Events.signInViewEvents.submit, { target: 'SignInView', data: formData });
    });


    signUpButton.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.redirect, { path: Paths.signUp });
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
