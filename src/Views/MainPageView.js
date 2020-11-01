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
        if(!data|| !data['letterList']|| !data['folderList']||!data['letter']){
            globalEventBus.emit(Events.mainPageView.needData);
            return;
        }
        this.element.innerHTML = '';
        Navbar.render(data.navbar)
        //Почему после Navbar.render не срабатывают обработчики кнопок navbar-send, navbar-profile, navbar-exit?
        this.element.innerHTML += template(data);
    }

}