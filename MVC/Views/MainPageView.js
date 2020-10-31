import {globalEventBus} from "../EventBus.js";
import {Events} from "../Constants.js";

export default class MainPageView {
    constructor(element) {
        this.element = element;
        this.foldersDiv = document.createElement('div');
        this.letterListDiv = document.createElement('div');
        this.letterDiv = document.createElement('div');

        this.foldersDiv.className = 'folders';
        this.letterListDiv.className = 'letterList';
        this.letterDiv.className = 'letter';

        globalEventBus.on(Events.letterModelEvents.getLetter.success, this.renderLetterBlock.bind(this));
        globalEventBus.on(Events.letterModelEvents.getLetterList.success, this.renderLetterListBlock.bind(this));
    }

    render(data){
        this.element.innerHTML = '';
        this.element.appendChild(this.letterListDiv);
        this.element.appendChild(this.letterDiv);
        this.renderLetterBlock(data);
        this.renderLetterListBlock(data);
        this.renderFoldersBlock(data);
    }

    renderFoldersBlock(data) {

    }

    renderLetterListBlock(data) {
        console.log('renderLetterListBlock',data)
        if(!data){
            globalEventBus.emit(Events.mainPageView.letterList.needGetLetterList);
            return;
        }
        this.letterListDiv.innerHTML = data.text;
    }

    renderLetterBlock(data) {
        console.log('renderLetterBlock',data)
        if(!data){
            globalEventBus.emit(Events.mainPageView.letter.needGetLetter);
            return;
        }
        this.letterDiv.innerHTML = data.text;
    }

}