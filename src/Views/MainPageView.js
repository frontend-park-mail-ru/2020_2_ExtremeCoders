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
    // const pageForm = document.getElementsByClassName('main-page')[0];
    addFolderForm?.addEventListener('click', (event) => {
      event.preventDefault();
      buttonFolder.classList.toggle('hide');
      page.classList.toggle('blur');
    });

    // const addFolderSend = document.getElementById('add-folder-send');
    // const buttonOfSendFolder = document.getElementsByName('button-of-sended-folder')[0];
    // addFolderSend.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   addFolderSend.classList.toggle('hide');
    //   buttonOfSendFolder.classList.toggle('hide');
    // });

    const summaryRecived = document.getElementById('summary-recived');
    summaryRecived.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.recivedFolder);
    });

    const folderRecivedChoose = document.getElementById('recived');
    folderRecivedChoose.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        // const folder = new FormData();
        // folder.append('folderName', event.target.id);
        globalEventBus.emit(Events.mainPageView.selectFolder, event.target.id, event.target.parentNode.id);
      }
    });

    folderRecivedChoose.addEventListener('dblclick', (event) => {
      if (event.target.tagName === 'INPUT') {
        const current = document.getElementById(event.target.id);
        current.removeAttribute('readonly');
        current.classList.toggle('folder-names-focus');

        current.addEventListener('change', (event) => {
          current.setAttribute('readonly', 'readonly');
        });
      }
    });

    const letters = document.getElementsByName('letters')[0];
    letters.addEventListener('click', (event) => {
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

    // const addFolderButtonSended = document.getElementsByName('button-of-sended-folder')[0];
    // addFolderButtonSended.addEventListener('submit', (event) => {
    //   event.preventDefault();
    //   globalEventBus.emit(Events.mainPageView.addFolderSended, new FormData(addFolderButtonSended));
    // });

    // const chooseFolder = document.getElementById('choose-folder');
    // chooseFolder.addEventListener('submit', (event) => {
    //   event.preventDefault();
    //
    //   const folderName = document.getElementsByName('inFolderName')[0];
    //   const currentName = document.getElementsByName('title-of-current')[0];
    //   const currentNameToogle = document.getElementById('toogle');
    //
    //   const folder = folderName.value.trim();
    //   const current = currentName.id;
    //   const chooseFolderData = new FormData();
    //   chooseFolderData.append('letterId', current);
    //   chooseFolderData.append('folderName', folder);
    //
    //   let type = '';
    //   if (currentNameToogle.checked)
    //     type = 'recived';
    //   else
    //     type = 'sended';
    //
    //   const method = 'PUT';
    //
    //   globalEventBus.emit(Events.mainPageView.inFolder, method, chooseFolderData, type);
    // });
    //
    // const deleteFolder = document.getElementById('delete-folder');
    // deleteFolder.addEventListener('click', (event) => {
    //   event.preventDefault();
    //
    //   const currentName = document.getElementsByName('title-of-current')[0];
    //   const currentNameToogle = document.getElementById('toogle');
    //
    //   const current = currentName.id;
    //   const chooseFolderData = new FormData();
    //   chooseFolderData.append('letterId', current);
    //
    //   let type = '';
    //   if (currentNameToogle.checked)
    //     type = 'recived';
    //   else
    //     type = 'sended';
    //
    //   const method = 'DELETE';
    //
    //   globalEventBus.emit(Events.mainPageView.inFolder, method, chooseFolderData, type);
    // });
  }
}
