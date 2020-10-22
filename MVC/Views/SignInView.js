import {createButton, createHref, createInput, createText} from "./components.js";

import {Events,Pathes} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";


export default class SignInView {

    constructor(element) {
        this.element = element;
        globalEventBus.on(Events.userModelEvents.signIn.fail, this.showErrors.bind(this));

    }

    render() {
        this.element.innerHTML = '';
        const form = document.createElement('form');
        const title = createText('h1', 'Вход', 'signup_title');
        const email = createInput('text', 'Введите логин', 'email', '');
        const password1 = createInput('password', 'Введите пароль', 'password', '');
        const confirmButton = createButton('submit', 'Войти', 'confirmSignupButton');
        const signUpButton = createButton('tmp-form_button', 'Регистрация', 'signup');
        const backButton = createButton('tmp-form_button', 'Назад', 'back');

        form.appendChild(title);
        form.appendChild(email);
        form.appendChild(password1);
        form.appendChild(confirmButton);
        form.appendChild(signUpButton);
        form.appendChild(backButton);

        form.method = 'POST';
        this.element.appendChild(form);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let formData = new FormData(form);
            globalEventBus.emit(Events.signInViewEvents.submit, {target: 'SignInView', data: formData});
        })

        backButton.addEventListener('click', (event) => {
            event.preventDefault();
            globalEventBus.emit(Events.global.goBack);
            }
        )

        signUpButton.addEventListener('click', (event) => {
            event.preventDefault();
            globalEventBus.emit(Events.global.redirect, {path: Pathes.signUp});
        })
    }

    showErrors(errors){
        console.log("SIGN IN ERRORS SHOW", errors.errors)
        let passwordField = document.getElementsByName('password')[0]
        let emailField = document.getElementsByName('email')[0]
        console.log(errors['password'])
        if(errors['password']){
            passwordField.value = '';
            passwordField.placeholder = errors['password']
        }
        if(errors['email']){
            emailField.value = '';
            emailField.placeholder = errors['email']
        }
    }
}