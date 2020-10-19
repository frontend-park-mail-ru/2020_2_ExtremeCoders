import {createButton, createHref, createInput, createText} from "./components.js";

export default class MenuView {
    constructor(element) {
        this.element = element;
    }

    render() {
        this.element.innerHTML = '';
        const signInPage = createButton('tmp-form_button', 'Войти', 'menu');
        const signUpPage = createHref('tmp-form_button', 'Зарегистрироваться', 'menu');
        const profilePage = createHref('tmp-form_button', 'Профиль', 'menu');
        this.element.appendChild(signInPage);
        this.element.appendChild(signUpPage);
        this.element.appendChild(profilePage);

        //кажется, тут не должно быть вообще обработчиков?

        signInPage.addEventListener('click', () => {
                this.emit('goToPath', {path:'/signin'});
            }
        );
        signUpPage.addEventListener('click', () => {
                this.emit('goToPath', {path:'/signup'});
            }
        );
        profilePage.addEventListener('click', () => {
                this.emit('goToPath', {path:'/profile'});
            }
        );
    }
}