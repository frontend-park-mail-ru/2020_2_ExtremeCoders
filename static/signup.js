console.log("kek")

const application=document.getElementById('app')


application.appendChild(createSignUpForm());
function createInput(type, text, name){

    const input=document.createElement( 'input');
    input.type=type;
    input.name=name;
    input.placeholder=text;
    return input;
}

function createText(tag, text, name){
    const someText=document.createElement(tag);
    someText.name=name;
    someText.textContent=text;
    return someText;
}

function createButton(className, text, name){
    const button=document.createElement('button');
    button.className=className;
    button.textContent=text;
    button.name=name;
    return button;
}


function createSignUpForm(){
    const form =document.createElement('form');

    const title=createText('h1', 'Регистрация', 'signup_title');
    const login = createInput('login', 'Введите логин','login');
    const password1=createInput('password', 'Введите пароль', 'password1');
    const password2=createInput('password', 'Повторите пароль', 'password2');
    const image=createInput('file', 'Выберете аватар', 'imgGetter');
    const data=createInput('date', 'Введите свою дату рождения', 'dateGetter');

    const confirmButton=createButton('secondary', 'Зарегистрироваться','confirmSignupButton');

    form.appendChild(title);
    form.appendChild(login);
    form.appendChild(password1);
    form.appendChild(password2);
    form.appendChild(data);
    form.appendChild(image);
    form.appendChild(confirmButton);
  return form;
}