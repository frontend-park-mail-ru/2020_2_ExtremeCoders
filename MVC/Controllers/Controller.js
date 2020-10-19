import ProfileEditView from "../Views/ProfileEditView.js";
import ObservableMixin from "../ObsevableMixin.js";
import SignInView from "../Views/SignInView.js";
import Router from "../Views/Router.js";
import SignUpView from "../Views/SignUpView.js";
import ProfileView from "../Views/ProfileView.js";
import MenuView from "../Views/MenuView.js";
import UserModel from "../Models/UserModel.js";


Object.assign(ProfileEditView.prototype, ObservableMixin);
Object.assign(SignInView.prototype, ObservableMixin);
Object.assign(SignUpView.prototype, ObservableMixin);
Object.assign(ProfileView.prototype, ObservableMixin);
Object.assign(MenuView.prototype, ObservableMixin);
Object.assign(Router.prototype, ObservableMixin);
Object.assign(UserModel.prototype, ObservableMixin);

class Controller {
    constructor() {
        this.initRouterPathes();
    }

    initRouterPathes() {
        let profileEditView = new ProfileEditView(document.body);
        let signInView = new SignInView(document.body);
        let signUpView = new SignUpView(document.body);
        let profileView = new ProfileView(document.body);
        let menuView = new MenuView(document.body);

        let r = new Router();
        r.register('/signin', signInView);
        r.register('/menu', menuView);
        r.register('/signup', signUpView);
        r.register('/profile', profileView)
        r.register('/profileEdit', profileEditView);
        this.router = r;
    }

    start() {
        this.router.start('/menu');
        this.router.on('goToPath', (path, data) => {
            console.log('controller, go to path');
        })
    }
}

let um = new UserModel("http://localhost:8080/");
let controller = new Controller();
controller.start();

controller.router.registeredPathes['/signin'].on('submit', (event) => {
        um.signIn(event.data);
    })

controller.router.registeredPathes['/signup'].on('submit', (event) => {
        console.log("/SIGNUP")
        um.signUp(event.data);
    })

controller.router.registeredPathes['/menu'].on('goToPath', (event) => {
        console.log("/MENU ", event.path, event.data)
        if(event.path==='/profile'){
            um.getUserData('getData');
            um.on('getData',(data)=>{
                if(data.success===true){
                    controller.router.go('/profile', data.user);
                }
                else{
                    console.log("SIGNIN ERROR DESCRIPTION", data)
                }
            })
        }
        else controller.router.go(event.path,event.data)
    })

controller.router.registeredPathes['/profileEdit'].on('submit', (event) => {
        console.log("/profileEdit")
        um.editUser(event.data);
    })

um.on('signin',(data)=>{
    console.log('ON signin',data);
    if(data.success===true){
        controller.router.go('/profile', data.user);
    }
    else{
        console.log("SIGNIN ERROR DESCRIPTION", data)
    }
})

um.on('signup',(data)=>{
    console.log("ON Signup",data);
    if(data.success===true){
        controller.router.go('/profile', data.user);
    }
    else{
        console.log("SIGNUP ERROR DESCRIPTION", data)
    }
})

um.on('profileEdit',(data)=>{
    console.log("ON Signup",data);
    if(data.success===true){
        controller.router.go('/profile', data.user);
    }
    else{
        console.log("SIGNUP ERROR DESCRIPTION", data)
    }
})





