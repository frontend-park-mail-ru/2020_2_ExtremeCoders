import {createButton, createHref, createInput, createText, createImage} from "./components.js";

export default class SignUpView {
    constructor(element) {
        this.element = element;
    }

    render() {
        this.element.innerHTML = '';
        const form = document.createElement('form');
        const title = createText('h1', 'Регистрация', 'signup_title', '');
        const imya = createInput('name', 'Введите имя', 'name', '');
        const surname = createInput('surname', 'Введите фамилию', 'surname', '');
        const email = createInput('email', 'Введите email', 'email', '');
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
            this.emit('submit', {target: 'SignUpView', data: new FormData(form)});
        })
        backButton.addEventListener('click', () => {
                this.emit('goBack');
            }
        )
    }
}