import globalEventBus from '../EventBus.js';
import { Events } from '../Constants.js';

class NavbarController {
  constructor() {
    globalEventBus.on(Events.navbarView.needData, () => {
      this.navbarView.render({ avatar: this.userModel.user.avatar });
    });
  }

  setNavbarView(navbarView) {
    this.navbarView = navbarView;
  }

  setUserModel(userModel) {
    this.userModel = userModel;
  }
}

export default new NavbarController();
