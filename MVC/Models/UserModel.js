export default class UserModel {
    constructor(url) {
        this.baseUrl = url
        this.user = {}
    }

    signIn(data) {
        let promise = fetch(this.baseUrl + 'signin',
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: data,
            })
        promise.then((response) => response.json())
            .then((response) => {
                console.log("RESP SIGN IN", response);
                if (response.Code === 200) {
                    this.getUserData('signin');
                } else {
                    this.emit('signin', {
                        success: false, error: response.Description
                    });
                }
            });
    }

    signUp(data) {
        let promise = fetch(this.baseUrl + 'signup',
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: data,
            })
        promise.then((response) => response.json())
            .then((response) => {
                console.log("RESP SIGN UP UP", response.Code, response);
                if (response.Code === 200) {
                    this.getUserData('signup');
                } else {
                    this.emit('sinup', {
                        success: false, error: response.Description
                    });
                }
            });
    }


    editUser(data) {
        let promise = fetch(this.baseUrl + 'profile',
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: data,
            })
        promise.then((response) => response.json())
            .then((response) => {
                console.log("RESP SIGN UP UP", response.Code, response);
                if (response.Code === 200) {
                    this.getUserData('signup');
                } else {
                    this.emit('editUser', {
                        success: false, error: response.Description
                    });
                }
            });
    }

    getUserData(event) {
        let context = this;
        console.log("GET USER DATA", event)
        let promise1 = fetch(this.baseUrl + 'profile',
            {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            })
        let p1 = promise1.then((response) => response.json())
            .then((response) => {
                console.log("RESP GET USER DATA", response.status, response);
                if (response.Code === 200) {
                    this.user.name = response.User.Name;
                    this.user.email = response.User.Email;
                    this.user.surname = response.User.Surname;
                    this.user.avatar = "";
                } else {
                    this.emit(event, {
                        success: false, error: response.Description
                    })
                }
            });

        let promise2 = fetch(this.baseUrl + 'getAvatar',
            {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            })

        let p2 = promise2
            .then((response) => response.blob())
            .then((myBlob) => {
                console.log("BLOB", myBlob)
                this.user['avatar'] = URL.createObjectURL(myBlob);
            });

        Promise.all([p1, p2]).then(
            (result) => {
                console.log("УСПЕХ");
                console.log('USER', this.user);
                this.emit(event, {success: true, user: this.user});
            },

            (error) => {
                this.emit(event, {
                    success: false, error: error.message
                });
            })
    }

    logout() {
    }

    getLetterList() {

    }
}