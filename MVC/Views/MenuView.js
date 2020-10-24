import {createButton, createHref, createInput, createText} from "./components.js";
import {globalEventBus} from "../EventBus.js";
import {Events, Pathes} from "../Constants.js";
import {template as tmp} from "./PugTemplates/BaseComponents/Menu.js";

export default class MenuView {
    constructor(element) {
        this.element = element;
    }

    render() {
        this.element.innerHTML = tmp();
        // const signInPage = createButton('tmp-form_button', 'Войти', 'menu');
        // const signUpPage = createButton('tmp-form_button', 'Зарегистрироваться', 'menu');
        // const profilePage = createButton('tmp-form_button', 'Профиль', 'menu');
        // this.element.appendChild(signInPage);
        // this.element.appendChild(signUpPage);
        // this.element.appendChild(profilePage);

        //кажется, тут не должно быть вообще обработчиков?

        let signInButton = document.getElementsByName('signin')[0];
        let signUpButton = document.getElementsByName('signup')[0];
        let profileButton = document.getElementsByName('profile')[0];

        signInButton.addEventListener('click', (event) => {
                event.preventDefault();
                globalEventBus.emit(Events.global.redirect, {path: Pathes.signIn});
            }
        );
        signUpButton.addEventListener('click', (event) => {
                event.preventDefault();
                globalEventBus.emit(Events.global.redirect, {path: Pathes.signUp});
            }
        );
        profileButton.addEventListener('click', (event) => {
                event.preventDefault();
                globalEventBus.emit(Events.global.redirect, {path: Pathes.profile});
            }
        );
    }
}