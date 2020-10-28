import Router from './Views/Router.js';
import SignInView from './Views/SignInView.js';
import { globalEventBus } from './EventBus.js';
import { Events, Pathes } from './Constants.js';
import SignUpView from './Views/SignUpView.js';
import UserModel from './Models/UserModel.js';
import SignInController from './Controllers/SignInController.js';
import SignUpController from './Controllers/SignUpController.js';
import ProfileView from './Views/ProfileView.js';
import ProfileEditView from './Views/ProfileEditView.js';
import ProfileEditController from './Controllers/ProfileEditController.js';
import MenuView from './Views/MenuView.js';

const router = new Router();
const signInView = new SignInView(document.body);
const signUpView = new SignUpView(document.body);
const profileView = new ProfileView(document.body);
const profileEditView = new ProfileEditView(document.body);
const menuView = new MenuView(document.body);

const userModel = new UserModel('http://localhost:8080');
const signInController = new SignInController(signInView, userModel);
const signUpController = new SignUpController(signUpView, userModel);
const profileEditController = new ProfileEditController(profileEditView, userModel);

router.register(Pathes.signIn, signInView);
router.register(Pathes.signUp, signUpView);
router.register(Pathes.profile, profileView);
router.register(Pathes.profileEdit, profileEditView);
router.register(Pathes.menu, menuView);

router.start(Pathes.signIn);
