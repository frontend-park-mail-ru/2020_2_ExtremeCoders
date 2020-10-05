class User {
  id = 0;
  name = "";
  surname = "";
  login = "";
  password = "";
  birthday = 0;
  imgPath = "";

  constructor(id, name, surname, login, password, birthday, imgPath) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.login = login;
    this.password = password;
    this.birthday = birthday;
    this.imgPath = imgPath;
  }
}

const dummyProfile = new User(0, 'John', 'Appleseed', 'johnappleseed', 'abcd1234', new Date('1995-12-17').getTime / 1000, 'https://picsum.photos/50');
application.innerHTML = '';
application.appendChild(createProfileForm(dummyProfile));

/**
 * Creates image with specified parameters and returns it as an object
 * @param {string} src - image source path
 * @param {number} width - image width
 * @param {number} height - image height
 */
function createImage(src, width, height) {
  const img = document.createElement('img');
  img.src = src;
  img.width = width;
  img.height = height;
  return img;
}

/**
 * Creates form with profile-related data and returns it as an objct
 * @param {User} user - user object
 */
function createProfileForm(user) {
  const form = document.createElement('form');
  const title = createText('h1', 'Профиль', 'profile_title');
  const name = createText('h1', `${user.name} ${user.surname}`, 'profile_name');
  const login = createText('h2', `Ваш логин: ${user.login}`, 'profile_login');
  const birthDate = createText('h2', `Ваша дата рождения: ${new Date(user.birthday * 1000)}`, 'profile_birthDate');
  const avatar = createImage(user.imgPath, 50, 50);
  const edit = createButton('primary', 'Редактировать', 'editButton');
  edit.addEventListener('click', () => {
    application.innerHTML = '';
    application.appendChild(createProfileEditForm(user));
  });
  form.appendChild(title);
  form.appendChild(name);
  form.appendChild(login);
  form.appendChild(birthDate);
  form.appendChild(avatar);
  form.appendChild(edit);
  return form;
}

/**
 * Creates form for profile editing and returns it as an object
 * @param {User} user - user object
 */
function createProfileEditForm(user) {
  const form = document.createElement('form');
  const title = createText('h1', 'Редактирование профиля', 'profile_title');
  const firstNameLabel = createText('h2', 'Имя: ', '');
  const firstName = createInput('text', `${user.name}`, 'profile_firstName');
  const lastNameLabel = createText('h2', 'Фамилия: ', '');
  const lastName = createInput('text', `${user.surname}`, 'profile_lastName');
  const birthDateLabel = createText('h2', 'Ваша дата рождения: ', '');
  const birthDate = createInput('date', `${new Date(user.birthday * 1000)}`, 'profile_birthDate');
  const avatarLabel = createText('h2', 'Аватар:  ', '');
  const avatar = createImage(user.imgPath, 50, 50);
  const changeAvatarButton = createInput('file', 'Заменить', 'changeAvatarButton');
  const save = createButton('primary', 'Применить', 'saveButton');
  form.appendChild(title);
  form.appendChild(firstNameLabel);
  form.appendChild(firstName);
  form.appendChild(lastNameLabel);
  form.appendChild(lastName);
  form.appendChild(birthDateLabel);
  form.appendChild(birthDate);
  form.appendChild(avatarLabel);
  form.appendChild(avatar);
  form.appendChild(changeAvatarButton);
  form.appendChild(save);
  return form;
}