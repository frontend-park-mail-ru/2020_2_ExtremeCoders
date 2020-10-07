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

function send(method, url, data, callback) {

  let rawUrl='http://localhost:8080'+url;
  console.log("KEK:::::::::",JSON.stringify(data), rawUrl)
    if(method==='POST'){
        return fetch(rawUrl,
            {
                method: method,
                mode: 'cors',
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
    } else{
        return fetch(rawUrl,
            {
                method: method,
                mode: 'cors',
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json'
                },
            }
        )
    }
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

    user.name=form.imya.value.trim();
    user.surname=form.surname.value.trim();
    user.email=form.email.value.trim();
    user.date=form.date.value.trim();
    user.img=form.img.value.trim();
    user.password=form.password1.value.trim();
    let body_form=JSON.stringify(user);

    send(
        'POST',
        '/signup',
        {body_form},
        (status, response) => {
          console.log(body_form);
          if (status === 200) {
            profilePage();
          } else {
            const {error} = JSON.parse(response);
            alert(error);
          }
        }
    ).then(function (response) {
        return response.text()
    })
        .then(function (data) {
            console.log("DATA::::::::::::", data)
            profilePage()
        })
        .catch(function (error) {
            console.log('error', error)
        });

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

    send(
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

  let userData
  send('GET', '/profile', null, (status, responseText) => {
      userData=responseText
      console.log("SEND::::::::::", userData)
  }).then(function (response) {
      return response.text()
  })
      .then(function (data) {
          let person = JSON.parse(data);
          console.log("LOLEZ::::::::::::", data, person.Code)
          let isAuthorized = false;
          if (person.Code === 200) {
              console.log("HERE::::::::::::")
              isAuthorized = true;
          }
          if (person.Code === 401) {
              isAuthorized = false;
          }
          if (isAuthorized) {
              console.log("WTF::::::::::::")
              let form= createProfileForm(userData);
              application.appendChild(form)
              form.addEventListener('submit', () => {
                  console.log("HERE_TOO::::::::::::")
                  application.innerHTML = '';
                  application.appendChild(createProfileEditForm(userData));
              });
              return;
          }
          alert('Эта страница доступна только для авторизированных пользователей');
          loginPage();
          return data
      });
      // .catch(function (error) {
      //     console.log('error', error)
      // });
}

application.addEventListener('click', (evt) => {
  const {target} = evt;
  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    config[target.dataset.section].open();
  }
});

menuPage();