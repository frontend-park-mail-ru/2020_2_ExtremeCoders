class Login {
  constructor(props) {
    //super(props);
  }

  createSignInForm() {
    let wrapper=document.createElement("div")
    // let wrapper = document.getElementsByTagName("div").item(0)

    let header = document.createElement("h1")
    wrapper.append(header)
    header.textContent = "Welcome!"


    let divForm = document.createElement("div")
    divForm.className = "login-form"
    wrapper.append(divForm)

    let form = document.createElement('form')
    divForm.append(form)

    let loginInput = document.createElement("input")
    form.append(loginInput)
    loginInput.className = "login-form_input"
    loginInput.type = "text"
    loginInput.placeholder = "Введите логин"

    let passwordInput = loginInput.cloneNode()
    form.append(passwordInput)
    passwordInput.type = "password"
    passwordInput.placeholder = "Введите пароль"

    let divButtonWrapper = document.createElement("div")
    form.append(divButtonWrapper)
    divButtonWrapper.className = "buttonsWrapper"

    let buttonSubmit = document.createElement("input")
    divButtonWrapper.append(buttonSubmit)
    buttonSubmit.type = "submit"
    buttonSubmit.value = "Sign In"
    buttonSubmit.className = "login-form_button"

    let buttonSignUp = document.createElement("a")
    divButtonWrapper.append(buttonSignUp)
    buttonSignUp.href = "index.html"
    buttonSignUp.className = "login-form_button"
    buttonSignUp.text = "Sign Up"

    return wrapper
  }
}





