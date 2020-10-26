import {createButton, createHref, createInput, createText} from "./components.js";

import {Events,Pathes} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";
import {template as tmp } from "./PugTemplates/SignInForm.js" ;

export default class SignInView {

    constructor(element) {
        this.element = element;
        globalEventBus.on(Events.userModelEvents.signIn.fail, this.showErrors.bind(this));

    }

    render() {
        this.element.innerHTML = '';
        this.element.innerHTML = tmp();

        let form = document.getElementsByTagName('form')[0];
        let signUpButton = document.getElementsByName('signup')[0];
        let backButton = document.getElementsByName('back')[0];

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