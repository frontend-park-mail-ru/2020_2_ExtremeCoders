import {Events, Paths} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";
import {template} from "./PugTemplates/SendLetterForm.js"
import Navbar from "./NavbarView.js";

export  default class SendLetterView{
    constructor(element) {
        this.element = element;
        globalEventBus.on(Events.letterModelEvents.sendLetter.fail, this.showErrors.bind(this))
    }

    render(data){
        data = data || {}
        console.log("SEND LETTER VIEW RENDER");
        this.element.innerHTML = '';
        Navbar.render()
        this.element.insertAdjacentHTML('beforeend', template(data))
        let form = document.getElementsByTagName('FORM')[0];
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            globalEventBus.emit(Events.sendLetterView.sendLetter,
                new FormData(form)
            );
        })
        let backButton = document.getElementsByName('back')[0];
        backButton.addEventListener('click', (event)=>{
            event.preventDefault();
            globalEventBus.emit(Events.global.goBack);
        })
    }

    showErrors(errors){
        console.log("SEND LETTER ERRORS SHOW", errors)
        let reciever = document.getElementsByName('to')[0];
        let theme = document.getElementsByName('theme')[0];
        let text = document.getElementsByName('text')[0];
        if(errors['to']){
            reciever.value = '';
            reciever.placeholder = errors['to']
        }
        if(errors['theme']){
            theme.value = '';
            theme.placeholder = errors['theme']
        }
        if(errors['text']){
            text.value = '';
            text.placeholder = errors['text']
        }


    }

}