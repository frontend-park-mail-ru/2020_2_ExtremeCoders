import SignInView from '../Views/SignInView.js'
import {Pathes, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class SignInController {
    constructor(signInView, userModel) {
        this.signInView = signInView;
        this.model = userModel;
        globalEventBus.on(Events.userModelEvents.signIn.success, (user)=>{
            console.log({path: Pathes.profile, data:user});
            globalEventBus.emit(Events.global.redirect, {path: Pathes.profile, data:user})
        })
    }
}