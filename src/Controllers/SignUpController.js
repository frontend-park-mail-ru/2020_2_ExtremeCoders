import { Paths, Events } from '../Constants.js';
import globalEventBus from '../EventBus.js';

class SignUpController {
  constructor() {
    globalEventBus.on(Events.userModelEvents.signUp.success, (user) => {
      console.log({ path: Paths.profile, data: user });
      globalEventBus.emit(Events.global.redirect, { path: Paths.letters, data: user });
    });
  }
}

export default new SignUpController();
