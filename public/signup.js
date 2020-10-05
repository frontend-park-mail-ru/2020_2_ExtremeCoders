class Signup {
    constructor(props) {
    }

    render() {
        const application = document.getElementById('app')

        application.appendChild(this.createSignUpForm());

    }
    createInput(type, text, name) {

        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = text;
        return input;
    }

    createText(tag, text, name) {
        const someText = document.createElement(tag);
        someText.name = name;
        someText.textContent = text;
        return someText;
    }

    createButton(className, text, name) {
        const button = document.createElement('button');
        button.className = className;
        button.textContent = text;
        button.name = name;
        return button;
    }


    createSignUpForm() {
        const form = document.createElement('form');

        const title = this.createText('h1', 'Регистрация', 'signup_title');
        const login = this.createInput('login', 'Введите логин', 'login');
        const password1 = this.createInput('password', 'Введите пароль', 'password1');
        const password2 = this.createInput('password', 'Повторите пароль', 'password2');
        const image = this.createInput('file', 'Выберете аватар', 'imgGetter');
        const data = this.createInput('date', 'Введите свою дату рождения', 'dateGetter');

        const confirmButton = this.createButton('submit', 'Зарегистрироваться', 'confirmSignupButton');
        const backButton = this.createButton('cancel', 'Зарегистрироваться', 'confirmSignupButton');
        form.appendChild(title);
        form.appendChild(login);
        form.appendChild(password1);
        form.appendChild(password2);
        form.appendChild(data);
        form.appendChild(image);
        form.appendChild(confirmButton);
        form.appendChild(backButton)
        return form;
    }
}