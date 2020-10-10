/* eslint-disable no-use-before-define */
import { User } from './components';
import Signup from './signup';
import SignIn from './login';
import { createProfileForm, createProfileEditForm } from './profile';

const application = document.getElementById('app');

const config = {
  menu: {
    href: '/menu',
    text: 'Главная',
    open: menuPage,
  },
  signup: {
    href: '/signup',
    text: 'Зарегистрироваться',
    open: signupPage,
  },
  login: {
    href: '/signin',
    text: 'Авторизоваться',
    open: loginPage,
  },
  profile: {
    href: '/profile',
    text: 'Профиль',
    open: profilePage,
  },
};

const serverUrl = 'http://localhost:8080';
// const serverUrl = 'http://95.163.209.195:8080'

/**
 * rendering mainPage on page
 */
function menuPage() {
  application.innerHTML = '';
  Object
    .keys(config)
    .map((menuKey) => {
      const { href, text } = config[menuKey];

      const menuItem = document.createElement('a');
      menuItem.href = href;
      menuItem.className = 'submit-form_button';
      menuItem.textContent = text;
      menuItem.dataset.section = menuKey;

      return menuItem;
    })
    .forEach((element) => {
      application.appendChild(element);
    });
}

/**
 * Send requests to go server
 * @param method of our request
 * @param url of our request
 * @param data of our request
 * @returns {Promise<Response>}
 */
function send(method, url, data) {
  const rawUrl = serverUrl + url;
  if (method === 'POST') {
    return fetch(rawUrl,
      {
        method,
        mode: 'cors',
        credentials: 'include',
        body: data,
      });
  }
  return fetch(rawUrl,
    {
      method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
}

/**
 * validation email
 * @param email
 * @returns {boolean}
 */
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
 * validation for inputs
 * @param data
 * @returns {boolean}
 */
function validateData(data) {
  const re = /[0-9a-z]+/i;
  return re.test(data);
}

/**
 * full implementation of signin page
 */
function loginPage() {
  application.innerHTML = '';
  const signIn = new SignIn();
  const form = signIn.createSignInForm();
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!validateEmail(form.email.value.trim())) {
      form.email.className = 'inputInvalid';
      form.email.setCustomValidity('Не корректный email\n'
              + 'Данные могут содержать: a-z, A-Z, 0-9');
      return;
    }
    if (!validateData(form.password1.value.trim())) {
      form.password1.className = 'inputInvalid';
      form.password1.setCustomValidity('Не корректный пароль\n'
              + 'Данные могут содержать: a-z, A-Z, 0-9');
      return;
    }

    const email = form.email.value.trim();
    const password = form.password1.value.trim();

    send(
      'POST',
      '/signin',
      JSON.stringify({ email, password }),
    ).then((response) => response.text())
      .then(() => {
        profilePage();
      });
  });
  application.appendChild(form);
}

/**
 * full implementation of profilePage
 */
function profilePage() {
  application.innerHTML = '';

  send('GET', '/profile', null)
    .then((response) => response.text())
    .then((data) => {
      const person = JSON.parse(data);
      let isAuthorized = false;

      if (person.Code === 200) {
        isAuthorized = true;
      }
      if (person.Code === 401) {
        isAuthorized = false;
      }
      if (isAuthorized) {
        const form = createProfileForm(person.User);
        application.appendChild(form);
        form.addEventListener('submit', () => {
          profilePageEdit(person.User);
        });
        return;
      }
      loginPage();
    });

  send('GET', '/getAvatar', null)
    .then((response) => response.blob())
    .then((myBlob) => {
      const objectURL = URL.createObjectURL(myBlob);
      const myImage = document.getElementById('avatar');
      myImage.src = objectURL;
    });
}

/**
 * full implementation of signup page
 */
function signupPage() {
  application.innerHTML = '';
  const signup = new Signup();
  const form = signup.createSignUpForm();

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!validateEmail(form.email.value.trim())) {
      // TODO: Прописать поведение при некорректном email
      return;
    }
    if (!validateData(form.name.value.trim())) {
      form.name.className = 'inputInvalid';
      form.name.setCustomValidity('Некорректное имя\n'
        + 'Данные могут содержать: a-z, A-Z, 0-9');
      return;
    }

    if (!validateData(form.surname.value.trim())) {
      form.surname.className = 'inputInvalid';
      form.surname.setCustomValidity('Не корректная фамилия\n'
        + 'Данные могут содержать: a-z, A-Z, 0-9');
      return;
    }
    if (form.password1.value !== form.password2.value) {
      form.password2.className = 'inputInvalid';
      form.password2.setCustomValidity('Пароли не совпадают');
      form.password1.className = 'inputInvalid';
      form.password1.setCustomValidity('Пароли не совпадают');
      return;
    }
    if (!validateData(form.password1.value.trim())) {
      form.password2.className = 'inputInvalid';
      form.password2.setCustomValidity('Не корректный пароль\n'
        + 'Данные могут содержать: a-z, A-Z, 0-9');
      form.password1.className = 'inputInvalid';
      form.password1.setCustomValidity('Не корректный пароль\n'
        + 'Данные могут содержать: a-z, A-Z, 0-9');
      return;
    }
    const user = new User();
    user.name = form.name.value.trim();
    user.surname = form.surname.value.trim();
    user.email = form.email.value.trim();
    user.img = form.img.value.trim();
    user.password = form.password1.value.trim();

    const f = new FormData(form);
    const promise = fetch(
      `${serverUrl}/signup`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: f,
      },
    );
    // TODO: Реализовать проверку кода ответа и обработку исключений
    promise.then((response) => response.text())
      .then(() => {
        profilePage();
      });
  });
  application.appendChild(form);
}

function profilePageEdit(user) {
  application.innerHTML = '';
  const form = createProfileEditForm(user);
  application.appendChild(form);
  send('GET', '/getAvatar', null)
    .then((response) => response.blob())
    .then((myBlob) => {
      const objectURL = URL.createObjectURL(myBlob);
      const myImage = document.getElementById('avatar');
      myImage.src = objectURL;
    });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!validateData(form.profile_firstName.value.trim())) {
      form.profile_firstName.className = 'inputInvalid';
      form.profile_firstName.setCustomValidity('Не корректное имя\n'
        + 'Данные могут содержать: a-z, A-Z, 0-9');
      return;
    }
    if (!validateData(form.profile_lastName.value.trim())) {
      form.profile_lastName.className = 'inputInvalid';
      form.profile_lastName.setCustomValidity('Не корректная фамилия\n'
        + 'Данные могут содержать: a-z, A-Z, 0-9');
      return;
    }

    const f = new FormData(form);

    const promise = fetch(
      `${serverUrl}/profile`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: f,
      },
    );

    promise.then((response) => response.text())
      .then(() => {
        profilePage();
      });
  });
}

/**
 * adding eventlistener on click action
 */
application.addEventListener('click', (evt) => {
  const { target } = evt;
  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    config[target.dataset.section].open();
  }
});

menuPage();
