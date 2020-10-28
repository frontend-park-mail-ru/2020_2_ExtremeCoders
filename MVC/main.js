import Router from "./Views/Router.js";
import SignInView from "./Views/SignInView.js";
import {globalEventBus} from "./EventBus.js";
import {Events,Pathes} from "./Constants.js";
import SignUpView from "./Views/SignUpView.js";
import UserModel from "./Models/UserModel.js";
import SignInController from "./Controllers/SignInController.js";
import SignUpController from "./Controllers/SignUpController.js";
import ProfileView from "./Views/ProfileView.js";
import ProfileEditView from "./Views/ProfileEditView.js";
import ProfileEditController from "./Controllers/ProfileEditController.js";
import MenuView from "./Views/MenuView.js";

let router = new Router();
let signInView = new SignInView(document.body);
let signUpView = new SignUpView(document.body);
let profileView = new ProfileView(document.body);
let profileEditView = new ProfileEditView(document.body);
let menuView = new MenuView(document.body);

let userModel = new UserModel('http://localhost:8080');
let signInController = new SignInController(signInView, userModel);
let signUpController = new SignUpController(signUpView,userModel);
let profileEditController = new ProfileEditController(profileEditView,userModel);


router.register(Pathes.signIn, signInView);
router.register(Pathes.signUp, signUpView);
router.register(Pathes.profile, profileView);
router.register(Pathes.profileEdit, profileEditView);
router.register(Pathes.menu, menuView);

console.log(location.pathname)
try {
    router.start(location.pathname);
}
catch (err){
    console.log("CAtch pATH")
    router.start(Pathes.signIn)
}
