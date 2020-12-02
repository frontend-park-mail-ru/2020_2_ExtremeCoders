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


    globalEventBus.on(Events.mainPageController.recivedFolder, this.recivedFolder.bind(this));
    globalEventBus.on(Events.mainPageController.sendedFolder, this.sendedFolder.bind(this));

    globalEventBus.on(Events.mainPageController.selectFolder, this.selectFolder.bind(this));
    globalEventBus.on(Events.mainPageController.recivedUn, this.recivedUn.bind(this));
    globalEventBus.on(Events.mainPageController.sendedUn, this.sendedUn.bind(this));

    globalEventBus.on(Events.mainPageController.addFolderRecived, this.addFolderRecived.bind(this));
    globalEventBus.on(Events.mainPageController.addFolderSended, this.addFolderSended.bind(this));

    globalEventBus.on(Events.mainPageController.sendWrittenLetter,
      this.sendWrittenLetter.bind(this));

    globalEventBus.on(Events.mainPageController.inFolder, this.inFolder.bind(this));
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
      path = Paths.getReceivedLetters;
    } else {
      path = Paths.getSendedLetters;
    }

    myFetch(path, 'GET')
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

  recivedFolder() {
    myFetch(Paths.getRecivedFolder, 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.recivedFolders = new Map();
          if (response.Folders) {
            response.Folders.forEach((folder) => {
              this.recivedFolders[folder.Name] = folder;
            });
          }

          globalEventBus.emit(Events.letterModelEvents.recivedFolder.success, this.recivedFolders);
        } else {
          globalEventBus.emit(Events.letterModelEvents.recivedFolder.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.recivedFolder.fail, {
          error,
        });
      });
  }

  sendedFolder() {
    myFetch(Paths.getSendedFolder, 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.sendedFolders = new Map();
          if (response.Folders) {
            response.Folders.forEach((folder) => {
              this.sendedFolders[folder.Name] = folder;
            });
          }

          globalEventBus.emit(Events.letterModelEvents.sendedFolder.success, this.sendedFolders);
        } else {
          globalEventBus.emit(Events.letterModelEvents.sendedFolder.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.sendedFolder.fail, {
          error,
        });
      });
  }

  selectFolder(folder, type) {
    myFetch(Paths.getSelectFolder + '/' + type + '/' + folder, 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.selectFolder = new Map();
          if (response.Letters) {
            response.Letters.forEach((letter) => {
              this.selectFolder[letter.Id] = letter;
            });
          }

          globalEventBus.emit(Events.letterModelEvents.selectFolder.success, this.selectFolder);
        } else {
          globalEventBus.emit(Events.letterModelEvents.selectFolder.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.selectFolder.fail, {
          error,
        });
      });
  }

  recivedUn() {
    myFetch(Paths.getReceivedLetters, 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.selectFolder = new Map();
          if (response.Letters) {
            response.Letters.forEach((letter) => {
              this.selectFolder[letter.Id] = letter;
            });
          }
          console.log('sent letters', this.selectFolder);
          globalEventBus.emit(Events.letterModelEvents.recivedUn.success, this.selectFolder);
        } else {
          globalEventBus.emit(Events.letterModelEvents.recivedUn.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.recivedUn.fail, {
          error,
        });
      });
  }

  sendedUn() {
    myFetch(Paths.getSendedLetters, 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.selectFolder = new Map();
          if (response.Letters) {
            response.Letters.forEach((letter) => {
              this.selectFolder[letter.Id] = letter;
            });
          }
          globalEventBus.emit(Events.letterModelEvents.sendedUn.success, this.selectFolder);
        } else {
          globalEventBus.emit(Events.letterModelEvents.sendedUn.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        globalEventBus.emit(Events.letterModelEvents.sendedUn.fail, {
          error,
        });
      });
  }

  addFolderRecived(name) {
    console.log('addFolderRecived создать папку', name);
    myFetch(Paths.addFolderRecived, 'POST', name)
      .then((response) => response.json())
      .then((response) => {
        console.log('addFolderRecived создана папка', response.Code);
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.addFolderRecived.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.addFolderRecived.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
      });
  }

  addFolderSended(name) {
    myFetch(Paths.addFolderSended, 'POST', name)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.addFolderSended.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.addFolderSended.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
      });
  }

  sendWrittenLetter(letterId) {
    myFetch(Paths.sendWrittenLetter, 'PUT', letterId)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.sendWrittenLetter.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.sendWrittenLetter.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
      });
  }

  inFolder(method, folder, type) {
    myFetch(Paths.inFolder + type + '/folderName/letter', method, folder)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          globalEventBus.emit(Events.letterModelEvents.sendWrittenLetter.success);
        } else {
          globalEventBus.emit(Events.letterModelEvents.sendWrittenLetter.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
      });
  }

  logout() {
    this.Letters = new Map();
    this.folders = {};
  }
}
