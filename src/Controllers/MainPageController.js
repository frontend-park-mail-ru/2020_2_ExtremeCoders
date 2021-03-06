import { Paths, Events } from '../Constants.js';
import globalEventBus from '../EventBus.js';

class MainPageController {
  constructor(MainPageView) {
    this.mainPageView = MainPageView;
    this.data = {};
    this.data.searchResult = {};
    this.data.screenWidth = window.innerWidth;
    this.data.folderColumn = true;
    this.data.letterColumn = false;
    this.data.oneLetterColumn = false;
    this.data.offset = 0;
    this.data.typeOfContent = 'recivedUn';
    this.data.nameOfFolder = '';
    this.data.letterSplit = [];
    this.data.selectFolder = [];
    this.data.letter = {};
    this.data.isNeedToPag = false;
    this.data.whatOfContent = '';

    this.data.notification = false;
    this.data.notificationData = {};

    globalEventBus.on(Events.mainPageView.selectLetter, (letterId) => {
      this.data.selectFolder.forEach((letter) => {
        if (letter.Id === +letterId) {
          this.data.letter = letter;
        }
      });
      this.data.buttonPlus = true;
      this.data.folderColumn = false;
      this.data.letterColumn = false;
      this.data.oneLetterColumn = true;
      this.mainPageView.render(this.data);
    });

    globalEventBus.on(Events.letterModelEvents.sendLetter.success, () => {
      globalEventBus.emit(Events.global.redirect, { path: Paths.mainPage });
    });

    globalEventBus.on(Events.mainPageView.recivedFolder, () => {
      globalEventBus.emit(Events.mainPageController.recivedFolder);
      const h = (data) => {
        globalEventBus.off(Events.letterModelEvents.recivedFolder.success, h);
        this.data.recivedFolder = data;
        this.data.recivedFolderRecived = true;
        this.data.folderColumn = true;
        this.data.letterColumn = false;
        this.data.oneLetterColumn = false;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.recivedFolder.success, h);
    });

    globalEventBus.on(Events.mainPageView.selectFolder, (folder, type, howToSkip) => {
      globalEventBus.emit(Events.mainPageController.selectFolder, folder, type, howToSkip);
      const h = (data, offset, isNeedToPag) => {
        globalEventBus.off(Events.letterModelEvents.selectFolder.success, h);
        if (offset === 0) {
          this.data.selectFolder = data;
        } else {
          this.data.selectFolder = this.data.selectFolder.concat(data);
        }
        this.data.offset = offset;
        this.data.offset += 5;
        this.data.typeOfContent = 'selectFolder';
        this.data.letter = {};
        this.data.folderColumn = false;
        this.data.letterColumn = true;
        this.data.oneLetterColumn = false;
        this.data.nameOfFolder = folder;
        this.data.isNeedToPag = isNeedToPag;
        this.mainPageView.render(this.data);
      };
      const h2 = () => {
        globalEventBus.off(Events.letterModelEvents.selectFolder.fail, h2);
        this.data.selectFolder = new Map();
        this.data.folderColumn = false;
        this.data.letterColumn = true;
        this.data.oneLetterColumn = false;
        this.data.offset = 0;
        this.data.nameOfFolder = '';
        this.data.letter = {};
        this.data.typeOfContent = 'selectFolder';
        this.data.isNeedToPag = false;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.selectFolder.success, h);
      globalEventBus.on(Events.letterModelEvents.selectFolder.fail, h2);
    });

    globalEventBus.on(Events.mainPageView.recivedUn, (howToSkip) => {
      globalEventBus.emit(Events.mainPageController.recivedUn, howToSkip);
      const h = (data, offset, isNeedToPag) => {
        globalEventBus.off(Events.letterModelEvents.recivedUn.success, h);
        if (offset === 0) {
          this.data.selectFolder = data;
        } else {
          this.data.selectFolder = this.data.selectFolder.concat(data);
        }
        this.data.offset = offset;
        this.data.offset += 5;
        this.data.typeOfContent = 'recivedUn';
        this.data.letter = {};
        this.data.folderColumn = false;
        this.data.letterColumn = true;
        this.data.oneLetterColumn = false;
        this.data.isNeedToPag = isNeedToPag;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.recivedUn.success, h);
    });

    globalEventBus.on(Events.mainPageView.sendedUn, (howToSkip) => {
      globalEventBus.emit(Events.mainPageController.sendedUn, howToSkip);
      const h = (data, offset, isNeedToPag) => {
        globalEventBus.off(Events.letterModelEvents.sendedUn.success, h);
        if (offset === 0) {
          this.data.selectFolder = data;
        } else {
          this.data.selectFolder = this.data.selectFolder.concat(data);
        }
        this.data.offset = offset;
        this.data.offset += 5;
        this.data.typeOfContent = 'sendedUn';
        this.data.letter = {};
        this.data.folderColumn = false;
        this.data.letterColumn = true;
        this.data.oneLetterColumn = false;
        this.data.isNeedToPag = isNeedToPag;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.sendedUn.success, h);
    });

    globalEventBus.on(Events.mainPageView.addFolderRecived, (nameOfFolder) => {
      globalEventBus.emit(Events.mainPageController.addFolderRecived, nameOfFolder);
      const h = () => {
        globalEventBus.off(Events.letterModelEvents.addFolderRecived.success, h);
        globalEventBus.emit(Events.mainPageView.recivedFolder);
      };
      globalEventBus.on(Events.letterModelEvents.addFolderRecived.success, h);
    });

    globalEventBus.on(Events.mainPageView.addFolderSended, (nameOfFolder) => {
      globalEventBus.emit(Events.mainPageController.addFolderSended, nameOfFolder);
      const h = () => {
        globalEventBus.off(Events.letterModelEvents.addFolderSended.success, h);
        globalEventBus.emit(Events.mainPageView.sendedFolder);
      };
      globalEventBus.on(Events.letterModelEvents.addFolderSended.success, h);
    });

    globalEventBus.on(Events.mainPageView.sendWrittenLetter, (id) => {
      globalEventBus.emit(Events.mainPageController.sendWrittenLetter, id);
      const h = (letterId) => {
        globalEventBus.off(Events.letterModelEvents.sendWrittenLetter.success, h);
        this.data.selectFolder.forEach((letter) => {
          if (letter.Id === +letterId.get('id')) {
            letter.IsWatched = true;
          }
        });
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.sendWrittenLetter.success, h);
    });

    globalEventBus.on(Events.mainPageView.inFolder, (data, folder) => {
      globalEventBus.emit(Events.mainPageController.inFolder, data, folder);
      const h = (method) => {
        globalEventBus.off(Events.letterModelEvents.inFolder.success, h);
        if (method === 'DELETE') {
          this.data.letter = {};
          this.data.selectFolder.forEach((letter) => {
            if (letter.Id === +data.get('letterId')) {
              const index = this.data.selectFolder.indexOf(letter);
              if (index > -1) {
                this.data.selectFolder.splice(index, 1);
              }
            }
          });
          this.mainPageView.render(this.data);
        } else {
          this.mainPageView.render(this.data);
        }
      };
      globalEventBus.on(Events.letterModelEvents.inFolder.success, h);
    });

    globalEventBus.on(Events.mainPageView.renameFolder, (newName) => {
      globalEventBus.emit(Events.mainPageController.renameFolder, newName);
      const h = () => {
        globalEventBus.off(Events.letterModelEvents.renameFolder.success, h);
        globalEventBus.emit(Events.mainPageView.recivedFolder);
      };
      globalEventBus.on(Events.letterModelEvents.renameFolder.success, h);
      globalEventBus.on(Events.letterModelEvents.renameFolder.fail, h);
    });

    globalEventBus.on(Events.mainPageView.deleteFolder, (deleteName) => {
      globalEventBus.emit(Events.mainPageController.deleteFolder, deleteName);
      const h = () => {
        globalEventBus.off(Events.letterModelEvents.deleteFolder.success, h);
        globalEventBus.emit(Events.mainPageView.recivedFolder);
      };
      globalEventBus.on(Events.letterModelEvents.deleteFolder.success, h);
      globalEventBus.on(Events.letterModelEvents.deleteFolder.fail, h);
    });

    globalEventBus.on(Events.mainPageView.deleteLetter, (deleteName) => {
      globalEventBus.emit(Events.mainPageController.deleteLetter, deleteName);
      const h = (deleteVar) => {
        globalEventBus.off(Events.letterModelEvents.deleteLetter.success, h);
        this.data.letter = {};
        this.data.selectFolder.forEach((letter) => {
          if (letter.Id === +deleteVar.get('id')) {
            const index = this.data.selectFolder.indexOf(letter);
            if (index > -1) {
              this.data.selectFolder.splice(index, 1);
            }
          }
        });
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.deleteLetter.success, h);
      globalEventBus.on(Events.letterModelEvents.deleteLetter.fail, h);
    });

    globalEventBus.on(Events.mainPageView.backToFolders, () => {
      this.data.folderColumn = true;
      this.data.letterColumn = false;
      this.data.oneLetterColumn = false;
      this.mainPageView.render(this.data);
    });

    globalEventBus.on(Events.mainPageView.backToLetters, () => {
      this.data.folderColumn = false;
      this.data.letterColumn = true;
      this.data.oneLetterColumn = false;
      this.mainPageView.render(this.data);
    });

    globalEventBus.on(Events.mainPageView.startSearch, (similar) => {
      globalEventBus.emit(Events.mainPageController.startSearch, similar);
      const h = (data, sim) => {
        globalEventBus.off(Events.letterModelEvents.startSearch.success, h);
        this.data.similar = sim;
        this.data.searchResult = data;
        this.mainPageView.render(this.data);
      };
      const h1 = () => {
        globalEventBus.off(Events.letterModelEvents.startSearch.fail, h1);
        this.data.similar = '';
        this.data.searchResult = {};
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.startSearch.success, h);
      globalEventBus.on(Events.letterModelEvents.startSearch.fail, h1);
    });

    globalEventBus.on(Events.mainPageView.resultSearch, (what, value, offset) => {
      globalEventBus.emit(Events.mainPageController.resultSearch, what, value, offset);
      const h = (data, skip, isNeedToPag) => {
        globalEventBus.off(Events.letterModelEvents.resultSearch.success, h);
        if (skip === 0) {
          this.data.selectFolder = data;
        } else {
          this.data.selectFolder = this.data.selectFolder.concat(data);
        }
        this.data.offset = skip;
        this.data.offset += 5;
        this.data.typeOfContent = 'search';
        this.data.letter = {};
        this.data.whatOfContent = what;
        this.data.nameOfFolder = value;
        this.data.folderColumn = false;
        this.data.letterColumn = true;
        this.data.oneLetterColumn = false;
        this.data.searchResult = false;
        this.data.isNeedToPag = isNeedToPag;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.resultSearch.success, h);
    });

    globalEventBus.on(Events.mainPageView.spamUn, (offset) => {
      globalEventBus.emit(Events.mainPageController.spamUn, offset);
      const h = (data, skip, isNeedToPag) => {
        globalEventBus.off(Events.letterModelEvents.spamUn.success, h);
        if (skip === 0) {
          this.data.selectFolder = data;
        } else {
          this.data.selectFolder = this.data.selectFolder.concat(data);
        }
        this.data.offset = skip;
        this.data.offset += 5;
        this.data.typeOfContent = 'spamUn';
        this.data.letter = {};
        this.data.folderColumn = false;
        this.data.letterColumn = true;
        this.data.oneLetterColumn = false;
        this.data.isNeedToPag = isNeedToPag;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.spamUn.success, h);
    });

    globalEventBus.on(Events.mainPageView.trashUn, (offset) => {
      globalEventBus.emit(Events.mainPageController.trashUn, offset);
      const h = (data, skip, isNeedToPag) => {
        globalEventBus.off(Events.letterModelEvents.trashUn.success, h);
        if (skip === 0) {
          this.data.selectFolder = data;
        } else {
          this.data.selectFolder = this.data.selectFolder.concat(data);
        }
        this.data.offset = skip;
        this.data.offset += 5;
        this.data.typeOfContent = 'trashUn';
        this.data.letter = {};
        this.data.folderColumn = false;
        this.data.letterColumn = true;
        this.data.oneLetterColumn = false;
        this.data.isNeedToPag = isNeedToPag;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.trashUn.success, h);
    });

    globalEventBus.on(Events.mainPageView.inSpam, (chooseFolderData) => {
      globalEventBus.emit(Events.mainPageController.inSpam, chooseFolderData);
      const h = () => {
        globalEventBus.off(Events.letterModelEvents.inSpam.success, h);
        this.data.letter = {};
        this.data.selectFolder.forEach((letter) => {
          if (letter.Id === +chooseFolderData.get('lid')) {
            const index = this.data.selectFolder.indexOf(letter);
            if (index > -1) {
              this.data.selectFolder.splice(index, 1);
            }
          }
        });
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.inSpam.success, h);
    });

    globalEventBus.on(Events.mainPageView.inBox, (chooseFolderData) => {
      globalEventBus.emit(Events.mainPageController.inBox, chooseFolderData);
      const h = () => {
        globalEventBus.off(Events.letterModelEvents.inBox.success, h);
        this.data.letter = {};
        this.data.selectFolder.forEach((letter) => {
          if (letter.Id === +chooseFolderData.get('lid')) {
            const index = this.data.selectFolder.indexOf(letter);
            if (index > -1) {
              this.data.selectFolder.splice(index, 1);
            }
          }
        });
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.inBox.success, h);
    });

    globalEventBus.on(Events.mainPageView.unWatched, (id) => {
      globalEventBus.emit(Events.mainPageController.unWatched, id);
      const h = () => {
        globalEventBus.off(Events.letterModelEvents.unWatched.success, h);
        this.data.letter.IsWatched = false;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.unWatched.success, h);
    });

    globalEventBus.on(Events.mainPageView.hideNotification, () => {
      this.data.notification = false;
      this.data.letter = this.data.notificationData;
      this.data.notificationData = {};
      this.mainPageView.render(this.data);
    });
  }

  setView(profileView) {
    this.mainPageView = profileView;
  }

  setModel(model) {
    this.model = model;
  }
}

export default new MainPageController();
