import {createButton, createHref, createInput, createText} from "./components.js";
import {globalEventBus} from "../EventBus.js";
import {Events, Pathes} from "../Constants.js";

export default class MenuView {
    constructor(element) {
        this.element = element;
    }

    render() {
        this.element.innerHTML = '';
        const signInPage = createButton('login-reg-button', 'Войти', 'menu');
        const signUpPage = createButton('login-reg-button', 'Зарегистрироваться', 'menu');
        const profilePage = createButton('login-reg-button', 'Профиль', 'menu');
        const elem=createHref("login-reg-a", "huita", null)
        const elem2=createInput("input", "login-reg-input", "HUI", "hui", "HUI");
        this.element.appendChild(signInPage);
        this.element.appendChild(signUpPage);
        this.element.appendChild(profilePage);
        this.element.appendChild(elem);
        this.element.appendChild(elem2);
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