import { template } from './PugTemplates/BaseComponents/navbar.js';
import globalEventBus from '../EventBus.js';
import { Events, Paths } from '../Constants.js';

class NavbarView {
  constructor() {
    this.element = document.body;
  }

  render(data) {
    if (!data) {
      globalEventBus.emit(Events.navbarView.needData);
      return;
    }
    this.element.innerHTML = '';
    console.log('NAVBAR VIEW RENDER', data);
    const navDiv = document.getElementById('navbar') || document.createElement('div');
    navDiv.id = 'navbar';
    navDiv.innerHTML = template(data);
    this.element.insertAdjacentHTML('beforeend', navDiv.innerHTML);

    const sendLetterHref = document.getElementsByName('navbar-send')[0];
    const profileHref = document.getElementsByName('navbar-profile')[0];
    const logoutHref = document.getElementsByName('navbar-exit')[0];
    const lettersHref = document.getElementsByName('navbar-letters')[0];

    sendLetterHref.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.redirect, { path: Paths.sendLetter });
    });

    profileHref.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.redirect, { path: Paths.profile });
    });

    logoutHref.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.logout);
    });

    lettersHref.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.global.redirect, { path: Paths.letters });
    });
  }

  static hide() {
    document.getElementById('navbar').innerHTML = '';
  }
}

export default new NavbarView();
