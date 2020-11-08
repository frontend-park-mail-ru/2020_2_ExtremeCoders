import {Paths, Events} from '../Constants.js';
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
            globalEventBus.emit(Events.mainPageController.needGetFolderList);
            globalEventBus.emit(Events.mainPageController.needGetLetterList);
            this.mainPageView.render(this.data);
        });

        globalEventBus.on(Events.mainPageView.selectLetter, (letterId) => {
            console.log('SELECT LETTER ', letterId, this.data.letterList);
            this.data.letter = this.data.letterList[letterId];
            this.mainPageView.render(this.data);
        });

        globalEventBus.on(Events.letterModelEvents.sendLetter.success, () => {
            globalEventBus.emit(Events.global.redirect, {path: Paths.letters});
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
