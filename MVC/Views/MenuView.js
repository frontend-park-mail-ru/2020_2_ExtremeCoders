import {createButton, createHref, createInput, createText} from "./components.js";
import {globalEventBus} from "../EventBus.js";
import {Events, Pathes} from "../Constants.js";

export default class MenuView {
    constructor(element) {
        this.element = element;
    }

    render() {
        this.element.innerHTML = '';
        const signInPage = createButton('tmp-form_button', 'Войти', 'menu');
        const signUpPage = createButton('tmp-form_button', 'Зарегистрироваться', 'menu');
        const profilePage = createButton('tmp-form_button', 'Профиль', 'menu');
        this.element.appendChild(signInPage);
        this.element.appendChild(signUpPage);
        this.element.appendChild(profilePage);

        //кажется, тут не должно быть вообще обработчиков?

        signInPage.addEventListener('click', (event) => {
                event.preventDefault();
                globalEventBus.emit(Events.global.redirect, {path:Pathes.signIn});
            }
        );
        signUpPage.addEventListener('click', (event) => {
            event.preventDefault();
            globalEventBus.emit(Events.global.redirect, {path:Pathes.signUp});
            }
        );
        profilePage.addEventListener('click', (event) => {
            event.preventDefault();
            globalEventBus.emit(Events.global.redirect, {path:Pathes.profile});
            }
        );
    }
}