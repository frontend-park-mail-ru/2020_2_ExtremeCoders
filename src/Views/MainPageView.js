import {globalEventBus} from "../EventBus.js";
import {Events} from "../Constants.js";
import {template} from "./PugTemplates/mainPage.js";
import Navbar from './NavbarView.js'
export default class MainPageView {
    constructor(element) {
        this.element = element;
    }

    render(data){
        console.log("RENDER MAIN PAGE DATA, dat", data)
        if(!data|| !data['letterList']|| !data['folderList']){
            globalEventBus.emit(Events.mainPageView.needData);
            return;
        }
        this.element.innerHTML = '';
        Navbar.render()
        this.element.insertAdjacentHTML('beforeend', template(data))
        let letterList = document.getElementsByClassName('letterList')[0];
        letterList.addEventListener('click', (event)=>{
            console.log("CLICK LETTER",event.target.tagName,  event.target,"DIV ID", event.target.parentNode.id)
            if(event.target.tagName === 'DIV'){
                return
            }
            globalEventBus.emit(Events.mainPageView.selectLetter, event.target.parentNode.id);
        })
    }

}