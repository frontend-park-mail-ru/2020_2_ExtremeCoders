import {createButton, createHref, createInput, createText, createImage} from "./components.js";
import {Events, Pathes} from "../Constants.js";
import {globalEventBus} from "../EventBus.js";

export default class ProfileView {
    constructor(element) {
        this.element = element;
        globalEventBus.on(Events.userModelEvents.profileGetData.success, this.renderData.bind(this));
        globalEventBus.on(Events.userModelEvents.profileGetData.fail, this.showErrors.bind(this));
    }

    /**
     * Creates form with profile-related data and returns it as an objct
     * @param {string} data - profile data in JSON format
     */
    render(data) {
        if(!data){
            globalEventBus.emit(Events.profileViewEvents.needUserData);
        }
        this.element.innerHTML = '';
        const div = document.createElement('div');
        const title = createText('h1', 'Профиль', 'profile_title');
        const name = createText('h1', `${data.name} ${data.surname}`, 'profile_name');
        const login = createText('h2', `Ваш логин: ${data.email}`, 'profile_login');
        const avatar = createImage(data.avatar, 50, 50);
        avatar.id = 'avatar';
        const edit = createButton('submit', 'Редактировать', 'editButton');
        const backButton = createButton('tmp-form_button', 'Назад', 'menu');
        div.appendChild(title);
        div.appendChild(name);
        div.appendChild(login);
        div.appendChild(avatar);
        div.appendChild(edit);
        div.appendChild(backButton);
        this.element.appendChild(div);

        edit.addEventListener('click', (event) => {
                event.preventDefault();
                globalEventBus.emit(Events.global.redirect, {path: Pathes.profileEdit, data: data});
            }
        )
        backButton.addEventListener('click', (event) => {
                event.preventDefault();
                globalEventBus.emit(Events.global.goBack);
            }
        )
    }

    renderData(data){
        console.log('REnder data', data);
        this.render(data);
    }

    showErrors(errors){
        console.log('SHow Errors', errors)
    }
}