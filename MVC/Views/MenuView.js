import {
  createButton, createHref, createInput, createText,
} from './components.js';
import { globalEventBus } from '../EventBus.js';
import { Events, Pathes } from '../Constants.js';
import { menuTemplate as tmp } from './PugTemplates/Menu.js';

export default class MenuView {
  constructor(element) {
    this.element = element;
  }

  render() {
    this.element.innerHTML = tmp();

    const signInButton = document.getElementsByName('signin')[0];
    const signUpButton = document.getElementsByName('signup')[0];
    const profileButton = document.getElementsByName('profile')[0];

    signInButton.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.redirect, { path: Pathes.signIn });
    });
    signUpButton.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.redirect, { path: Pathes.signUp });
    });
    profileButton.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.redirect, { path: Pathes.profile });
    });
  }
}
