import { Paths, Events } from '../Constants.js';
import globalEventBus from '../EventBus.js';

class SignUpController {
  constructor() {
    globalEventBus.on(Events.userModelEvents.signUp.success, (user) => {
      console.log('SIGNUP SUCCESS');
      globalEventBus.emit(Events.global.redirect, { path: Paths.mainPage, data: user });
    });
  }
}

export default new SignUpController();
