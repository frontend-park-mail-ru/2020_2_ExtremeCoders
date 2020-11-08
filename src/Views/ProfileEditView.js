import {createButton, createHref, createInput, createText, createImage} from "./components.js";
import {globalEventBus} from "../EventBus.js";
import {Events} from "../Constants.js";
import {template} from './PugTemplates/ProfileEditForm.js'
import Navbar from "./NavbarView.js";

export default class ProfileEditView {
  constructor(element) {
    this.element = element;
    globalEventBus.on(Events.userModelEvents.profileEdit.fail, this.showErrors.bind(this));
  }

  /**
   * Creates form for profile.css editing and returns it as an object
   * @param {string} data - profile.css data in JSON format
   */
  render(data) {
    if(!data){
      globalEventBus.emit(Events.profileEditViewEvents.needUserData);
      return;
    }
    this.element.innerHTML = '';
    Navbar.render()
    this.element.insertAdjacentHTML('beforeend', template(data))
    let form = document.getElementsByTagName('form')[0];
    let backButton = document.getElementsByName('back')[0];

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      globalEventBus.emit(Events.profileEditViewEvents.submit, {
        target: 'ProfileEditView',
        data: new FormData(form)
      });
    })

    backButton.addEventListener('click', (event) => {
          event.preventDefault();
          globalEventBus.emit(Events.global.goBack);
        }
    )
  }

  showErrors(errors){
    console.log("PROFILE EDIT Errors", errors)
  }

}