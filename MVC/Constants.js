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
    profileEditViewEvents:{
        submit: 'ProfileEdit-submit',
        errors: 'ProfileEdit-errors'
    },
    profileViewEvents:{
      needUserData: 'ProfileView-needUserData',


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
            success:'profile.css-successGetData',
            fail:'fail-getData'
        }
    }
}

const Pathes = {
    signIn: '/signin',
    menu: '/menu',
    signUp: '/signup',
    profile: '/profile.css',
    profileEdit: '/profileEdit'
}

export {Events, Pathes}

