import { Paths, Events } from '../Constants.js';
import globalEventBus from '../EventBus.js';

class ProfileEditController {
  constructor(profileEditView, userModel) {
    this.view = profileEditView;
    this.model = userModel;
    globalEventBus.on(Events.userModelEvents.profileEdit.success, (user) => {
      globalEventBus.emit(Events.global.redirect, { path: Paths.profilePage, data: user });
    });
    globalEventBus.on(Events.profileEditViewEvents.needUserData, () => {
      this.view.render(this.model.user);
    });
  }

  setView(view) {
    this.view = view;
  }

  setModel(model) {
    this.model = model;
  }
}

export default new ProfileEditController();
