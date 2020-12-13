import { Paths, Events } from '../Constants.js';
import globalEventBus from '../EventBus.js';

class MainPageController {
  constructor(MainPageView) {
    this.mainPageView = MainPageView;
    this.data = {};
    globalEventBus.on(Events.letterModelEvents.getLetter.success, (data) => {
      this.data.letter = data;
    });

    globalEventBus.on(Events.letterModelEvents.getLetterList.success, (data) => {
      this.data.letterList = data;
    });

    globalEventBus.on(Events.letterModelEvents.getFolderList.success, (data) => {
      this.data.folderList = data;
    });

    globalEventBus.on(Events.mainPageView.needData, () => {
      this.data.letter = {};
      const h1 = (data) => {
        this.data.selectFolder = data;
        this.mainPageView.render(this.data);
        globalEventBus.off(Events.letterModelEvents.getLetterList.success, h1);
      };
      globalEventBus.emit(Events.mainPageController.needGetFolderList);
      globalEventBus.emit(Events.mainPageController.needGetLetterList, 'Входящие');
      globalEventBus.on(Events.letterModelEvents.getLetterList.success, h1);
    });

    globalEventBus.on(Events.mainPageView.selectLetter, (letterId) => {
      this.data.letter = this.data.selectFolder[letterId];
      this.data.buttonPlus = true;
      this.mainPageView.render(this.data);
    });

    globalEventBus.on(Events.letterModelEvents.sendLetter.success, () => {
      globalEventBus.emit(Events.global.redirect, { path: Paths.mainPage });
    });

    // globalEventBus.on(Events.mainPageView.selectFolder, (folder) => {
    //   console.log('SELECT LETTER ', folder, this.data.letterList);
    //   globalEventBus.emit(Events.mainPageController.needGetLetterList, folder);
    //   const h = (data) => {
    //     console.log('SELECTED LETTER');
    //     globalEventBus.off(Events.letterModelEvents.getLetterList.success, h);
    //     this.data.letterList = data;
    //     this.mainPageView.render(this.data);
    //   };
    //   globalEventBus.on(Events.letterModelEvents.getLetterList.success, h);
    // });

    globalEventBus.on(Events.mainPageView.recivedFolder, () => {
      globalEventBus.emit(Events.mainPageController.recivedFolder);
      const h = (data) => {
        globalEventBus.off(Events.letterModelEvents.recivedFolder.success, h);
        this.data.recivedFolder = data;
        this.data.recivedFolderRecived = true;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.recivedFolder.success, h);
    });

    globalEventBus.on(Events.mainPageView.sendedFolder, () => {
      globalEventBus.emit(Events.mainPageController.sendedFolder);
      const h = (data) => {
        globalEventBus.off(Events.letterModelEvents.sendedFolder.success, h);
        this.data.sendedFolder = data;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.sendedFolder.success, h);
    });

    globalEventBus.on(Events.mainPageView.selectFolder, (folder, type) => {
      globalEventBus.emit(Events.mainPageController.selectFolder, folder, type);
      const h = (data) => {
        globalEventBus.off(Events.letterModelEvents.selectFolder.success, h);
        this.data.selectFolder = data;
        this.mainPageView.render(this.data);
      };
      const h2 = () => {
        globalEventBus.off(Events.letterModelEvents.selectFolder.fail, h2);
        this.data.selectFolder = new Map();
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.selectFolder.success, h);
      globalEventBus.on(Events.letterModelEvents.selectFolder.fail, h2);
    });

    globalEventBus.on(Events.mainPageView.recivedUn, () => {
      globalEventBus.emit(Events.mainPageController.recivedUn);
      const h = (data) => {
        globalEventBus.off(Events.letterModelEvents.recivedUn.success, h);
        this.data.selectFolder = data;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.recivedUn.success, h);
    });

    globalEventBus.on(Events.mainPageView.sendedUn, () => {
      globalEventBus.emit(Events.mainPageController.sendedUn);
      const h = (data) => {
        globalEventBus.off(Events.letterModelEvents.sendedUn.success, h);
        this.data.selectFolder = data;
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
      const h = (data) => {
        globalEventBus.off(Events.letterModelEvents.sendWrittenLetter.success, h);
        this.data.selectFolder = data;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.sendWrittenLetter.success, h);
    });

    globalEventBus.on(Events.mainPageView.inFolder, (method, folder, type) => {
      globalEventBus.emit(Events.mainPageController.inFolder, method, folder, type);
      const h = () => {
        globalEventBus.off(Events.letterModelEvents.inFolder.success, h);
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
  }



  setView(profileView) {
    this.mainPageView = profileView;
  }

  setModel(model) {
    this.model = model;
  }
}

export default new MainPageController();
