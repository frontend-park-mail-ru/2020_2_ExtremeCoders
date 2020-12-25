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
    recivedUn: 'mainPageView-recivedUn',
    sendedUn: 'mainPageView-sendedUn',
    addFolderRecived: 'mainPageView-addFolderRecived',
    addFolderSended: 'mainPageView-addFolderSended',
    sendWrittenLetter: 'mainPageView-sendWrittenLetter',
    inFolder: 'mainPageView-inFolder',
    renameFolder: 'mainPageView-renameFolder',
    deleteFolder: 'mainPageView-deleteFolder',
    deleteLetter: 'mainPageView-deleteLetter',
    backToFolders: 'mainPageView-backToFolders',
    backToLetters: 'mainPageView-backToLetters',
    startSearch: 'mainPageView-startSearch',
    resultSearch: 'mainPageView-resultSearch',
    spamUn: 'mainPageView-spamUn',
    trashUn: 'mainPageView-trashUn',
    inSpam: 'mainPageView-inSpam',
    inBox: 'mainPageView-inBox',
    unWatched: 'mainPageView-unWatched',
  },
  mainPageController: {
    needGetFolderList: 'mainPageController-needGetFolderList',
    needGetLetterList: 'mainPageController-needGetLetterList',
    needGetLetter: 'mainPageController-needGetLetter',
    recivedFolder: 'mainPageController-recivedFolder',
    sendedFolder: 'mainPageController-sendedFolder',
    selectFolder: 'mainPageController-selectFolder',
    selectLetter: 'mainPageController-selectLetter',
    recivedUn: 'mainPageController-recivedUn',
    sendedUn: 'mainPageController-sendedUn',
    addFolderRecived: 'mainPageController-addFolderRecived',
    addFolderSended: 'mainPageController-addFolderSended',
    sendWrittenLetter: 'mainPageController-sendWrittenLetter',
    inFolder: 'mainPageController-inFolder',
    renameFolder: 'mainPageController-renameFolder',
    deleteFolder: 'mainPageController-deleteFolder',
    deleteLetter: 'mainPageController-deleteLetter',
    backToFolders: 'mainPageController-backToFolders',
    backToLetters: 'mainPageController-backToLetters',
    startSearch: 'mainPageController-startSearch',
    resultSearch: 'mainPageController-resultSearch',
    spamUn: 'mainPageController-spamUn',
    trashUn: 'mainPageController-trashUn',
    inSpam: 'mainPageController-inSpam',
    inBox: 'mainPageController-inBox',
    unWatched: 'mainPageController-unWatched',
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
    },

    recivedUn: {
      success: 'letterModelEvents-recivedUn-success',
      fail: 'letterModelEvents-recivedUn-fail',
    },

    sendedUn: {
      success: 'letterModelEvents-sendedUn-success',
      fail: 'letterModelEvents-sendedUn-fail',
    },

    addFolderRecived: {
      success: 'letterModelEvents-addFolderRecived-success',
      fail: 'letterModelEvents-addFolderRecived-fail',
    },

    addFolderSended: {
      success: 'letterModelEvents-addFolderSended-success',
      fail: 'letterModelEvents-addFolderSended-fail',
    },

    sendWrittenLetter: {
      success: 'letterModelEvents-sendWrittenLetter-success',
      fail: 'letterModelEvents-sendWrittenLetter-fail',
    },

    inFolder: {
      success: 'letterModelEvents-inFolder-success',
      fail: 'letterModelEvents-inFolder-fail',
    },

    renameFolder: {
      success: 'letterModelEvents-renameFolder-success',
      fail: 'letterModelEvents-renameFolder-fail',
    },

    deleteFolder: {
      success: 'letterModelEvents-deleteFolder-success',
      fail: 'letterModelEvents-deleteFolder-fail',
    },

    deleteLetter: {
      success: 'letterModelEvents-deleteLetter-success',
      fail: 'letterModelEvents-deleteLetter-fail',
    },

    backToFolders: {
      success: 'letterModelEvents-backToFolders-success',
      fail: 'letterModelEvents-backToFolders-fail',
    },

    backToLetters: {
      success: 'letterModelEvents-backToLetters-success',
      fail: 'letterModelEvents-backToLetters-fail',
    },

    startSearch: {
      success: 'letterModelEvents-startSearch-success',
      fail: 'letterModelEvents-startSearch-fail',
    },

    resultSearch: {
      success: 'letterModelEvents-resultSearch-success',
      fail: 'letterModelEvents-resultSearch-fail',
    },

    spamUn: {
      success: 'letterModelEvents-spamUn-success',
      fail: 'letterModelEvents-spamUn-fail',
    },

    trashUn: {
      success: 'letterModelEvents-trashUn-success',
      fail: 'letterModelEvents-trashUn-fail',
    },

    inSpam: {
      success: 'letterModelEvents-inSpam-success',
      fail: 'letterModelEvents-inSpam-fail',
    },

    inBox: {
      success: 'letterModelEvents-inBox-success',
      fail: 'letterModelEvents-inBox-fail',
    },
    unWatched: {
      success: 'letterModelEvents-unWatched-success',
      fail: 'letterModelEvents-unWatched-fail',
    },
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
  // baseUrl: 'https://mailer.ru.com',
  baseUrl: 'http://localhost:8080',

  mainPage: '/letters',
  signInPage: '/signin',
  signUpPage: '/signup',
  profilePage: '/profile',
  profileEditPage: '/profileEdit',
  sendLetterPage: '/sendLetter',

  logout: '/logout',

  signInServ: '/api/session',
  logoutServ: '/api/session',
  signUpServ: '/api/user',
  editUserServ: '/api/user',
  sendMessageToServ: '/api/letter',
  getUserData: '/api/user',
  getAvatar: '/api/user/avatar',
  getReceivedLetters: '/api/user/letter/received/',
  getSendedLetters: '/api/user/letter/sent/',

  getRecivedFolder: '/api/user/folders/received',
  getSendedFolder: '/api/user/folders/sended',
  getSelectFolder: '/api/user/foders',
  addFolderRecived: '/api/user/folders/received/folderName',
  addFolderSended: '/api/user/folders/sended/folderName',
  sendWrittenLetter: '/api/watch/letter',
  inFolder: '/api/user/folders/',

  renameFolder: '/api/user/folders/received/folderName',
  deleteFolder: '/api/user/folders/received/folderName',
  deleteLetter: '/api/letter',
  startSearch: '/api/letter/',

  resultSearch: '/api/letter/by/',
};

const SW = {
    offlineMsg: 'У вас нет Интернета и Google Dino! :(',
    cacheName: 'ec-cache-v1'
}


// логин post /session
// логаут delete /session
// регистрация post /user
// редактирование профиля put/user
// получене аватарки get /user/avatar
// получение данных юзера get /user
// получение отправленных писем get /receivedLetters
// получение полученных писем get /sendedLetters
// отправка письма post /letter

export { Events, Paths, SW };
