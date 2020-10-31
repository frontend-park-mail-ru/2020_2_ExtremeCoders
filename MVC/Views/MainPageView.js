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

    }

    render(data){
        this.element.innerHTML = '';
        this.element.appendChild(this.letterListDiv);
        this.element.appendChild(this.letterDiv);
        this.renderLetterListBlock(data.letterList);
        this.renderLetterBlock(data.letter);
        //this.renderFoldersBlock(data);
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