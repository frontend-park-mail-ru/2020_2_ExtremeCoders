import {Paths, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class LetterModel {
    constructor(url) {
        this.baseUrl = url;
        this.Letters = [];
        globalEventBus.on(Events.mainPageController.needGetLetter, this.getLetter.bind(this));
        globalEventBus.on(Events.mainPageController.needGetLetterList, this.getLetterList.bind(this));
        globalEventBus.on(Events.mainPageController.needGetFolderList, this.getFolders.bind(this))
        globalEventBus.on(Events.sendLetterView.sendLetter, this.sendLetter.bind(this))
    }

    getLetter() {
        globalEventBus.emit(Events.letterModelEvents.getLetter.success, {
            id: 12, dateTime: 24, sender: 'sergiy', text:
                'HELLO WORLD', theme: 'JAVA SCRIPT'
        });
    }

    sendLetter(data) {
        console.log("letters", data.get('to'), data.get('theme'), data.get('text') )

        let promise = fetch(this.baseUrl + '/sendMessage',
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: data.data,
            })
        promise.then((response) => response.json())
            .then((response) => {
                console.log("RESP SEND LETTER", response.Code, response);
                if (response.Code === 200) {
                    console.log("SUCCES SEND LETTER")
                    globalEventBus.emit(Events.letterModelEvents.sendLetter.success, Paths.letters);
                    this.Letters += {}
                } else {
                    globalEventBus.emit(Events.letterModelEvents.sendLetter.fail, {
                        error: response.Description
                    });
                }
            })
            .catch((error) => {
                console.log("CAAAAAAAAAAAAAAAATCH", error)
            });
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