import Router from "./Views/Router.js";
import SignInView from "./Views/SignInView.js";
import {Events, Paths} from "./Constants.js";
import SignUpView from "./Views/SignUpView.js";
import userModel from "./Models/UserModel.js";
import LetterModel from "./Models/LetterModel.js";
import SignInController from "./Controllers/SignInController.js";
import SignUpController from "./Controllers/SignUpController.js";
import ProfileView from "./Views/ProfileView.js";
import ProfileEditView from "./Views/ProfileEditView.js";
import ProfileEditController from "./Controllers/ProfileEditController.js";
import MainPageView from "./Views/MainPageView.js";
import {globalEventBus} from "./EventBus.js";
import MainPageController from "./Controllers/MainPageController.js";
import SendLetterView from "./Views/SendLetterView.js";
import Navbar from "./Views/NavbarView.js";

let router = new Router();
let signInView = new SignInView(document.body);
let signUpView = new SignUpView(document.body);
let profileView = new ProfileView(document.body);
let profileEditView = new ProfileEditView(document.body);
let mainPageView = new MainPageView(document.body);
let sendLetterView = new SendLetterView(document.body);


userModel.setUrl('http://localhost:8080');
let letterModel = new LetterModel('http://localhost:8080')

let signInController = new SignInController(signInView, userModel);
let signUpController = new SignUpController(signUpView,userModel);
let profileEditController = new ProfileEditController(profileEditView,userModel);
let mainPageController = new MainPageController(mainPageView);


router.register(Paths.signIn, signInView);
router.register(Paths.signUp, signUpView);
router.register(Paths.profile, profileView);
router.register(Paths.profileEdit, profileEditView);
router.register(Paths.letters, mainPageView);
router.register(Paths.sendLetter, sendLetterView);

// /sendLetter
console.log(location.pathname)
try {
    router.start(location.pathname);
}
catch (err){
    console.log("CAtch pATH", err)
    router.start(Paths.signIn)
}