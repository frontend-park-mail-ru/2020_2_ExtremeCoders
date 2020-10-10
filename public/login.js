/**
 * Implementation of signin
 */
class SignIn {
  constructor(props) {
  }

  render() {
    const application = document.getElementById('app');
    application.appendChild(this.createSignInForm());
  }

  createSignInForm() {
    const form = document.createElement('form');

    const title = createText('h1', 'Вход', 'signup_title');
    const email = createInput('email', 'Введите логин', 'email');
    const password1 = createInput('password', 'Введите пароль', 'password1');

    const confirmButton = createButton('submit', 'Войти', 'confirmSignupButton');
    const backButton = createHref('tmp-form_button', 'Регистрация', 'signup');
    form.appendChild(title);
    form.appendChild(email);
    form.appendChild(password1);
    form.appendChild(confirmButton);
    form.appendChild(backButton);
    form.method = 'POST';
    return form;
  }

  /**
   * adding signin form to our page
   */
  render() {
    const application = document.getElementById('app');
    application.appendChild(this.createSignInForm());
  }

  /**
   * Generation of signin form
   * @returns {HTMLFormElement}
   */
  createSignInForm() {
    const form = document.createElement('form');

    const title = createText('h1', 'Вход', 'signup_title');
    const email = createInput('email', 'Введите логин', 'email', '');
    const password1 = createInput('password', 'Введите пароль', 'password1', '');

    const confirmButton = createButton('submit', 'Войти', 'confirmSignupButton');
    const backButton = createHref('tmp-form_button', 'Регистрация', 'signup');
    form.appendChild(title);
    form.appendChild(email);
    form.appendChild(password1);
    form.appendChild(confirmButton);
    form.appendChild(backButton);
    form.method = 'POST';
    return form;
  }
}
