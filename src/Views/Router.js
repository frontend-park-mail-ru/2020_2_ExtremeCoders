import { Events } from '../Constants.js';
import globalEventBus from '../EventBus.js';

export default class Router {
  constructor() {
    this.registeredPathes = {};
    window.onpopstate = ((event) => {
      // event.preventDefault();
      // document.referrer = window.location.href;
      console.log('HISTORY EVENT', event);
      try {
        this.registeredPathes[event.state.path].render(event.state.data);
      } catch (err) {
        window.location = window.location.href;
      }
    });
    globalEventBus.on(Events.global.redirect, this.go.bind(this));
    // globalEventBus.on(Events.global.goBack, this.back.bind(this));
  }

  register(path, view) {
    this.registeredPathes[path] = view;
  }

  // запустить роутер
  start(path, data) {
    console.log('START PATH', path, 'PREV PAGE', document.referrer);
    window.history.pushState({ path, data: (data || 1) }, 'Start', path);
    this.registeredPathes[path].render(data);
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
   * Note that just calling history.pushState() or history.replaceState() 
   * won't trigger a popstate event. 
   * The popstate event will be triggered by doing 
   * a browser action such as a click on the back or forward button 
   * (or calling history.back() or history.forward() in JavaScript).
   */
  go(event) {
    console.log('GOOO', event);
    if (event) {
      this.registeredPathes[event.path].render(event.data || 0);
      // window.history.pushState({ path: event.path, data: (event.data || 0) },
      //   event.path, event.path);
      window.history.pushState({ path: event.path, data: (event.data || 0) },
        event.path, event.path);
      window.history.pushState({ path: event.path, data: (event.data || 0) },
        event.path, event.path);
      window.history.back();
    }
  }

  back() {
    console.log("I'L BE BACK");
    window.history.back();
    console.log('href', window.location.pathname);
    this.registeredPathes[window.location.pathname].render();
  }
}
