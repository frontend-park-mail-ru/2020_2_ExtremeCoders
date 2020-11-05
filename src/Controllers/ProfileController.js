import {Paths, Events} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";
import userModel from "../Models/UserModel.js";

class ProfileController{
    constructor() {
        globalEventBus.on(Events.profileViewEvents.needUserData, ()=>{
            this.profileView.render(this.model.user);
        })
    }
    setView(profileView){
        this.profileView = profileView;
    }
    setModel(model){
        this.model = model;
    }
}

let profileController = new ProfileController();
export default profileController;