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

const serverUrl = 'http://localhost:8080'
//const serverUrl = 'http://95.163.209.195:8080'

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
 * @returns {Promise<Response>}
 */
function send(method, url, data) {
  let rawUrl=serverUrl+url;
  console.log("KEK:::::::::",JSON.stringify(data), rawUrl)
    if(method==='POST'){
        return fetch(rawUrl,
            {
                method: method,
                mode: 'cors',
                credentials: 'include',
                body: data
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
        JSON.stringify({
            Name:user.name,
            Surname: user.surname,
            Email:user.email,
            //Date:user.date,
            Img:user.img,
            Password:user.password
        })
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
        JSON.stringify({email, password})
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
  send('GET', '/profile', null)
      .then(function (response) {
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
      })
      .catch(function (error) {
          console.log('error', error)
      });


    send('GET', '/getAvatar', null)
        .then(function (response) {
            console.log("COOOOONTENT TYPE IMG", response.statusCode)
            return response.blob()
        })
        .then(function (myBlob) {
            let objectURL = URL.createObjectURL(myBlob);
            let  myImage = document.getElementById("avatar")
            myImage.src = objectURL;
        })
        .catch(function (error) {
            console.log('error', error)
        });
}

function profilePageEdit(user){
    application.innerHTML = '';
    let form = createProfileEditForm(user)
    application.appendChild(form);
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        let f =  new FormData(form)
        console.log("SEEEND AVATAAR::::",f)

       let promise =  fetch(
            serverUrl+'/profile',
            {
                method:'POST',
                mode: 'cors',
                credentials: 'include',
                body: f
            })

        promise.then(function (response) {
            console.log("sendimg ",user);
            if (response.status === 200) {
            } else {
                const {error} = JSON.parse(response);
                alert(error);
            }
            return response.text()
        })
            .then(function (data) {
                console.log("SEEEND AVATAAR DATA::::::::::::", data)
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