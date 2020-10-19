import {createButton, createHref, createInput, createText} from "./components.js";

export default class SignInView {
    constructor(element) {
        this.element = element;
    }

    render() {
        this.element.innerHTML = '';
        const form = document.createElement('form');
        const title = createText('h1', 'Вход', 'signup_title');
        const email = createInput('email', 'Введите логин', 'email', '');
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
        //кажется, тут не должно быть вообще обработчиков?
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let formData = new FormData(form);
            //console.log('FORMDATA', formData.get('email'));
            this.emit('submit', {target: 'SignInView', data: formData});
        })

        backButton.addEventListener('click', () => {
                this.emit('goBack');
            }
        )

        signUpButton.addEventListener('click', () => {
            this.emit('goToPath', {path:'/signup'});
        })
    }
}