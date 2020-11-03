import {Paths, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class SignInController {
    constructor(signInView, userModel) {
        this.signInView = signInView;
        this.model = userModel;
        globalEventBus.on(Events.userModelEvents.signIn.success, (user)=>{
            globalEventBus.emit(Events.global.redirect, {path: Paths.letters})
        })
    }
}