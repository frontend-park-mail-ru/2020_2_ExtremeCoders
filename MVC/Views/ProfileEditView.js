import {createButton, createHref, createInput, createText, createImage} from "./components.js";
import {globalEventBus} from "../EventBus.js";
import {Events} from "../Constants.js";
import {template as tmp} from  './PugTemplates/BaseComponents/ProfileEditForm.js'

export default class ProfileEditView {
    constructor(element) {
        this.element = element;
        globalEventBus.on(Events.userModelEvents.profileEdit.fail, this.showErrors.bind(this));
    }

    /**
     * Creates form for profile editing and returns it as an object
     * @param {string} data - profile data in JSON format
     */
    render(data) {
        this.element.innerHTML = tmp(data);
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