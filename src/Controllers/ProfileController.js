import { Events } from '../Constants.js';
import globalEventBus from '../EventBus.js';

class ProfileController {
  constructor() {
    globalEventBus.on(Events.profileViewEvents.needUserData, () => {
      console.log('5555555',this.model.user);
      this.profileView.render(this.model.user);
    });
  }

  setView(profileView) {
    this.profileView = profileView;
  }

  setModel(model) {
    this.model = model;
  }
}

export default new ProfileController();
