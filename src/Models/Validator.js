class Validator {
    _checkEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    _checkName(name) {
        const re = /[0-9a-z]+/i;
        return re.test(name);
    }

    _checkSurname(surname) {
        const re = /[0-9a-z]+/i;
        return re.test(surname);
    }

    _checkPassword(pass) {
        return pass.length > 3;
    }

    _checkPasswordEqual(pass1, pass2) {
        return pass1 === pass2;
    }

    /**
     * check that data in signInFrom is valid
     * @param {FormData} formData
     * @return {errors} in format {email:'errorDescription', password: 'errorDescription'}
     */
    checkSignInForm(formData) {
        let errors = {}
        if(!this._checkEmail(formData.get('email'))){
            errors['email'] = 'Некорректный email';
        }
        if(!this._checkPassword(formData.get('password'))){
            errors['password'] = 'слишком короткий пароль';
        }
        return errors;
    }

    checkSignUpForm(formData) {
        console.log("VALIDATOR SIGN UP", formData.get('email'), formData.get('password1'), formData.get('password2'),
            formData.get('name'), formData.get('surname'));
        let errors = {}
        if(!this._checkEmail(formData.get('email'))){
            errors['email'] = 'Некорректный email';
        }
        if(!this._checkPassword(formData.get('password1'))){
            errors['password1'] = 'слишком короткий пароль';
        }
        else if (!this._checkPasswordEqual(formData.get('password1'), formData.get('password2'))){
            errors['password2'] = 'Пароли не совпадают';
        }
        if (!this._checkName(formData.get('name'))){
            errors['name'] = 'Некорректное имя';
        }

        if (!this._checkSurname(formData.get('surname'))){
            errors['surname'] = 'Некорректная фамилия';
        }
        return errors;
    }
}

let validator = new Validator();
export default validator