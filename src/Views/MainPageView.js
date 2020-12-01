import globalEventBus from '../EventBus.js';
import { Events } from '../Constants.js';
import { template } from './PugTemplates/mainPage.js';
import Navbar from './NavbarView.js';

export default class MainPageView {
  constructor(element) {
    this.element = element;
  }

  render(data) {
    console.log('RENDER MAIN PAGE DATA, dat', data);
    if (!data || !data.letterList || !data.folderList) {
      globalEventBus.emit(Events.mainPageView.needData, 'Входящие');
      return;
    }
    this.element.innerHTML = '';
    Navbar.render();
    this.element.insertAdjacentHTML('beforeend', template(data));
    const letterList = document.getElementsByName('letterList')[0];
    const folderList = document.getElementsByClassName('listView')[0];

    const selectColumn = document.getElementById('select-column');

    // letterList.addEventListener('click', (event) => {
    //   console.log('CLICK LETTER', event.target);

    //   if (event.target.tagName === 'UL') {
    //     return;
    //   }
    //   if (event.target.tagName === 'DIV') {
    //     console.log('DIV ID ', event.target.id);
    //     globalEventBus.emit(Events.mainPageView.selectLetter, event.target.id);
    //     return;
    //   }
    //   globalEventBus.emit(Events.mainPageView.selectLetter, event.target.parentNode.id);
    // });
    //
    // folderList.addEventListener('click', (event) => {
    //   console.log('CLICK FOLDER', event.target.id);
    //   globalEventBus.emit(Events.mainPageView.selectFolder, event.target.innerText);
    // });

    // // const navWrap = document.querySelector('.s-header__nav-wrap');
    // const menuToggle = document.querySelector('.letter__toggle-menu');
    // const menu = document.querySelector('.letter-menu');
    // const off = document.querySelector('.letter__overlay-close');
    //
    // menuToggle.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   menu.style.display = 'block';
    //   menuToggle.style.display = 'none';
    //   off.style.display = 'block';
    // });
    //
    // off.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   menu.style.display = 'none';
    //   off.style.display = 'none';
    //   menuToggle.style.display = 'block';
    // });

    // closeNavWrap.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   if (siteBody.classList.contains('nav-wrap-is-visible')) {
    //     siteBody.classList.remove('nav-wrap-is-visible');
    //   }
    // });

    globalEventBus.emit(Events.mainPageView.recivedFolder);
    globalEventBus.emit(Events.mainPageView.sendedFolder);


    const folders = document.getElementsByName('folders')[0];
    folders.addEventListener('click', (event) => {
      if (event.target.tagName === 'DIV' || event.target.tagName === 'P') {
        return;
      }
      if (event.target.tagName === 'A') {
        globalEventBus.emit(Events.mainPageView.selectFolder, event.target.id, event.target.class);
        return;
      }
    });

    const letters = document.getElementsByName('letters')[0];
    letters.addEventListener('click', (event) => {
      if (event.target.tagName === 'DIV') {
        return;
      }
      if (event.target.tagName === 'ARTICLE') {
        globalEventBus.emit(Events.mainPageView.selectLetter, event.target.id);
        return;
      }
    });


    const recivedUn = document.getElementById('recivedUn');
    recivedUn.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.recivedUn);
    });

    const sendedUn = document.getElementById('sendedUn');
    sendedUn.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.sendedUn);
    });
  }
}
