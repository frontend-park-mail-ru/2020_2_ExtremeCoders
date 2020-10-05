class Signup {
    constructor(props) {
    }

    render() {
        const application = document.getElementById('app')
        application.appendChild(this.createSignUpForm());
    }

    createSignUpForm() {
        const form = document.createElement('form');

        const title = createText('h1', 'Регистрация', 'signup_title');
        const login = createInput('email', 'Введите логин', 'login');
        const password1 = createInput('password', 'Введите пароль', 'password1');
        const password2 = createInput('password', 'Повторите пароль', 'password2');
        const image = createInput('file', 'Выберете аватар', 'imgGetter');
        const data = createInput('date', 'Введите свою дату рождения', 'dateGetter');

        const confirmButton = createButton('submit', 'Зарегистрироваться', 'confirmSignupButton');
        const backButton = createHref('tmp-form_button', 'Назад', 'menu');
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