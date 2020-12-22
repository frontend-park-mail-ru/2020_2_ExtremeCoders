import { Paths, Events } from '../Constants.js';
import globalEventBus from '../EventBus.js';
import validator from './Validator.js';
import myFetch from './myFetch.js';

class UserModel {
  constructor(url) {
    this.baseUrl = url;
    this.user = {};
    globalEventBus.on(Events.signInViewEvents.submit, this.signIn.bind(this));
    globalEventBus.on(Events.signUpViewEvents.submit, this.signUp.bind(this));
    globalEventBus.on(Events.profileEditViewEvents.submit, this.editUser.bind(this));
    globalEventBus.on(Events.profileViewEvents.needUserData, this.getUserData.bind(this));
    globalEventBus.on(Events.global.logout, this.logout.bind(this));
  }

  setUrl(url) {
    this.baseUrl = url;
  }

  signIn(data) {
    const errors = validator.checkSignInForm(data.data);
    if (Object.keys(errors).length !== 0) {
      globalEventBus.emit(Events.userModelEvents.signIn.fail,
        errors);
      return;
    }

    let shortLogin = data.data.get('email');
    shortLogin += '@mailer.ru.com';
    data.data.set('email', shortLogin);

    myFetch(Paths.signInServ, 'POST', data.data)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          const h = () => {
            globalEventBus.off(Events.userModelEvents.profileGetData.success, h);
            globalEventBus.emit(Events.userModelEvents.signIn.success);
          };
          globalEventBus.on(Events.userModelEvents.profileGetData.success, h);
          this.getUserData();
        } else if (response.Code === 401) {
          globalEventBus.emit(Events.userModelEvents.signIn.fail, {
            password: response.Description,
          });
        } else if (response.Code === 404) {
          globalEventBus.emit(Events.userModelEvents.signIn.fail, {
            email: response.Description,
          });
        } else {
          globalEventBus.emit(Events.userModelEvents.signIn.fail, {
            unknowError: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
      });
  }

  signUp(data) {
    const errors = validator.checkSignUpForm(data.data);
    if (Object.keys(errors).length !== 0) {
      globalEventBus.emit(Events.userModelEvents.signUp.fail,
        errors);
      return;
    }

    let shortEmail = data.data.get('email');
    shortEmail += '@mailer.ru.com';
    data.data.set('email', shortEmail);

    myFetch(Paths.signUpServ, 'POST', data.data)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          const h = () => {
            globalEventBus.off(Events.userModelEvents.profileGetData.success, h);
            globalEventBus.emit(Events.userModelEvents.signUp.success);
          };
          globalEventBus.on(Events.userModelEvents.profileGetData.success, h);
          this.getUserData();
        } else {
          globalEventBus.emit(Events.userModelEvents.signUp.fail, {
            email: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
      });
  }

  editUser(data) {
    const name = data.data.get('profile_firstName');
    if (name === '') {
      data.data.set('profile_firstName', data.tmpData.name);
    }
    const surname = data.data.get('profile_lastName');
    if (surname === '') {
      data.data.set('profile_lastName', data.tmpData.name);
    }
    const avatar = data.data.get('avatar');
    if (avatar.name === '') {
      data.data.delete('avatar');
    }
    myFetch(Paths.editUserServ, 'PUT', data.data)
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.getUserData(Events.userModelEvents.profileEdit);
          const h1 = () => {
            globalEventBus.off(Events.userModelEvents.profileGetData.success, h1);
            globalEventBus.emit(Events.userModelEvents.profileEdit.success);
          };
          globalEventBus.on(Events.userModelEvents.profileGetData.success, h1);
        } else {
          globalEventBus.emit(Events.userModelEvents.profileEdit.fail, {
            error: response.Description,
          });
        }
      })
      .catch((error) => {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
      });
  }

  getUserData() {
    const p1 = myFetch(Paths.getUserData, 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response.Code === 200) {
          this.user.name = response.User.Name;
          this.user.email = response.User.Email;
          this.user.surname = response.User.Surname;
          this.user.avatar = '';
        } else {
          throw new Error(response.Description);
        }
      });

    const p2 = myFetch(Paths.getAvatar, 'GET')
      .then((response) => response.blob())
      .then((myBlob) => {
        this.user.avatar = URL.createObjectURL(myBlob);
      });

    // function p2() {
    //   console.log('Мок аватарки');
    // }

    Promise.all([p1, p2]).then(
      () => {
        globalEventBus.emit(Events.userModelEvents.profileGetData.success, this.user);
      },
      (error) => {
        globalEventBus.emit(Events.userModelEvents.profileGetData.fail, {
          errors: error.message,
        });
      },
    );
  }

  logout() {
    globalEventBus.emit(Events.global.redirect, {
      path: Paths.signInPage,
    });
    this.user = {};
    myFetch(Paths.logoutServ, 'DELETE');
  }
}

export default new UserModel('https://mailer.ru.com:8080');
