import Router from "./Views/Router.js";
import SignInView from "./Views/SignInView.js";
import {Events, Paths} from "./Constants.js";
import SignUpView from "./Views/SignUpView.js";
import UserModel from "./Models/UserModel.js";
import LetterModel from "./Models/LetterModel.js";
import SignInController from "./Controllers/SignInController.js";
import SignUpController from "./Controllers/SignUpController.js";
import ProfileView from "./Views/ProfileView.js";
import ProfileEditView from "./Views/ProfileEditView.js";
import ProfileEditController from "./Controllers/ProfileEditController.js";
import MenuView from "./Views/MenuView.js";
import MainPageView from "./Views/MainPageView.js";
import {globalEventBus} from "./EventBus.js";
import MainPageController from "./Controllers/MainPageController.js";


let router = new Router();
let signInView = new SignInView(document.body);
let signUpView = new SignUpView(document.body);
let profileView = new ProfileView(document.body);
let profileEditView = new ProfileEditView(document.body);
let menuView = new MenuView(document.body);
let mainPageView = new MainPageView(document.body);

let userModel = new UserModel('http://localhost:8080');
let letterModel = new LetterModel('http://localhost:8080')

let signInController = new SignInController(signInView, userModel);
let signUpController = new SignUpController(signUpView,userModel);
let profileEditController = new ProfileEditController(profileEditView,userModel);
let mainPageController = new MainPageController();


router.register(Paths.signIn, signInView);
router.register(Paths.signUp, signUpView);
router.register(Paths.profile, profileView);
router.register(Paths.profileEdit, profileEditView);
router.register(Paths.menu, menuView);
router.register(Paths.letters, mainPageView);

console.log(location.pathname)
try {
    router.start(location.pathname);
}
catch (err){
    console.log("CAtch pATH")
    router.start(Paths.signIn)
}

