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

function menuPage() {
  application.innerHTML = '';
  Object
      .keys(config)
      .map((menuKey) => {
        const {href, text} = config[menuKey];

        const menuItem = document.createElement('a');
        menuItem.href = href;
        menuItem.className='submit-form_button'
        menuItem.textContent = text;
        menuItem.dataset.section = menuKey;

        return menuItem;
      })
      .forEach((element) => {
        application.appendChild(element);
      })
  ;
}

function ajax(method, url, body = null, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    callback(xhr.status, xhr.responseText);
  });
  console.log("HUI:::::", body)
  if (body) {
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
    xhr.send(JSON.stringify(body));
    return;
  }
  xhr.send();
}

function signupPage() {
  application.innerHTML=''
  let hui=new Signup()
  let form=hui.createSignUpForm()

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (form.password1.value !== form.password2.value){
      alert('Пароли не совпадают');
      return;
    }
    // const email =
    // const password = passwordInput.value.trim();

    user.imya=form.imya.value.trim();
    user.surname=form.surname.value.trim();
    user.email=form.email.value.trim();
    user.date=form.date.value.trim();
    user.img=form.img.value.trim();
    user.password=form.password1.value.trim();
    let body_form=JSON.stringify(user);
    let a="qwerty";

    ajax(
        'POST',
        '/signup',
        {a},
        (status, response) => {
          console.log(body_form);
          if (status === 200) {
            profilePage();
          } else {
            const {error} = JSON.parse(response);
            alert(error);
          }
        }
    )

  });
  application.appendChild(form);
}

function loginPage() {
  application.innerHTML = '';
  let hui=new SignIn()
  let form=hui.createSignInForm()
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const email = form.email.value.trim();
    const password = form.password1.value.trim();

    ajax(
        'POST',
        '/signin',
        {email, password},
        (status, response) => {
          if (status === 200) {
            profilePage();
          } else {
            const {error} = JSON.parse(response);
            alert(error);
          }
        }
    )

  });
  application.appendChild(form);
}

function profilePage() {
  application.innerHTML = '';

  ajax('GET', '/profile', null, (status, responseText) => {
    let isAuthorized = false;
    if (status === 200) {
      isAuthorized = true;
    }
    if (status === 401) {
      isAuthorized = false;
    }
    if (isAuthorized) {
     let form= createProfileForm(responseText);
      application.appendChild(form)
      edit.addEventListener('click', () => {
        application.innerHTML = '';
        application.appendChild(createProfileEditForm(data));
      });
      return;
    }

    alert('Эта страница доступна только для авторизированных пользователей');
    loginPage();
  });
}

application.addEventListener('click', (evt) => {
  const {target} = evt;
  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    config[target.dataset.section].open();
  }
});

menuPage();