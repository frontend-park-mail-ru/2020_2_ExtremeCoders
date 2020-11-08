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

const router = new Router();
const signInView = new SignInView(document.body);
const signUpView = new SignUpView(document.body);
const profileView = new ProfileView(document.body);
const profileEditView = new ProfileEditView(document.body);
const mainPageView = new MainPageView(document.body);
const sendLetterView = new SendLetterView(document.body);

userModel.setUrl('http://localhost:8080');
const letterModel = new LetterModel('http://localhost:8080');

mainPageController.setView(mainPageView);

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

console.log(window.location.pathname);
function initModels() {
  userModel.getUserData();
  const h1 = () => {
    console.log('h1');
    globalEventBus.off(Events.userModelEvents.profileGetData.success, h1);
    letterModel.getFolders();
  };

  globalEventBus.on(Events.userModelEvents.profileGetData.success, h1);

  const h2 = () => {
    console.log('h2');
    globalEventBus.off(Events.letterModelEvents.getFolderList.success, h2);
    letterModel.getLetterList();
  };

  globalEventBus.on(Events.letterModelEvents.getFolderList.success, h2);

  const h3 = () => {
    console.log('h3');
    globalEventBus.off(Events.letterModelEvents.getLetterList.success, h3);
    try {
      router.start(window.location.pathname);
    } catch (err) {
      console.log('CATCH PATH, err', err);
      router.start(Paths.signIn);
    }
  };
  globalEventBus.on(Events.letterModelEvents.getLetterList.success, h3);

  const h4 = () => {
    globalEventBus.off(Events.userModelEvents.profileGetData.fail, h4);
    console.log('h4');
    router.start(Paths.signIn);
  };
  globalEventBus.on(Events.userModelEvents.profileGetData.fail, h4);
}

initModels();
