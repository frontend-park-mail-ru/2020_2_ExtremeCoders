import {Events, Paths} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";
import {template as tmp} from "./PugTemplates/ProfilePage.js"
import Navbar from "./NavbarView.js";

export default class ProfileView {
    constructor(element) {
        this.element = element;
        //globalEventBus.on(Events.userModelEvents.profileGetData.success, this.render.bind(this));
        //globalEventBus.on(Events.userModelEvents.profileGetData.fail, this.showErrors.bind(this));
    }

    /**
     * Creates form with profile.css-related data and returns it as an objct
     * @param {string} data - profile.css data in JSON format
     */
    render(data) {
        if (!data) {
            globalEventBus.emit(Events.profileViewEvents.needUserData);
            return;
        }

        this.element.innerHTM = '';
        Navbar.render();
        this.element.insertAdjacentHTML('beforeend', tmp(data));

        let edit = document.getElementsByName('editButton')[0];
        let backButton = document.getElementsByName('back')[0];

        edit.addEventListener('click', (event) => {
                event.preventDefault();
                globalEventBus.emit(Events.global.redirect, {path: Paths.profileEdit, data: data});
            }
        )
        backButton.addEventListener('click', (event) => {
                event.preventDefault();
                globalEventBus.emit(Events.global.goBack);
            }
        )
    }


    showErrors(errors) {
        console.log('SHow Errors', errors)
    }
}