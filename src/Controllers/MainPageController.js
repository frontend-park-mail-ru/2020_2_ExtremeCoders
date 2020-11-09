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
        this.data.letterList = data;
        this.mainPageView.render(this.data);
        globalEventBus.off(Events.letterModelEvents.getLetterList.success, h1);
      };
      globalEventBus.emit(Events.mainPageController.needGetFolderList);
      globalEventBus.emit(Events.mainPageController.needGetLetterList, 'Входящие');
      globalEventBus.on(Events.letterModelEvents.getLetterList.success, h1);
    });

    globalEventBus.on(Events.mainPageView.selectLetter, (letterId) => {
      console.log('SELECT LETTER ', letterId, this.data.letterList);
      this.data.letter = this.data.letterList[letterId];
      this.mainPageView.render(this.data);
    });

    globalEventBus.on(Events.letterModelEvents.sendLetter.success, () => {
      globalEventBus.emit(Events.global.redirect, { path: Paths.letters });
    });

    globalEventBus.on(Events.mainPageView.selectFolder, (folder) => {
      console.log('SELECT LETTER ', folder, this.data.letterList);
      globalEventBus.emit(Events.mainPageController.needGetLetterList, folder);
      const h = (data) => {
        console.log('SELECTED LETTER');
        globalEventBus.off(Events.letterModelEvents.getLetterList.success, h);
        this.data.letterList = data;
        this.mainPageView.render(this.data);
      };
      globalEventBus.on(Events.letterModelEvents.getLetterList.success, h);
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
