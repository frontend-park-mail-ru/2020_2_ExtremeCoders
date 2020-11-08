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

    letterList.addEventListener('click', (event) => {
      console.log('CLICK LETTER', event.target);
      if (event.target.tagName === 'UL') {
        return;
      }
      if (event.target.tagName === 'DIV') {
        console.log('DIV ID ', event.target.id);
        globalEventBus.emit(Events.mainPageView.selectLetter, event.target.id);
        return;
      }
      globalEventBus.emit(Events.mainPageView.selectLetter, event.target.parentNode.id);
    });

    folderList.addEventListener('click', (event) => {
      console.log('CLICK FOLDER', event.target.innerText);
      globalEventBus.emit(Events.mainPageView.selectFolder, event.target.innerText);
    });
  }
}
