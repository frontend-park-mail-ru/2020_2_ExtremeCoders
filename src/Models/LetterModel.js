import {Paths, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class LetterModel {
    constructor(url) {
        this.baseUrl = url;
        this.Letters = {};
        globalEventBus.on(Events.mainPageController.needGetLetter, this.getLetter.bind(this));
        globalEventBus.on(Events.mainPageController.needGetLetterList, this.getLetterList.bind(this));
        globalEventBus.on(Events.mainPageController.needGetFolderList, this.getFolders.bind(this))
    }

    getLetter() {
        globalEventBus.emit(Events.letterModelEvents.getLetter.success, {
            id: 12, dateTime: 24, sender: 'sergiy', text:
                'HELLO WORLD', theme: 'JAVA SCRIPT'
        });
    }

    sendLetter() {
    }

    getFolders() {
        globalEventBus.emit(Events.letterModelEvents.getFolderList.success, ['Входящие','Отправленные']);
    }

    getLetterList() {
        globalEventBus.emit(Events.letterModelEvents.getLetterList.success, [{
            id: 12, dateTime: 24, sender: 'sergiy', text:
                'HELLO WORLD', theme: 'JAVA SCRIPT'
        }]);
    }

}