import {createButton, createHref, createInput, createText, createImage} from "./components.js";
import {Pathes, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";
import {template as tmp} from "./PugTemplates/BaseComponents/SignUpForm.js";

export default class SignUpView {
    constructor(element) {
        this.element = element;
        globalEventBus.on(Events.userModelEvents.signUp.fail, this.showErrors.bind(this));
    }

    render() {
        this.element.innerHTML = '';
        this.element.innerHTML = tmp();
        let form = document.getElementsByTagName('form')[0];
        let backButton = document.getElementsByName('back')[0];

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            globalEventBus.emit(Events.signUpViewEvents.submit, {target: 'SignUpView', data: new FormData(form)});
        })
        backButton.addEventListener('click', (event) => {
                event.preventDefault();
                globalEventBus.emit(Events.global.goBack);
            }
        )
    }

    showErrors(errors) {
        console.log("SIGN UP ERRORS SHOW", errors)
        let emailField = document.getElementsByName('email')[0];
        let passwordField1 = document.getElementsByName('password1')[0];
        let passwordField2 = document.getElementsByName('password2')[0];
        let nameField = document.getElementsByName('name')[0];
        let surnameField = document.getElementsByName('surname')[0];

        console.log(errors['password1'])
        if (errors['password1']) {
            passwordField1.value = '';
            passwordField1.placeholder = errors['password1'];
        }
        else if(errors['password2']) {
            passwordField2.value = '';
            passwordField2.placeholder = errors['password2'];
        }
        if (errors['email']) {
            emailField.value = '';
            emailField.placeholder = errors['email'];
        }
        if (errors['name']) {
            nameField.value = '';
            nameField.placeholder = errors['name'];
        }
        if (errors['surname']) {
            surnameField.value = '';
            surnameField.placeholder = errors['surname'];
        }
    }
}