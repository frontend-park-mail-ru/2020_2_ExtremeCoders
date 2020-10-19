import {createButton, createHref, createInput, createText, createImage} from "./components.js";


export default class ProfileView {
    constructor(element) {
        this.element = element;
    }

    /**
     * Creates form with profile-related data and returns it as an objct
     * @param {string} data - profile data in JSON format
     */
    render(data) {
        this.element.innerHTML = '';
        const div = document.createElement('div');
        const title = createText('h1', 'Профиль', 'profile_title');
        const name = createText('h1', `${data.name} ${data.surname}`, 'profile_name');
        const login = createText('h2', `Ваш логин: ${data.email}`, 'profile_login');
        const avatar = createImage(data.img, 50, 50);
        avatar.id = 'avatar';
        const edit = createButton('submit', 'Редактировать', 'editButton');
        const backButton = createButton('tmp-form_button', 'Назад', 'menu');
        avatar.src = data.avatar;
        div.appendChild(title);
        div.appendChild(name);
        div.appendChild(login);
        div.appendChild(avatar);
        div.appendChild(edit);
        div.appendChild(backButton);
        this.element.appendChild(div);

        //кажется, тут не должно быть вообще обработчиков?
        edit.addEventListener('click', () => {
                this.emit('goToPath', '/profileEdit');
            }
        )
        backButton.addEventListener('click', () => {
                this.emit('goBack');
            }
        )
    }
}