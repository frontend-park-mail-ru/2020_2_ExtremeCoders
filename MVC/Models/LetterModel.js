import {Paths, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class LetterModel {
    constructor(url) {
        this.baseUrl = url;
        this.Letters = {};
        globalEventBus.on(Events.mainPageView.letter.needGetLetter, this.getLetter.bind(this));
        globalEventBus.on(Events.mainPageView.letterList.needGetLetterList, this.getLetterList.bind(this));
    }

    getLetter() {
        globalEventBus.emit(Events.letterModelEvents.getLetter.success, {text:'SUCCESSGETLETTER'});
    }

    sendLetter() {
    }

    getLetterList() {
        globalEventBus.emit(Events.letterModelEvents.getLetterList.success, {text:'SUCCESSGETLETTERLIST'});
    }

}