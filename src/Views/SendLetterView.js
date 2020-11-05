import {Events, Paths} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";
import {template} from "./PugTemplates/SendLetterForm.js"
import Navbar from "./NavbarView.js";

export  default class SendLetterView{
    constructor(element) {
        this.element = element;
    }

    render(data){
        data = data || {}
        console.log("SEND LETTER VIEW RENDER");
        this.element.innerHTML = '';
        Navbar.render(data.navbar)
        this.element.insertAdjacentHTML('beforeend', template(data))
        let form = document.getElementsByName('sendLetterForm')[0];
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            globalEventBus.emit(Events.sendLetterView.sendLetter,
                new FormData(form)
            );
        })
    }

}