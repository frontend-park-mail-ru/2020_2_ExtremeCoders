import globalEventBus from '../EventBus.js';
import { Events } from '../Constants.js';
import { template } from './PugTemplates/mainPage.js';
import Navbar from './NavbarView.js';

export default class MainPageView {
  constructor(element, title) {
    this.element = element;
    this.title = title;
  }

  parseText(data){
    if (data.letter) {
      let substr = '';
      data.letterSplit = [];
      for (let i = 0; i < data?.letter?.Text?.length; i++) {
        if (data?.letter?.Text[i] === '\n') {
          data.letterSplit.push(substr);
          substr = '';
        } else {
          substr += data?.letter?.Text[i];
        }
      }
      if (data.letterSplit.length === 0) {
        data.letterSplit.push(substr);
      }
    }
  }

  render(data){
    this.title.text = 'Письма';

    if (!data || !data.recivedFolderRecived) {
      globalEventBus.emit(Events.mainPageView.recivedUn, 0);
      globalEventBus.emit(Events.mainPageView.recivedFolder);
      return;
    }

    this.parseText(data);
    this.element.innerHTML = '';
    Navbar.render();
    this.element.insertAdjacentHTML('beforeend', template(data));

    const addFolderRecived = document?.getElementById('add-folder-recived');
    const buttonOfRecivedFolder = document?.getElementsByClassName('form-add-folder-up')[0];
    const page = document?.getElementsByClassName('main-page')[0];
    addFolderRecived?.addEventListener('click', (event) => {
      event.preventDefault();
      addFolderRecived.classList.toggle('hide');
      buttonOfRecivedFolder.classList.toggle('hide');
      page.classList.toggle('blur');
    });

    const removeFolderRecived = document?.getElementById('remove-folder-recived');
    const form = document?.getElementsByClassName('form-add-folder-up')[0];
    const pageBlock = document?.getElementsByClassName('main-page')[0];
    removeFolderRecived.addEventListener('click', (event) => {
      event.preventDefault();
      form.classList.toggle('hide');
      pageBlock.classList.toggle('blur');
      addFolderRecived.classList.toggle('hide');
    });

    const addFolderForm = document?.getElementById('button-form-add-letter-folder');
    const buttonFolder = document?.getElementsByClassName('form-add-folder-up')[1];
    addFolderForm?.addEventListener('click', (event) => {
      event.preventDefault();
      buttonFolder.classList.toggle('hide');
      page.classList.toggle('blur');
    });

    const removeFolderForm = document?.getElementById('remove-form-add-folder-up');
    removeFolderForm.addEventListener('click', (event) => {
      event.preventDefault();
      buttonFolder.classList.toggle('hide');
      page.classList.toggle('blur');
    });

    const summaryRecived = document?.getElementById('summary-recived');
    summaryRecived?.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.recivedFolder);
    });

    const folderRecivedChoose = document?.getElementById('recived');
    folderRecivedChoose?.addEventListener('click', (event) => {
      const current = folderRecivedChoose.querySelector(`input#${event.target.id}`);

      if (event.target.getAttribute('name') === 'delete-folder') {
        const deleteName = new FormData();
        deleteName.append('folderName', event.target.id);
        globalEventBus.emit(Events.mainPageView.deleteFolder, deleteName);
        globalEventBus.emit(Events.mainPageView.recivedFolder);
      }
      if (event.target.getAttribute('name') === 'edit-folder') {
        current.removeAttribute('readonly');
        current.classList.toggle('folder-names-focus');
        current.addEventListener('change', () => {
          const newTitle = current.value.trim();
          const newName = new FormData();
          newName.append('oldName', current.id);
          newName.append('newName', newTitle);
          current.setAttribute('readonly', 'readonly');
          current.id = newTitle;
          current.value = newTitle;
          globalEventBus.emit(Events.mainPageView.renameFolder, newName);
        });
      }
      if (event.target.tagName === 'INPUT' && current.hasAttribute('readonly')) {
        globalEventBus.emit(Events.mainPageView.recivedFolder);
        globalEventBus.emit(Events.mainPageView.selectFolder, event.target.id, 'received', 0);
      }
    });

    const letters = document?.getElementsByName('letters')[0];
    letters?.addEventListener('click', (event) => {
      if (event.target.getAttribute('name') === 'letters') {
        return;
      }
      if (event.target.getAttribute('name') === 'search-group') {
        return;
      }
      if (event.target.getAttribute('name') === 'search-target') {
        return;
      }
      if (event.target.getAttribute('name') === 'add-more') {
        return;
      }
      const isWatch = document?.getElementById(event.target.id);
      globalEventBus.emit(Events.mainPageView.selectLetter, event.target.id);
      const id = new FormData();
      id.append('id', event.target.id);
      if (isWatch?.getAttribute('data-iswatched') === 'false') {
        globalEventBus.emit(Events.mainPageView.sendWrittenLetter, id);
      }
    });

    const recivedUn = document?.getElementById('recivedUn');
    recivedUn?.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.recivedUn, 0);
    });

    const sendedUn = document?.getElementById('sendedUn');
    sendedUn?.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.sendedUn, 0);
    });

    const addFolderButton = document?.getElementsByName('button-of-recived-folder')[0];
    addFolderButton.addEventListener('submit', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.addFolderRecived, new FormData(addFolderButton));
    });

    const chooseFolder = document?.getElementById('choose-folder');
    chooseFolder.addEventListener('submit', (event) => {
      event.preventDefault();

      const folderName = document?.getElementsByName('inFolderName')[0];
      const currentName = document?.getElementsByName('title-of-current')[0];

      const folder = folderName.value;
      const current = currentName.id;
      const chooseFolderData = new FormData();

      const type = 'received';
      const method = 'PUT';

      if (folder === 'Спам') {
        chooseFolderData.append('lid', current);
        globalEventBus.emit(Events.mainPageView.inSpam, chooseFolderData);
        return;
      }
      if (folder === 'Корзина') {
        chooseFolderData.append('lid', current);
        globalEventBus.emit(Events.mainPageView.inBox, chooseFolderData);
        return;
      }
      chooseFolderData.append('letterId', current);
      chooseFolderData.append('folderName', folder);
      globalEventBus.emit(Events.mainPageView.inFolder, method, chooseFolderData, type);
    });

    const deleteFolder = document?.getElementById('delete-folder');
    deleteFolder?.addEventListener('click', (event) => {
      event.preventDefault();

      const currentName = document.getElementsByName('title-of-current')[0];
      const folderIdChoose = document?.getElementsByName('DirectoryRecv')[0];
      const folderId = folderIdChoose?.id;

      const current = currentName.id;
      const chooseFolderData = new FormData();
      chooseFolderData.append('letterId', current);

      const type = 'received';
      const method = 'DELETE';

      globalEventBus.emit(Events.mainPageView.inFolder, method, chooseFolderData, type, folderId);
    });

    const deleteLetter = document?.getElementById('button-remove-letter');
    deleteLetter?.addEventListener('click', (event) => {
      event.preventDefault();
      const currentName = document?.getElementsByName('title-of-current')[0];
      const current = currentName.id;
      const chooseFolderData = new FormData();
      chooseFolderData.append('id', current);
      globalEventBus.emit(Events.mainPageView.deleteLetter, chooseFolderData);
    });

    const backToFolders = document?.getElementById('back-to-folders');
    backToFolders?.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.backToFolders);
    });

    const backToLetters = document?.getElementById('back-to-letters');
    backToLetters?.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.backToLetters);
    });

    const searchInput = document?.getElementById('search-input');
    if (searchInput && searchInput?.value !== '') {
      searchInput?.focus();
      const current = searchInput?.value;
      searchInput.value = '';
      searchInput.value = current;
    }
    searchInput?.addEventListener('input', (event) => {
      event.preventDefault();
      const similar = searchInput.value.trim();
      globalEventBus.emit(Events.mainPageView.startSearch, similar);
    });

    const searchResultList = document?.getElementById('search-result-list');
    searchResultList?.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.getAttribute('name') === 'search-target') {
        const what = event.target.getAttribute('role');
        const value = event.target.id;
        globalEventBus.emit(Events.mainPageView.resultSearch, what, value, 0);
      }
    });

    const addMore = document?.getElementsByName('add-more')[0];
    addMore?.addEventListener('click', (event) => {
      event.preventDefault();
      const typeOfContent = addMore.getAttribute('role');
      const offset = +addMore.id;
      if (typeOfContent === 'recivedUn') {
        globalEventBus.emit(Events.mainPageView.recivedUn, offset);
      }
      if (typeOfContent === 'sendedUn') {
        globalEventBus.emit(Events.mainPageView.sendedUn, offset);
      }
      if (typeOfContent === 'spamUn') {
        globalEventBus.emit(Events.mainPageView.spamUn, offset);
      }
      if (typeOfContent === 'trashUn') {
        globalEventBus.emit(Events.mainPageView.trashUn, offset);
      }
      if (typeOfContent === 'search') {
        const name = addMore.getAttribute('title');
        const what = addMore.getAttribute('data-what');
        globalEventBus.emit(Events.mainPageView.resultSearch, what, name, offset);
      }
      if (typeOfContent === 'selectFolder') {
        const name = addMore.getAttribute('title');
        globalEventBus.emit(Events.mainPageView.selectFolder, name, 'received', offset);
      }
    });

    const spamUn = document?.getElementById('spamUn');
    spamUn?.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.spamUn, 0);
    });

    const trashUn = document?.getElementById('trashUn');
    trashUn?.addEventListener('click', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.mainPageView.trashUn, 0);
    });

    const unWatched = document?.getElementById('unwatched');
    unWatched?.addEventListener('click', (event) => {
      event.preventDefault();
      const currentN = document?.getElementsByName('title-of-current')[0];
      const cur = currentN.id;
      const id = new FormData();
      id.append('id', cur);
      globalEventBus.emit(Events.mainPageView.unWatched, id);
    });
  }
}
