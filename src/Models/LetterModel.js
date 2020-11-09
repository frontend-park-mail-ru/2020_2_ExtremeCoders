import { Events, Paths } from '../Constants.js';
import globalEventBus from '../EventBus.js';
import validator from './Validator.js';
import myFetch from './myFetch.js';

export default class LetterModel {
  constructor() {
    this.Letters = new Map();
    this.folders = {};
    globalEventBus.on(Events.mainPageController.needGetLetter, this.getLetter.bind(this));
    globalEventBus.on(Events.mainPageController.needGetLetterList, this.getLetterList.bind(this));
    globalEventBus.on(Events.mainPageController.needGetFolderList,
      LetterModel.getFolders.bind(this));
    globalEventBus.on(Events.sendLetterView.sendLetter,
      LetterModel.sendLetter.bind(this));
    globalEventBus.on(Events.global.logout, this.logout.bind(this));
  }

  getLetter(letterId) {
    globalEventBus.emit(Events.letterModelEvents.getLetter.success, this.Letters[letterId]);
  }

  static sendLetter(data) {
    const errors = validator.checkLetterForm(data);
    if (Object.keys(errors).length !== 0) {
      console.log('ERRORS IN SEND LETTER ', errors);
      globalEventBus.emit(Events.letterModelEvents.sendLetter.fail,
        errors);
      return;
    }
    myFetch(Paths.sendMessageToServ, 'POST', data)
      .then((response) => response.json())
      .then((response) => {
        console.log('RESP SEND LETTER', response);
        if (response.Code === 200) {
          console.log('SUCCES SEND LETTER');
          globalEventBus.emit(Events.letterModelEvents.sendLetter.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.sendLetter.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
      });
  }

  static getFolders() {
    // Пока адекватной работы с папками нет, поэтому тут и такая кривоватая заглушка
    globalEventBus.emit(Events.letterModelEvents.getFolderList.success, ['Входящие', 'Исходящие']);
  }

  getLetterList(folder) {
    console.log('GET LETTER LIST FOLDER ', folder);
    let path = '';
    if (folder === 'Входящие') {
      path = Paths.receivedLetters;
    } else {
      path = Paths.sendedLetters;
    }

    myFetch(path, 'POST')
      .then((response) => response.json())
      .then((response) => {
        console.log('RESP GET LETTER LIST', response);
        if (response.Code === 200) {
          console.log('SUCCES GET LETTER LETTER LIST');
          this.Letters = new Map();
          if (response.Letters) {
            response.Letters.forEach((letter) => {
              this.Letters[letter.Id] = letter;
            });
            this.Letters.forEach((letter) => {
              console.log('LETTTER', letter);
            });
          }

          globalEventBus.emit(Events.letterModelEvents.getLetterList.success, this.Letters);
        } else {
          globalEventBus.emit(Events.letterModelEvents.getLetterList.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
        globalEventBus.emit(Events.letterModelEvents.getLetterList.fail, {
          error,
        });
      });
  }

  logout() {
    this.Letters = new Map();
    this.folders = {};
  }
}
