import {
  createText, createInput, createButton, createHref,
} from './components';

/**
 * implementation of signup form
 */
export default class Signup {
  /**
     * adding signup form to our page
     */
  render() {
    const application = document.getElementById('app');
    application.appendChild(this.createSignUpForm());
  }

  /**
     * Generation of signup form
     * @returns {HTMLFormElement}
     */
  static createSignUpForm() {
    const form = document.createElement('form');

    const title = createText('h1', 'Регистрация', 'signup_title', '');
    const imya = createInput('name', 'Введите имя', 'name', '');
    const surname = createInput('surname', 'Введите фамилию', 'surname', '');
    const email = createInput('email', 'Введите email', 'email', '');
    const password1 = createInput('password', 'Введите пароль', 'password1', '');
    const password2 = createInput('password', 'Повторите пароль', 'password2', '');
    const image = createInput('file', 'Выберете аватар', 'avatar', '');
    // const date = createInput('date', 'Введите свою дату рождения', 'date', "");

    const confirmButton = createButton('submit', 'Зарегистрироваться', 'confirmSignupButton');
    const backButton = createHref('tmp-form_button', 'Назад', 'menu');
    form.appendChild(title);
    form.appendChild(imya);
    form.appendChild(surname);
    form.appendChild(email);
    form.appendChild(password1);
    form.appendChild(password2);
    // form.appendChild(date);
    form.appendChild(image);
    form.appendChild(confirmButton);
    form.appendChild(backButton);
    form.method = 'POST';
    form.enctype = 'multipart/form-data';
    return form;
  }
}
