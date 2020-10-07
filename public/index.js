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

/**
 * rendering mainPage on page
 */
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

/**
 * Send requests to go server
 * @param method of our request
 * @param url of our request
 * @param data of our request
 * @param callback of our request
 * @returns {Promise<Response>}
 */
function send(method, url, data, callback) {
    // 95.163.209.195
  let rawUrl='http://127.0.0.1:8080'+url;
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

/**
 * validation email
 * @param email
 * @returns {boolean}
 */
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * validation for inputs
 * @param data
 * @returns {boolean}
 */
function validateData(data) {
    var re = /[0-9a-z]+/i;
    return re.test(data);
}

/**
 * full implementation of signup page
 */
function signupPage() {
  application.innerHTML=''
  let hui=new Signup()
  let form=hui.createSignUpForm()

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!validateEmail(form.email.value.trim())){
        alert('Не корректный email адрес');
        return;
    }
    if(!validateData(form.imya.value.trim())){
        alert('Не корректное имя\n' +
            'Данные могу содержать: a-z, A-Z, 0-9');
        return;
    }
      if(!validateData(form.surname.value.trim())){
          alert('Не корректная фамилия\n' +
              'Данные могу содержать: a-z, A-Z, 0-9');
          return;
      }
      if(!validateData(form.password1.value.trim())){
          alert('Не корректный пароль\n' +
              'Данные могу содержать: a-z, A-Z, 0-9');
          return;
      }
    if (form.password1.value !== form.password2.value){
      alert('Пароли не совпадают');
      return;
    }
    // const email =
    // const password = passwordInput.value.trim();

    user.name=form.imya.value.trim();
    user.surname=form.surname.value.trim();
    user.email=form.email.value.trim();
    //user.date=form.date.value.trim();
    user.img=form.img.value.trim();
    user.password=form.password1.value.trim();


    send(
        'POST',
        '/signup',
        {
            Name:user.name,
            Surname: user.surname,
            Email:user.email,
            //Date:user.date,
            Img:user.img,
            Password:user.password
        },
        (status, response) => {
          console.log(user);
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

/**
 * full implementation of signin page
 */
function loginPage() {
  application.innerHTML = '';
  let hui=new SignIn()
  let form=hui.createSignInForm()
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

      if(!validateEmail(form.email.value.trim())){
          alert('Не корректный email\n' +
              'Данные могу содержать: a-z, A-Z, 0-9');
          return;
      }
      if(!validateData(form.password1.value.trim())){
          alert('Не корректный пароль\n' +
              'Данные могу содержать: a-z, A-Z, 0-9');
          return;
      }

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

/**
 * full implementation of profilePage
 */
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
          let isAuthorized = false;

          if (person.Code === 200) {
              isAuthorized = true;
          }
          if (person.Code === 401) {
              isAuthorized = false;
          }
          if (isAuthorized) {
              let form= createProfileForm(person.User);
              application.appendChild(form)
              form.addEventListener('submit', () => {
                    profilePageEdit(person.User);
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

function profilePageEdit(user){
    application.innerHTML = '';
    let form=createProfileEditForm(user)
    application.appendChild(form);

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        if(!validateData(form.profile_firstName.value.trim())){
            alert('Не корректное имя\n' +
                'Данные могу содержать: a-z, A-Z, 0-9');
            return;
        }
        if(!validateData(form.profile_lastName.value.trim())){
            alert('Не корректная фамилия\n' +
                'Данные могу содержать: a-z, A-Z, 0-9');
            return;
        }
        console.log("HEEEEEEEEREEEEEEE:::::::::::::::")
        let name=form.profile_firstName.value.trim();
        let surname=form.profile_lastName.value.trim();
            send(
                'POST',
                '/profile',
                {
                    Name:name,
                    Surname: surname,
                    //Date:form.profile_birthDate.value.trim(),
                    // Img:user.form.profile_birthDate.value.trim(),
                    // Password:user.password
                },
                (status, response) => {
                    console.log(user);
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
                }).catch(function (error) {
                console.log('error', error)
            });
    });
}




/**
 * adding eventlistener on click action
 */
application.addEventListener('click', (evt) => {
  const {target} = evt;
  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    config[target.dataset.section].open();
  }
});

menuPage();