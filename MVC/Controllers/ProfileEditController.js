import {Pathes, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class ProfileEditController{
    constructor(profileEditView, userModel) {
        this.view = profileEditView;
        this.model = userModel;
        globalEventBus.on(Events.userModelEvents.profileEdit.success, (user)=>{
            console.log({path: Pathes.profile, data:user});
            globalEventBus.emit(Events.global.redirect, {path: Pathes.profile, data:user})
        })
    }
}