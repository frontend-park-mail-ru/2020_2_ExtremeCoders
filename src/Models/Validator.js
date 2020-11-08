class Validator {
  /* eslint no-underscore-dangle: 0 */
  static _checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static _checkName(name) {
    const re = /[0-9a-z]+/i;
    return re.test(name);
  }

  static _checkSurname(surname) {
    const re = /[0-9a-z]+/i;
    return re.test(surname);
  }

  static _checkPassword(pass) {
    return pass.length > 3;
  }

  static _checkPasswordEqual(pass1, pass2) {
    return pass1 === pass2;
  }

  /**
     * check that data in signInFrom is valid
     * @param {FormData} formData
     * @return {errors} in format {email:'errorDescription', password: 'errorDescription'}
     */
  checkSignInForm(formData) {
    const errors = {};
    if (!Validator._checkEmail(formData.get('email'))) {
      errors.email = 'Некорректный email';
    }
    if (!Validator._checkPassword(formData.get('password'))) {
      errors.password = 'слишком короткий пароль';
    }
    return errors;
  }

  checkSignUpForm(formData) {
    console.log('VALIDATOR SIGN UP', formData.get('email'), formData.get('password1'), formData.get('password2'),
      formData.get('name'), formData.get('surname'));
    const errors = {};
    if (!Validator._checkEmail(formData.get('email'))) {
      errors.email = 'Некорректный email';
    }
    if (!Validator._checkPassword(formData.get('password1'))) {
      errors.password1 = 'слишком короткий пароль';
    } else if (!Validator._checkPasswordEqual(formData.get('password1'), formData.get('password2'))) {
      errors.password2 = 'Пароли не совпадают';
    }
    if (!Validator._checkName(formData.get('name'))) {
      errors.name = 'Некорректное имя';
    }

    if (!Validator._checkSurname(formData.get('surname'))) {
      errors.surname = 'Некорректная фамилия';
    }
    return errors;
  }

  checkLetterForm(formData) {
    console.log('VALIDATOR SEND LETTER', formData.get('to'), formData.get('theme'), formData.get('text'));
    const errors = {};
    if (!Validator._checkEmail(formData.get('to'))) {
      errors.to = 'Некорректный email получателя';
    }
    if (!Validator._checkName(formData.get('theme'))) {
      errors.theme = 'Не корректная тема сообщения';
    }
    if (!Validator._checkName(formData.get('text'))) {
      errors.text = 'Не корректная текст сообщения';
    }
    return errors;
  }
}

export default new Validator();
