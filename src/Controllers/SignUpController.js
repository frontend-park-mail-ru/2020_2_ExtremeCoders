import {Paths, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class SignUpController {
    constructor(signUpView, userModel) {
        this.signInView = signUpView;
        this.model = userModel;
        globalEventBus.on(Events.userModelEvents.signUp.success, (user)=>{
            console.log({path: Paths.profile, data:user});
            globalEventBus.emit(Events.global.redirect, {path: Paths.letters, data:user})
        })
    }
}