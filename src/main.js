// import './Views/public/css/profile.css';
// import './Views/public/css/registration.css';
// import './Views/public/css/login.css';
// import './Views/public/css/components/navbar.css';
// import './Views/public/css/main.css';
// import './Views/public/css/components/input.css';
// import './Views/public/css/components/buttons.css';
// import './Views/public/css/components/label.css';
// import './Views/public/css/components/button-send.css';
// import './Views/public/css/components/letter-title.css';
// import './Views/public/css/main-page.css';
// import './Views/public/css/components/letter-view.css';
// import './Views/public/css/components/folder.css';
// import './Views/public/css/write-letter.css';
// import './Views/public/css/profile-edit.css';
import './Views/public/css/all_styles_v2.css';

import Router from './Views/Router.js';
import SignInView from './Views/SignInView.js';
import { Events, Paths } from './Constants.js';
import SignUpView from './Views/SignUpView.js';
import userModel from './Models/UserModel.js';
import LetterModel from './Models/LetterModel.js';
import ProfileView from './Views/ProfileView.js';
import ProfileEditView from './Views/ProfileEditView.js';
import profileEditController from './Controllers/ProfileEditController.js';
import MainPageView from './Views/MainPageView.js';
import globalEventBus from './EventBus.js';
import mainPageController from './Controllers/MainPageController.js';
import SendLetterView from './Views/SendLetterView.js';
import Navbar from './Views/NavbarView.js';
import navbarController from './Controllers/NavbarController.js';
import profileController from './Controllers/ProfileController.js';
import signInController from './Controllers/SignInController.js';
import signUpController from './Controllers/SignUpController.js';

const router = new Router();
const signInView = new SignInView(document.body);
const signUpView = new SignUpView(document.body);
const profileView = new ProfileView(document.body);
const profileEditView = new ProfileEditView(document.body);
const mainPageView = new MainPageView(document.body);
const sendLetterView = new SendLetterView(document.body);

userModel.setUrl('http://localhost:8000');
const letterModel = new LetterModel('http://localhost:8000');

mainPageController.setView(mainPageView);

navbarController.setNavbarView(Navbar);
navbarController.setUserModel(userModel);

profileEditController.setView(profileEditView);
profileEditController.setModel(userModel);

profileController.setView(profileView);
profileController.setModel(userModel);

router.register(Paths.signInPage, signInView);
router.register(Paths.signUpPage, signUpView);
router.register(Paths.profilePage, profileView);
router.register(Paths.profileEditPage, profileEditView);
router.register(Paths.mainPage, mainPageView);
router.register(Paths.sendLetterPage, sendLetterView);

console.log(window.location.pathname);
function initModels() {
  userModel.getUserData();
  const h1 = () => {
    console.log('h1');
    globalEventBus.off(Events.userModelEvents.profileGetData.success, h1);
    LetterModel.getFolders();
  };

  globalEventBus.on(Events.userModelEvents.profileGetData.success, h1);

  const h2 = () => {
    console.log('h2');
    globalEventBus.off(Events.letterModelEvents.getFolderList.success, h2);
    letterModel.getLetterList('Входящие');
  };

  globalEventBus.on(Events.letterModelEvents.getFolderList.success, h2);

  const h3 = () => {
    console.log('h3');
    globalEventBus.off(Events.letterModelEvents.getLetterList.success, h3);
    try {
      router.start(window.location.pathname);
    } catch (err) {
      console.log('CATCH PATH, err', err);
      router.start(Paths.signInPage);
    }
  };
  globalEventBus.on(Events.letterModelEvents.getLetterList.success, h3);

  const h4 = () => {
    globalEventBus.off(Events.userModelEvents.profileGetData.fail, h4);
    console.log('h4');
    router.start(Paths.signInPage);
  };
  globalEventBus.on(Events.userModelEvents.profileGetData.fail, h4);
}

initModels();
