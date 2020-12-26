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
      if (siteBody.classList.contains('nav-wrap-is-visible')) {
        siteBody.classList.remove('nav-wrap-is-visible');
      }
      globalEventBus.emit(Events.global.redirect, { path: Paths.sendLetterPage });
    });

    profileHref.addEventListener('click', (event) => {
      event.preventDefault();
      if (siteBody.classList.contains('nav-wrap-is-visible')) {
        siteBody.classList.remove('nav-wrap-is-visible');
      }
      globalEventBus.emit(Events.global.redirect, { path: Paths.profilePage });
    });

    logoutHref.addEventListener('click', (event) => {
      event.preventDefault();
      if (siteBody.classList.contains('nav-wrap-is-visible')) {
        siteBody.classList.remove('nav-wrap-is-visible');
      }
      globalEventBus.emit(Events.global.logout);
    });

    lettersHref.addEventListener('click', (event) => {
      event.preventDefault();
      if (siteBody.classList.contains('nav-wrap-is-visible')) {
        siteBody.classList.remove('nav-wrap-is-visible');
      }
      globalEventBus.emit(Events.global.redirect, { path: Paths.mainPage });
    });

    const navWrap = document.querySelector('.s-header__nav-wrap');
    const menuToggle = document.querySelector('.s-header__toggle-menu');
    const siteBody = document.querySelector('body');
    const closeNavWrap = navWrap.querySelector('.s-header__overlay-close');

    menuToggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      siteBody.classList.add('nav-wrap-is-visible');
    });

    closeNavWrap.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (siteBody.classList.contains('nav-wrap-is-visible')) {
        siteBody.classList.remove('nav-wrap-is-visible');
      }
    });
  }

  static hide() {
    document.getElementById('navbar').innerHTML = '';
  }
}

export default new NavbarView();
