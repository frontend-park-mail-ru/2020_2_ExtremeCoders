import './Views/public/css/font.css';
import './Views/public/css/color.css';
import './Views/public/css/spacing.css';
import './Views/public/css/grid.css';
import './Views/public/css/properties.css';
import './Views/public/css/blocks.css';
import './Views/public/css/components/input.css';
import './Views/public/css/components/title.css';
import './Views/public/css/components/scroll.css';
import './Views/public/css/components/button.css';
import './Views/public/css/components/triangle.css';
import './Views/public/css/components/header.css';
import './Views/public/css/components/search.css';
import './Views/public/css/base.css';
import './Views/public/css/wrapper.css';

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

userModel.setUrl(Paths.baseUrl);
const letterModel = new LetterModel(Paths.baseUrl);

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

function initModels() {
  userModel.getUserData();
  const h1 = () => {
    globalEventBus.off(Events.userModelEvents.profileGetData.success, h1);
    try {
      router.start(window.location.pathname);
    } catch (err) {
      router.start(Paths.signInPage);
    }
  };
  globalEventBus.on(Events.userModelEvents.profileGetData.success, h1);

  const h2 = () => {
    globalEventBus.off(Events.userModelEvents.profileGetData.fail, h2);
    router.start(Paths.signInPage);
  };
  globalEventBus.on(Events.userModelEvents.profileGetData.fail, h2);

}

initModels();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Успешная регистрация
      console.log('[SW] ServiceWorker registration successful! Scope:', registration.scope);
    }, function(err) {
      // При регистрации произошла ошибка
      console.log('[SW] Na ja! Das ist nicht arbeiten! No SW! :() ', err);
    });
  });
}
