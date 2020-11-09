import { Paths, Events } from '../Constants.js';
import globalEventBus from '../EventBus.js';

class SignInController {
  constructor() {
    globalEventBus.on(Events.userModelEvents.signIn.success, () => {
      globalEventBus.emit(Events.global.redirect, { path: Paths.letters });
    });
  }
}

export default new SignInController();
