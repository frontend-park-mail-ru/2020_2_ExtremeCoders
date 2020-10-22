import {createButton, createHref, createInput, createText} from "./components.js";
import {globalEventBus} from "../EventBus.js";
import {Events, Pathes} from "../Constants.js";

export default class MenuView {
    constructor(element) {
        this.element = element;
    }

    render() {
        this.element.innerHTML = '';
        const signInPage = createButton('button-content-container', 'Войти', 'menu');
        const signUpPage = createButton('button-content-container', 'Зарегистрироваться', 'menu');
        const profilePage = createButton('button-content-container', 'Профиль', 'menu');
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