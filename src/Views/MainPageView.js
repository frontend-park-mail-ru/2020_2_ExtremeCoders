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

    const addFolderRecived = document.getElementById('add-folder-recived');
    const buttonOfRecivedFolder = document.getElementsByClassName('form-add-folder-up')[0];
    const page = document.getElementsByClassName('main-page')[0];
    addFolderRecived.addEventListener('click', (event) => {
      event.preventDefault();
      addFolderRecived.classList.toggle('hide');
      buttonOfRecivedFolder.classList.toggle('hide');
      page.classList.toggle('blur');
    });

    const removeFolderRecived = document.getElementById('remove-folder-recived');
    const form = document.getElementsByClassName('form-add-folder-up')[0];
    const pageBlock = document.getElementsByClassName('main-page')[0];
    removeFolderRecived.addEventListener('click', (event) => {
      event.preventDefault();
      form.classList.toggle('hide');
      pageBlock.classList.toggle('blur');
      addFolderRecived.classList.toggle('hide');
    });

    const addFolderForm = document?.getElementById('button-form-add-letter-folder');
    const buttonFolder = document.getElementsByClassName('form-add-folder-up')[1];
    addFolderForm?.addEventListener('click', (event) => {
      event.preventDefault();
      buttonFolder.classList.toggle('hide');
      page.classList.toggle('blur');
    });

    const removeFolderForm = document.getElementById('remove-form-add-folder-up');
    removeFolderForm.addEventListener('click', (event) => {
      event.preventDefault();
      buttonFolder.classList.toggle('hide');
      page.classList.toggle('blur');
    });

    const summaryRecived = document.getElementById('summary-recived');
    summaryRecived.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.recivedFolder);
    });

    const folderRecivedChoose = document?.getElementById('recived');

    folderRecivedChoose?.addEventListener('click', (event) => {

      const current = folderRecivedChoose.querySelector(`input#${event.target.id}`);

      if (event.target.getAttribute('name') === 'delete-folder') {
        globalEventBus.emit(Events.mainPageView.deleteFolder);
        globalEventBus.emit(Events.mainPageView.recivedFolder);
      }
      if (event.target.getAttribute('name') === 'edit-folder') {
        current.removeAttribute('readonly');
        current.classList.toggle('folder-names-focus');
        current.addEventListener('change', () => {
          const newName = new FormData();
          newName.append('oldName', current.id);
          newName.append('newName', current.value.trim());
          current.setAttribute('readonly', 'readonly');
          globalEventBus.emit(Events.mainPageView.renameFolder, newName);
          globalEventBus.emit(Events.mainPageView.recivedFolder);
        });
      }
      if (event.target.tagName === 'INPUT' && current.hasAttribute('readonly')) {
        globalEventBus.emit(Events.mainPageView.selectFolder, event.target.id, 'recived');
      }
    });

    const letters = document.getElementsByName('letters')[0];
    letters.addEventListener('click', (event) => {
      if (event.target.getAttribute('name') === 'letters') {
        return;
      }
      globalEventBus.emit(Events.mainPageView.selectLetter, event.target.id);
      const id = new FormData();
      id.append('id', event.target.id);
      globalEventBus.emit(Events.mainPageView.sendWrittenLetter, id);
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

    const addFolderButton = document.getElementsByName('button-of-recived-folder')[0];
    addFolderButton.addEventListener('submit', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.addFolderRecived, new FormData(addFolderButton));
    });

    const chooseFolder = document.getElementById('choose-folder');
    chooseFolder.addEventListener('submit', (event) => {
      event.preventDefault();

      const folderName = document.getElementsByName('inFolderName')[0];
      const currentName = document.getElementsByName('title-of-current')[0];

      const folder = folderName.value.trim();
      const current = currentName.id;
      const chooseFolderData = new FormData();
      chooseFolderData.append('letterId', current);
      chooseFolderData.append('folderName', folder);

      const type = 'recived';
      const method = 'PUT';

      globalEventBus.emit(Events.mainPageView.inFolder, method, chooseFolderData, type);
    });

    const deleteFolder = document?.getElementById('delete-folder');
    deleteFolder?.addEventListener('click', (event) => {
      event.preventDefault();

      const currentName = document.getElementsByName('title-of-current')[0];

      const current = currentName.id;
      const chooseFolderData = new FormData();
      chooseFolderData.append('letterId', current);

      const type = 'recived';
      const method = 'DELETE';

      globalEventBus.emit(Events.mainPageView.inFolder, method, chooseFolderData, type);
    });
  }
}
