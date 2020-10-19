import {createButton, createHref, createInput, createText, createImage} from "./components.js";

export default class ProfileEditView {
    constructor(element) {
        this.element = element;
    }

    /**
     * Creates form for profile editing and returns it as an object
     * @param {string} data - profile data in JSON format
     */
    render(data) {
        this.element.innerHTML = '';
        const form = document.createElement('form');
        const title = createText('h1', 'Редактирование профиля', 'profile_title');
        const firstNameLabel = createText('h2', 'Имя: ', '');
        const firstName = createInput('text', `${data.name}`, 'profile_firstName', `${data.name}`);
        const lastNameLabel = createText('h2', 'Фамилия: ', '');
        const lastName = createInput('text', `${data.surname}`, 'profile_lastName', `${data.surname}`);
        const birthDateLabel = createText('h2', 'Ваша дата рождения: ', '');
        const avatarLabel = createText('h2', 'Аватар:  ', '');
        const avatar = createImage(data.Img, 50, 50);
        avatar.id = 'avatar';
        avatar.src = data.avatar;
        const changeAvatarButton = createInput('file', 'Заменить', 'avatar');
        const save = createButton('button', 'Применить', 'saveButton');
        const backButton = createButton('tmp-form_button', 'Назад', 'back');
        form.appendChild(title);
        form.appendChild(firstNameLabel);
        form.appendChild(firstName);
        form.appendChild(lastNameLabel);
        form.appendChild(lastName);
        form.appendChild(birthDateLabel);
        form.appendChild(avatarLabel);
        form.appendChild(avatar);
        form.appendChild(changeAvatarButton);
        form.appendChild(save);
        form.appendChild(backButton);
        form.enctype = 'multipart/form-data';
        form.method = 'POST';
        this.element.appendChild(form);
        //кажется, тут не должно быть вообще обработчиков?
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.emit('submit', {target: 'ProfileEditView', data: new FormData(form)});
        })

        backButton.addEventListener('click', () => {
                this.emit('goBack');
            }
        )

    }

}