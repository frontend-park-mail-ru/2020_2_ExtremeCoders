import {createButton, createHref, createInput, createText, createImage} from "./components.js";
import {Pathes, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";


export default class SignUpView {
    constructor(element) {
        this.element = element;
        globalEventBus.on(Events.userModelEvents.signUp.fail, this.showErrors.bind(this));
    }

    render() {
        this.element.innerHTML = '';
        const form = document.createElement('form');
        const title = createText('h1', 'Регистрация', 'signup_title', '');
        const imya = createInput('name', 'Введите имя', 'name', '');
        const surname = createInput('surname', 'Введите фамилию', 'surname', '');
        const email = createInput('text', 'Введите email', 'email', '');
        const password1 = createInput('password', 'Введите пароль', 'password1', '');
        const password2 = createInput('password', 'Повторите пароль', 'password2', '');
        const image = createInput('file', 'Выберете аватар', 'avatar', '');
        const confirmButton = createButton('submit', 'Зарегистрироваться', 'confirmSignupButton');
        const backButton = createButton('tmp-form_button', 'Назад', 'menu');
        form.appendChild(title);
        form.appendChild(imya);
        form.appendChild(surname);
        form.appendChild(email);
        form.appendChild(password1);
        form.appendChild(password2);
        form.appendChild(image);
        form.appendChild(confirmButton);
        form.appendChild(backButton);
        form.method = 'POST';
        form.enctype = 'multipart/form-data';
        this.element.appendChild(form);

        //кажется, тут не должно быть вообще обработчиков?
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