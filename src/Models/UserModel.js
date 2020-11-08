import {Paths, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";
import validator from "./Validator.js";

class UserModel {
    //http://localhost:8080
    constructor(url) {
        this.baseUrl = url;
        this.user = {};
        globalEventBus.on(Events.signInViewEvents.submit, this.signIn.bind(this));
        globalEventBus.on(Events.signUpViewEvents.submit, this.signUp.bind(this));
        globalEventBus.on(Events.profileEditViewEvents.submit, this.editUser.bind(this));
        globalEventBus.on(Events.profileViewEvents.needUserData, this.getUserData.bind(this));
    }

    setUrl(url) {
        this.baseUrl = url;
    }

    signIn(data) {
        let errors = validator.checkSignInForm(data.data);
        if (Object.keys(errors).length !== 0) {
            console.log("ERRORS IN SIGN IN ", errors,);
            globalEventBus.emit(Events.userModelEvents.signIn.fail,
                errors
            )
            return;
        }
        console.log("SIGN IN ", data, this.baseUrl + Paths.signIn);
        let promise = fetch(this.baseUrl + Paths.signIn,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: data.data,
            })
        promise.then((response) => response.json())
            .then((response) => {
                // console.log("RESP SIGN IN", response);
                if (response.Code === 200) {
                    let h = ()=>{
                        globalEventBus.off(Events.userModelEvents.profileGetData.success, h);
                        globalEventBus.emit(Events.userModelEvents.signIn.success);
                    }
                    globalEventBus.on(Events.userModelEvents.profileGetData.success, h)
                    this.getUserData();
                } else {
                    if (response.Code === 401) {
                        globalEventBus.emit(Events.userModelEvents.signIn.fail, {
                            password: response.Description
                        })

                    } else if (response.Code === 404) {
                        globalEventBus.emit(Events.userModelEvents.signIn.fail, {
                            email: response.Description
                        });
                    } else {
                        globalEventBus.emit(Events.userModelEvents.signIn.fail, {
                            unknowError: response.Description
                        });
                    }
                }
            })
            .catch((error) => {
                console.log("CAAAAAAAAAAAAAAAATCH", error)
            });
    }

    signUp(data) {
        let errors = validator.checkSignUpForm(data.data)
        if (Object.keys(errors).length !== 0) {
            console.log("ERRORS IN SIGN UP ", errors);
            globalEventBus.emit(Events.userModelEvents.signUp.fail,
                errors
            )
            return;
        }
        let promise = fetch(this.baseUrl + Paths.signUp,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: data.data,
            })
        promise.then((response) => response.json())
            .then((response) => {
                console.log("RESP SIGN UP UP", response.Code, response);
                if (response.Code === 200) {
                    let h = ()=>{
                        globalEventBus.off(Events.userModelEvents.profileGetData.success, h)
                        globalEventBus.emit(Events.userModelEvents.signUp.success);
                    }
                    globalEventBus.on(Events.userModelEvents.profileGetData.success, h)
                    this.getUserData();
                } else {
                    globalEventBus.emit(Events.userModelEvents.signUp.fail, {
                        email: response.Description
                    });
                }
            })
            .catch((error) => {
                console.log("CAAAAAAAAAAAAAAAATCH", error)
            });
    }

    editUser(data) {
        let promise = fetch(this.baseUrl + Paths.profile,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: data.data,
            })
        promise.then((response) => response.json())
            .then((response) => {
                console.log("RESP SIGN UP UP", response.Code, response);
                if (response.Code === 200) {
                    this.getUserData(Events.userModelEvents.profileEdit);
                    let h1 = (event)=>{
                        globalEventBus.off(Events.userModelEvents.profileGetData.success, h1);
                        globalEventBus.emit(Events.userModelEvents.profileEdit.success);
                    }
                    globalEventBus.on(Events.userModelEvents.profileGetData.success, h1)
                } else {
                    globalEventBus.emit(Events.userModelEvents.profileEdit.fail, {
                        error: response.Description
                    });
                }
            })
            .catch((error) => {
                console.log("CAAAAAAAAAAAAAAAATCH", error)
            });
    }

    getUserData() {
        let promise1 = fetch(this.baseUrl + Paths.profile,
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

                    throw new Error(response.Description);
                }
            });

        let promise2 = fetch(this.baseUrl + '/getAvatar',
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
                globalEventBus.emit(Events.userModelEvents.profileGetData.success, this.user);
            },
            (error) => {
                globalEventBus.emit(Events.userModelEvents.profileGetData.fail, {
                    errors: error.message
                });
            })
    }

    logout() {
    }
}

let userModel = new UserModel('http://localhost:8080');
export default userModel;