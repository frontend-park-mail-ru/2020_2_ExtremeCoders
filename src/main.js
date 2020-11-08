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
import profileEditController from "./Controllers/ProfileEditController.js";
import MainPageView from "./Views/MainPageView.js";
import {globalEventBus} from "./EventBus.js";
import MainPageController from "./Controllers/MainPageController.js";
import SendLetterView from "./Views/SendLetterView.js";
import Navbar from "./Views/NavbarView.js";
import navbarController from "./Controllers/NavbarController.js";
import profileController from "./Controllers/ProfileController.js";

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
let mainPageController = new MainPageController(mainPageView);
navbarController.setNavbarView(Navbar);
navbarController.setUserModel(userModel);

profileEditController.setView(profileEditView);
profileEditController.setModel(userModel);

profileController.setView(profileView);
profileController.setModel(userModel);


router.register(Paths.signIn, signInView);
router.register(Paths.signUp, signUpView);
router.register(Paths.profile, profileView);
router.register(Paths.profileEdit, profileEditView);
router.register(Paths.letters, mainPageView);
router.register(Paths.sendLetter, sendLetterView);

// /sendLetter
console.log(location.pathname)

function initModels(){
    userModel.getUserData();
    let h1 = ()=>{
        console.log('h1');
        globalEventBus.off(Events.userModelEvents.profileGetData.success, h1);
        letterModel.getFolders();
    };

    globalEventBus.on(Events.userModelEvents.profileGetData.success, h1);

    let h2 = ()=>{
        console.log('h2')
        globalEventBus.off(Events.letterModelEvents.getFolderList.success, h2)
        letterModel.getLetterList();
    }

    globalEventBus.on(Events.letterModelEvents.getFolderList.success, h2)

    let h3 = ()=>{
        console.log('h3')
        globalEventBus.off(Events.letterModelEvents.getLetterList.success, h3)
        try {
            router.start(location.pathname);
        }
        catch (err){
            console.log("CATCH PATH, err", err)
            router.start(Paths.signIn)
        }
    }
    globalEventBus.on(Events.letterModelEvents.getLetterList.success, h3)

    let h4 = ()=>{
        globalEventBus.off(Events.userModelEvents.profileGetData.fail, h4);
        console.log('h4')
        router.start(Paths.signIn)
        // globalEventBus.off(Events.userModelEvents.profileGetData.fail, h4)
    }
    globalEventBus.on(Events.userModelEvents.profileGetData.fail, h4)
}

initModels();