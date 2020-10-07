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
 * @param {string} data - profile data in JSON format
 */
function createProfileForm(data) {
  console.log("PROFILE_DATA:::::::", data)
  const profileInfo = JSON.parse(data);
  const form = document.createElement('form');
  const title = createText('h1', 'Профиль', 'profile_title');
  const name = createText('h1', `${profileInfo.firstName} ${profileInfo.lastName}`, 'profile_name');
  const login = createText('h2', `Ваш логин: ${profileInfo.login}`, 'profile_login');
  const birthDate = createText('h2', `Ваша дата рождения: ${profileInfo.birthDate}`, 'profile_birthDate');
  const avatar = createImage(profileInfo.imageSource, 50, 50);
  const edit = createButton('submit', 'Редактировать', 'editButton');
  const back=createHref('tmp-form_button', 'Назад', 'menu');
  form.appendChild(title);
  form.appendChild(name);
  form.appendChild(login);
  form.appendChild(birthDate);
  form.appendChild(avatar);
  form.appendChild(edit);
  form.appendChild(back);
  form.method='POST'
  return form;
}

/**
 * Creates form for profile editing and returns it as an object
 * @param {string} data - profile data in JSON format
 */
function createProfileEditForm(data) {
  const profileInfo = JSON.parse(data);
  const form = document.createElement('form');
  const title = createText('h1', 'Редактирование профиля', 'profile_title');
  const firstNameLabel = createText('h2', 'Имя: ', '');
  const firstName = createInput('text', `${profileInfo.firstName}`, 'profile_firstName');
  const lastNameLabel = createText('h2', 'Фамилия: ', '');
  const lastName = createInput('text', `${profileInfo.lastName}`, 'profile_lastName');
  const birthDateLabel = createText('h2', 'Ваша дата рождения: ', '');
  const birthDate = createInput('date', `${profileInfo.birthDate}`, 'profile_birthDate');
  const avatarLabel = createText('h2', 'Аватар:  ', '');
  const avatar = createImage(profileInfo.imageSource, 50, 50);
  const changeAvatarButton = createInput('file', 'Заменить', 'changeAvatarButton');
  const save = createButton('primary', 'Применить', 'saveButton');
  const back=createHref('tmp-form_button', 'Назад', 'profile');
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
  form.appendChild(back);
  return form;
}