const Events = {
  global: {
    goBack: 'goBack',
    redirect: 'redirect',
    logout: 'logout',
  },
  signInViewEvents: {
    submit: 'SignIn-submit',
    errors: 'SignIn-errors',
  },
  signUpViewEvents: {
    submit: 'SignUp-submit',
    errors: 'SignUp-errors',
  },
  profileEditViewEvents: {
    submit: 'ProfileEdit-submit',
    errors: 'ProfileEdit-errors',
    needUserData: 'ProfileEditView-needUserData',
  },
  profileViewEvents: {
    needUserData: 'ProfileView-needUserData',
  },
  mainPageView: {
    needData: 'mainPageView-needData',

    recivedFolder: 'mainPageView-recivedFolder',
    sendedFolder: 'mainPageView-sendedFolder',

    selectFolder: 'mainPageView-selectFolder',

    selectLetter: 'mainPageView-selectLetter',
  },
  mainPageController: {
    needGetFolderList: 'mainPageController-needGetFolderList',
    needGetLetterList: 'mainPageController-needGetLetterList',
    needGetLetter: 'mainPageController-needGetLetter',

    recivedFolder: 'mainPageController-recivedFolder',
    sendedFolder: 'mainPageController-sendedFolder',

    selectFolder: 'mainPageController-selectFolder',

    selectLetter: 'mainPageController-selectLetter',
    //
    sendWrittenLetter: 'mainPageController-sendWrittenLetter',
    //
  },
  sendLetterView: {
    sendLetter: 'sendLetterView-sendLetter',
  },
  navbarView: {
    needData: 'navbar-needData',
  },

  letterModelEvents: {
    getLetter: {
      success: 'letterModelEvents-getLetter-success',
      fail: 'letterModelEvents-getLetter-fail',
    },
    getLetterList: {
      success: 'letterModelEvents-getLetterList-success',
      fail: 'letterModelEvents-getLetterList-fail',
    },
    getFolderList: {
      success: 'letterModelEvents-getFolderList-success',
      fail: 'letterModelEvents-getFolderList-fail',
    },
    sendLetter: {
      success: 'letterModelEvents-sendLetter-success',
      fail: 'letterModelEvents-sendLetter-fail',
    },

    //
    recivedFolder: {
      success: 'letterModelEvents-recivedFolder-success',
      fail: 'letterModelEvents-recivedFolder-fail',
    },
    sendedFolder: {
      success: 'letterModelEvents-sendedFolder-success',
      fail: 'letterModelEvents-sendedFolder-fail',
    },

    selectFolder: {
      success: 'letterModelEvents-selectFolder-success',
      fail: 'letterModelEvents-selectFolder-fail',
    }
  },

  userModelEvents: {
    signIn: {
      success: 'UserModel-authorizationSuccess',
      fail: 'UserModel-authorizationFail',
    },
    signUp: {
      success: 'UserModel-signupSuccess',
      fail: 'UserModel-signupFail',
    },
    profileEdit: {
      success: 'UserModel-profileEditSuccess',
      fail: 'UserModel-profileEditFail',
    },
    profileGetData: {
      success: 'profile-successGetData',
      fail: 'fail-getData',
    },
  },
};

const Paths = {
  baseUrl: 'http://localhost:8080',
  mainPage: '/letters',
  signInPage: '/signin',
  signUpPage: '/signup',
  profilePage: '/profile',
  profileEditPage: '/profileEdit',
  sendLetterPage: '/sendLetter',

  logout: '/logout',

  signInServ: '/session',
  logoutServ: '/session',
  signUpServ: '/user',
  editUserServ: '/user',
  sendMessageToServ: '/letter',
  getUserData: '/user',
  getAvatar: '/user/avatar',
  getReceivedLetters: '/user/letter/received',
  getSendedLetters: '/user/letter/sent',

  getRecivedFolder: '/user/folders/recived',
  getSendedFolder: '/user/folders/sended',

  getSelectFolder: '/user/foders',
};

// логин post /session
// логаут delete /session
// регистрация post /user
// редактирование профиля put/user
// получене аватарки get /user/avatar
// получение данных юзера get /user
// получение отправленных писем get /receivedLetters
// получение полученных писем get /sendedLetters
// отправка письма post /letter

export { Events, Paths };
