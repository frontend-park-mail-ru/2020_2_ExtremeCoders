import ProfileEditView from "../Views/ProfileEditView.js";
import {EventBus, c} from "../EventBus.js";
import SignInView from "../Views/SignInView.js";
import Router from "../Views/Router.js";
import SignUpView from "../Views/SignUpView.js";
import ProfileView from "../Views/ProfileView.js";
import MenuView from "../Views/MenuView.js";
import UserModel from "../Models/UserModel.js";


Object.assign(ProfileEditView.prototype, EventBus);
Object.assign(SignInView.prototype, EventBus);
Object.assign(SignUpView.prototype, EventBus);
Object.assign(ProfileView.prototype, EventBus);
Object.assign(MenuView.prototype, EventBus);
Object.assign(Router.prototype, EventBus);
Object.assign(UserModel.prototype, EventBus);

