const Events = {
    global: {
        goBack: 'goBack',
        redirect: 'redirect'
    },
    signInViewEvents: {
        submit: 'SignIn-submit',
        errors: 'SignIn-errors'
    },
    signUpViewEvents: {
        submit: 'SignUp-submit',
        errors: 'SignUp-errors'
    },
    profileEditViewEvents: {
        submit: 'ProfileEdit-submit',
        errors: 'ProfileEdit-errors'
    },
    profileViewEvents: {
        needUserData: 'ProfileView-needUserData',
    },
    mainPageView: {
        folders: {},
        letterList: {
            needGetLetterList: 'mainPageView-needGetLetterList'
        },
        letter: {
            needGetLetter: 'mainPageView-getLetter'
        },
    },

    letterModelEvents: {
        getLetter: {
            success: 'letterModelEvents-getLetter-success',
            fail: 'letterModelEvents-getLetter-fail'
        },
        getLetterList: {
            success: 'letterModelEvents-getLetterList-success',
            fail: 'letterModelEvents-getLetterList-fail'
        }
    },

    userModelEvents: {
        signIn: {
            success: 'UserModel-authorizationSuccess',
            fail: 'UserModel-authorizationFail'
        },
        signUp: {
            success: 'UserModel-signupSuccess',
            fail: 'UserModel-signupFail'
        },
        profileEdit: {
            success: 'UserModel-profileEditSuccess',
            fail: 'UserModel-profileEditFail'
        },
        profileGetData: {
            success: 'profile-successGetData',
            fail: 'fail-getData'
        }
    }
}

const Paths = {
    signIn: '/signin',
    menu: '/menu',
    signUp: '/signup',
    profile: '/profile',
    profileEdit: '/profileEdit',
    letters: '/letters'
}

export {Events, Paths}

