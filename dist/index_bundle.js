!function (e) {
    var t = {};

    function n(s) {
        if (t[s]) return t[s].exports;
        var a = t[s] = {i: s, l: !1, exports: {}};
        return e[s].call(a.exports, a, a.exports, n), a.l = !0, a.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, s) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: s})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var s = Object.create(null);
        if (n.r(s), Object.defineProperty(s, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var a in e) n.d(s, a, function (t) {
            return e[t]
        }.bind(null, a));
        return s
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function (e, t, n) {
    "use strict";
    n.r(t);
    var s = {goBack: "goBack", redirect: "redirect"}, a = {submit: "SignIn-submit", errors: "SignIn-errors"},
        r = {submit: "SignUp-submit", errors: "SignUp-errors"},
        o = {submit: "ProfileEdit-submit", errors: "ProfileEdit-errors"},
        i = {needUserData: "ProfileView-needUserData"}, u = {needData: "mainPageView-needData"}, l = {
            needGetFolderList: "mainPageController-needGetFolderList",
            needGetLetterList: "mainPageController-needGetLetterList",
            needGetLetter: "mainPageController-needGetLetter"
        }, c = {sendLetter: "sendLetterView-sendLetter"}, p = {
            getLetter: {success: "letterModelEvents-getLetter-success", fail: "letterModelEvents-getLetter-fail"},
            getLetterList: {
                success: "letterModelEvents-getLetterList-success",
                fail: "letterModelEvents-getLetterList-fail"
            },
            getFolderList: {
                success: "letterModelEvents-getFolderList-success",
                fail: "letterModelEvents-getFolderList-fail"
            },
            sendLetter: {success: "letterModelEvents-sendLetter-success", fail: "letterModelEvents-sendLetter-fail"}
        }, m = {
            signIn: {success: "UserModel-authorizationSuccess", fail: "UserModel-authorizationFail"},
            signUp: {success: "UserModel-signupSuccess", fail: "UserModel-signupFail"},
            profileEdit: {success: "UserModel-profileEditSuccess", fail: "UserModel-profileEditFail"},
            profileGetData: {success: "profile-successGetData", fail: "fail-getData"}
        }, g = "/signin", f = "/signup", d = "/profile", h = "/profileEdit", b = "/letters", w = "/sendLetter",
        v = "/logout";

    function y(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var T = new (function () {
        function e() {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }

        var t, n, s;
        return t = e, (n = [{
            key: "on", value: function (e, t) {
                return this._eventHandlers || (this._eventHandlers = {}), this._eventHandlers[e] || (this._eventHandlers[e] = []), this._eventHandlers[e].push(t), this
            }
        }, {
            key: "off", value: function (e, t) {
                var n = this._eventHandlers && this._eventHandlers[e];
                n && (n = n.filter((function (e) {
                    return e === t
                })), this._eventHandlers = n)
            }
        }, {
            key: "emit", value: function (e) {
                for (var t = this, n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) s[a - 1] = arguments[a];
                console.log("EMIT", e, s), this._eventHandlers && this._eventHandlers[e] && this._eventHandlers[e].forEach((function (e) {
                    return e.apply(t, s)
                }))
            }
        }]) && y(t.prototype, n), s && y(t, s), e
    }());

    function P(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var C = function () {
        function e() {
            var t = this;
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.registeredPathes = {}, window.onpopstate = function (e) {
                e.preventDefault(), console.log("HISTORY EVENT", e);
                try {
                    t.registeredPathes[e.state.path].render(e.state.data)
                } catch (e) {
                    location = location.href
                }
            }, T.on(s.redirect, this.go.bind(this)), T.on(s.goBack, this.back.bind(this))
        }

        var t, n, a;
        return t = e, (n = [{
            key: "register", value: function (e, t) {
                this.registeredPathes[e] = t
            }
        }, {
            key: "start", value: function (e, t) {
                window.history.pushState({path: e, data: t || 1}, "Start", e), this.registeredPathes[e].render(t)
            }
        }, {
            key: "go", value: function (e) {
                console.log("GOOO", e), e && (this.registeredPathes[e.path].render(e.data || 0), window.history.pushState({
                    path: e.path,
                    data: e.data || 0
                }, e.path, e.path))
            }
        }, {
            key: "back", value: function () {
                console.log("I'L BE BACK"), window.history.back(), console.log("href", location.pathname), this.registeredPathes[location.pathname].render()
            }
        }]) && P(t.prototype, n), a && P(t, a), e
    }();

    function B(e) {
        return (B = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function V(e, t, n, s) {
        if (!1 === t || null == t || !t && ("class" === e || "style" === e)) return "";
        if (!0 === t) return " " + (s ? e : e + '="' + e + '"');
        var a = B(t);
        return "object" !== a && "function" !== a || "function" != typeof t.toJSON || (t = t.toJSON()), "string" == typeof t || (t = JSON.stringify(t), n || -1 === t.indexOf('"')) ? (n && (t = x(t)), " " + e + '="' + t + '"') : " " + e + "='" + t.replace(/'/g, "&#39;") + "'"
    }

    function S(e, t) {
        return Array.isArray(e) ? function (e, t) {
            for (var n, s = "", a = "", r = Array.isArray(t), o = 0; o < e.length; o++) (n = S(e[o])) && (r && t[o] && (n = x(n)), s = s + a + n, a = " ");
            return s
        }(e, t) : e && "object" == B(e) ? function (e) {
            var t = "", n = "";
            for (var s in e) s && e[s] && E.call(e, s) && (t = t + n + s, n = " ");
            return t
        }(e) : e || ""
    }

    function x(e) {
        var t = "" + e, n = N.exec(t);
        if (!n) return e;
        var s, a, r, o = "";
        for (s = n.index, a = 0; s < t.length; s++) {
            switch (t.charCodeAt(s)) {
                case 34:
                    r = "&quot;";
                    break;
                case 38:
                    r = "&amp;";
                    break;
                case 60:
                    r = "&lt;";
                    break;
                case 62:
                    r = "&gt;";
                    break;
                default:
                    continue
            }
            a !== s && (o += t.substring(a, s)), a = s + 1, o += r
        }
        return a !== s ? o + t.substring(a, s) : o
    }

    var E = Object.prototype.hasOwnProperty, N = /["&<>]/;

    function k(e) {
        var t, s, a, r = "", o = {};
        try {
            var i = {
                ".//src/Views/PugTemplates/SignInForm.pug": "include  BaseComponents/button\ninclude BaseComponents/pageTitle\ninclude BaseComponents/Text\ninclude BaseComponents/avatar\ninclude BaseComponents/classNames\n\n+pageTitle('Войти')\nform(method='POST' class=classNames.formClass)\n    +text('Login')\n    input(type='text', name='email', class=classNames.inputClass)\n    +text('Password')\n    input(type='password', name='password', class=classNames.inputClass)\n    input(type='submit', value='Войти', class=classNames.inputClass)\n    +button('Регистрация','signup', classNames.loginButton)\n    +button('Назад','back', classNames.regButton)\n\n//export {signinformTemplate}",
                "src/Views/PugTemplates/BaseComponents/button.pug": "mixin button(text, name, className)\n    button(class=className, name=name) #{text}",
                "src/Views/PugTemplates/BaseComponents/pageTitle.pug": "mixin pageTitle(text, className)\n    h1(class=className) #{text}",
                "src/Views/PugTemplates/BaseComponents/Text.pug": "mixin text(text, name)\n    p(class='MainTitle', name=name) #{text}",
                "src/Views/PugTemplates/BaseComponents/avatar.pug": "mixin avatar(src)\n    img(width=70, height=70, id='avatar', src=src)",
                "src/Views/PugTemplates/BaseComponents/classNames.pug": "- var classNames ={inputClass:'login-reg-input',formClass:'login-form',regButton:'reg-button',loginButton:'login-button', sendLetterButton:'send-button'}"
            };
            a = 1, s = "src/Views/PugTemplates/BaseComponents/button.pug", o.button = t = function (e, n, o) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + "<button" + (V("class", S([o], [!0]), !1, !1) + V("name", n, !0, !1)) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + x(null == (t = e) ? "" : t) + "</button>"
            }, a = 1, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", o.pageTitle = t = function (e, n) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", r = r + "<h1" + V("class", S([n], [!0]), !1, !1) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", r = r + x(null == (t = e) ? "" : t) + "</h1>"
            }, a = 1, s = "src/Views/PugTemplates/BaseComponents/Text.pug", o.text = t = function (e, n) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/Text.pug", r = r + '<p class="MainTitle"' + V("name", n, !0, !1) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/Text.pug", r = r + x(null == (t = e) ? "" : t) + "</p>"
            }, a = 1, s = "src/Views/PugTemplates/BaseComponents/avatar.pug", a = 1, s = "src/Views/PugTemplates/BaseComponents/classNames.pug";
            var u = {
                inputClass: "login-reg-input",
                formClass: "login-form",
                regButton: "reg-button",
                loginButton: "login-button",
                sendLetterButton: "send-button"
            };
            a = 7, s = ".//src/Views/PugTemplates/SignInForm.pug", o.pageTitle("Войти"), a = 8, s = ".//src/Views/PugTemplates/SignInForm.pug", r = r + "<form" + V("class", S([u.formClass], [!0]), !1, !1) + ' method="POST">', a = 9, s = ".//src/Views/PugTemplates/SignInForm.pug", o.text("Login"), a = 10, s = ".//src/Views/PugTemplates/SignInForm.pug", r = r + "<input" + V("class", S([u.inputClass], [!0]), !1, !1) + ' type="text" name="email"/>', a = 11, s = ".//src/Views/PugTemplates/SignInForm.pug", o.text("Password"), a = 12, s = ".//src/Views/PugTemplates/SignInForm.pug", r = r + "<input" + V("class", S([u.inputClass], [!0]), !1, !1) + ' type="password" name="password"/>', a = 13, s = ".//src/Views/PugTemplates/SignInForm.pug", r = r + "<input" + V("class", S([u.inputClass], [!0]), !1, !1) + ' type="submit" value="Войти"/>', a = 14, s = ".//src/Views/PugTemplates/SignInForm.pug", o.button("Регистрация", "signup", u.loginButton), a = 15, s = ".//src/Views/PugTemplates/SignInForm.pug", o.button("Назад", "back", u.regButton), r += "</form>", a = 17, s = ".//src/Views/PugTemplates/SignInForm.pug", r += "\x3c!--export {signinformTemplate}--\x3e"
        } catch (e) {
            !function e(t, s, a, r) {
                if (!(t instanceof Error)) throw t;
                if (!("undefined" == typeof window && s || r)) throw t.message += " on line " + a, t;
                try {
                    r = r || n(!function () {
                        var e = new Error("Cannot find module 'fs'");
                        throw e.code = "MODULE_NOT_FOUND", e
                    }()).readFileSync(s, "utf8")
                } catch (s) {
                    e(t, null, a)
                }
                var o = 3, i = r.split("\n"), u = Math.max(a - o, 0), l = Math.min(i.length, a + o);
                throw o = i.slice(u, l).map((function (e, t) {
                    var n = t + u + 1;
                    return (n == a ? "  > " : "    ") + n + "| " + e
                })).join("\n"), t.path = s, t.message = (s || "Pug") + ":" + a + "\n" + o + "\n\n" + t.message, t
            }(e, s, a, i[s])
        }
        return r
    }

    function L(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var A = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.element = t, T.on(m.signIn.fail, this.showErrors.bind(this))
        }

        var t, n, r;
        return t = e, (n = [{
            key: "render", value: function () {
                this.element.innerHTML = k();
                var e = document.getElementsByTagName("form")[0], t = document.getElementsByName("signup")[0],
                    n = document.getElementsByName("back")[0];
                e.addEventListener("submit", (function (t) {
                    t.preventDefault();
                    var n = new FormData(e);
                    T.emit(a.submit, {target: "SignInView", data: n})
                })), n.addEventListener("click", (function (e) {
                    e.preventDefault(), T.emit(s.goBack)
                })), t.addEventListener("click", (function (e) {
                    e.preventDefault(), T.emit(s.redirect, {path: f})
                }))
            }
        }, {
            key: "showErrors", value: function (e) {
                console.log("SIGN IN ERRORS SHOW", e.errors);
                var t = document.getElementsByName("password")[0], n = document.getElementsByName("email")[0];
                console.log(e.password), e.password && (t.value = "", t.placeholder = e.password), e.email && (n.value = "", n.placeholder = e.email)
            }
        }]) && L(t.prototype, n), r && L(t, r), e
    }();

    function O(e) {
        return (O = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function F(e, t, n, s) {
        if (!1 === t || null == t || !t && ("class" === e || "style" === e)) return "";
        if (!0 === t) return " " + (s ? e : e + '="' + e + '"');
        var a = O(t);
        return "object" !== a && "function" !== a || "function" != typeof t.toJSON || (t = t.toJSON()), "string" == typeof t || (t = JSON.stringify(t), n || -1 === t.indexOf('"')) ? (n && (t = I(t)), " " + e + '="' + t + '"') : " " + e + "='" + t.replace(/'/g, "&#39;") + "'"
    }

    function U(e, t) {
        return Array.isArray(e) ? function (e, t) {
            for (var n, s = "", a = "", r = Array.isArray(t), o = 0; o < e.length; o++) (n = U(e[o])) && (r && t[o] && (n = I(n)), s = s + a + n, a = " ");
            return s
        }(e, t) : e && "object" == O(e) ? function (e) {
            var t = "", n = "";
            for (var s in e) s && e[s] && D.call(e, s) && (t = t + n + s, n = " ");
            return t
        }(e) : e || ""
    }

    function I(e) {
        var t = "" + e, n = M.exec(t);
        if (!n) return e;
        var s, a, r, o = "";
        for (s = n.index, a = 0; s < t.length; s++) {
            switch (t.charCodeAt(s)) {
                case 34:
                    r = "&quot;";
                    break;
                case 38:
                    r = "&amp;";
                    break;
                case 60:
                    r = "&lt;";
                    break;
                case 62:
                    r = "&gt;";
                    break;
                default:
                    continue
            }
            a !== s && (o += t.substring(a, s)), a = s + 1, o += r
        }
        return a !== s ? o + t.substring(a, s) : o
    }

    var D = Object.prototype.hasOwnProperty, M = /["&<>]/;

    function j(e) {
        var t, s, a, r = "", o = {};
        try {
            var i = {
                ".//src/Views/PugTemplates/SignUpForm.pug": "include  BaseComponents/button\ninclude  BaseComponents/button\ninclude BaseComponents/pageTitle\ninclude BaseComponents/Text\ninclude BaseComponents/avatar\ninclude BaseComponents/classNames\n\n+pageTitle('Зарегистрироваться')\n\nform(method='POST', enctype = 'multipart/form-data', class='reg-form')\n    p(class='InputTitle') Имя\n    input(type='text', name='name', class=classNames.inputClass)\n    p(class='InputTitle') Фамилия\n    input(type='text', name='surname', class=classNames.inputClass)\n    p(class='InputTitle') Email\n    input(type='text', name='email', class=classNames.inputClass)\n    p(class='InputTitle') Введите Пароль\n    input(type='password', name='password1', class=classNames.inputClass)\n    p(class='InputTitle') Повторите пароль\n    input(type='password', name='password2', class=classNames.inputClass)\n    p(class='InputTitle') Аватар\n    input(type='file', placeholder='Выберете аватар', name='avatar', class=classNames.inputClass)\n    input(type='submit', value='Зарегистироваться', class='submit', class=classNames.inputClass)\n    +button('Назад', 'back', classNames.regButton)\n\n//export {template}",
                "src/Views/PugTemplates/BaseComponents/button.pug": "mixin button(text, name, className)\n    button(class=className, name=name) #{text}",
                "src/Views/PugTemplates/BaseComponents/pageTitle.pug": "mixin pageTitle(text, className)\n    h1(class=className) #{text}",
                "src/Views/PugTemplates/BaseComponents/Text.pug": "mixin text(text, name)\n    p(class='MainTitle', name=name) #{text}",
                "src/Views/PugTemplates/BaseComponents/avatar.pug": "mixin avatar(src)\n    img(width=70, height=70, id='avatar', src=src)",
                "src/Views/PugTemplates/BaseComponents/classNames.pug": "- var classNames ={inputClass:'login-reg-input',formClass:'login-form',regButton:'reg-button',loginButton:'login-button', sendLetterButton:'send-button'}"
            };
            a = 1, s = "src/Views/PugTemplates/BaseComponents/button.pug", o.button = t = function (e, n, o) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + "<button" + (F("class", U([o], [!0]), !1, !1) + F("name", n, !0, !1)) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + I(null == (t = e) ? "" : t) + "</button>"
            }, a = 1, s = "src/Views/PugTemplates/BaseComponents/button.pug", o.button = t = function (e, n, o) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + "<button" + (F("class", U([o], [!0]), !1, !1) + F("name", n, !0, !1)) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + I(null == (t = e) ? "" : t) + "</button>"
            }, a = 1, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", o.pageTitle = t = function (e, n) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", r = r + "<h1" + F("class", U([n], [!0]), !1, !1) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", r = r + I(null == (t = e) ? "" : t) + "</h1>"
            }, a = 1, s = "src/Views/PugTemplates/BaseComponents/Text.pug", a = 1, s = "src/Views/PugTemplates/BaseComponents/avatar.pug", a = 1, s = "src/Views/PugTemplates/BaseComponents/classNames.pug";
            var u = {
                inputClass: "login-reg-input",
                formClass: "login-form",
                regButton: "reg-button",
                loginButton: "login-button",
                sendLetterButton: "send-button"
            };
            a = 8, s = ".//src/Views/PugTemplates/SignUpForm.pug", o.pageTitle("Зарегистрироваться"), a = 10, s = ".//src/Views/PugTemplates/SignUpForm.pug", r += '<form class="reg-form" method="POST" enctype="multipart/form-data">', a = 11, s = ".//src/Views/PugTemplates/SignUpForm.pug", r += '<p class="InputTitle">', a = 11, s = ".//src/Views/PugTemplates/SignUpForm.pug", a = 12, s = ".//src/Views/PugTemplates/SignUpForm.pug", r = (r += "Имя</p>") + "<input" + F("class", U([u.inputClass], [!0]), !1, !1) + ' type="text" name="name"/>', a = 13, s = ".//src/Views/PugTemplates/SignUpForm.pug", r += '<p class="InputTitle">', a = 13, s = ".//src/Views/PugTemplates/SignUpForm.pug", a = 14, s = ".//src/Views/PugTemplates/SignUpForm.pug", r = (r += "Фамилия</p>") + "<input" + F("class", U([u.inputClass], [!0]), !1, !1) + ' type="text" name="surname"/>', a = 15, s = ".//src/Views/PugTemplates/SignUpForm.pug", r += '<p class="InputTitle">', a = 15, s = ".//src/Views/PugTemplates/SignUpForm.pug", a = 16, s = ".//src/Views/PugTemplates/SignUpForm.pug", r = (r += "Email</p>") + "<input" + F("class", U([u.inputClass], [!0]), !1, !1) + ' type="text" name="email"/>', a = 17, s = ".//src/Views/PugTemplates/SignUpForm.pug", r += '<p class="InputTitle">', a = 17, s = ".//src/Views/PugTemplates/SignUpForm.pug", a = 18, s = ".//src/Views/PugTemplates/SignUpForm.pug", r = (r += "Введите Пароль</p>") + "<input" + F("class", U([u.inputClass], [!0]), !1, !1) + ' type="password" name="password1"/>', a = 19, s = ".//src/Views/PugTemplates/SignUpForm.pug", r += '<p class="InputTitle">', a = 19, s = ".//src/Views/PugTemplates/SignUpForm.pug", a = 20, s = ".//src/Views/PugTemplates/SignUpForm.pug", r = (r += "Повторите пароль</p>") + "<input" + F("class", U([u.inputClass], [!0]), !1, !1) + ' type="password" name="password2"/>', a = 21, s = ".//src/Views/PugTemplates/SignUpForm.pug", r += '<p class="InputTitle">', a = 21, s = ".//src/Views/PugTemplates/SignUpForm.pug", a = 22, s = ".//src/Views/PugTemplates/SignUpForm.pug", r = (r += "Аватар</p>") + "<input" + F("class", U([u.inputClass], [!0]), !1, !1) + ' type="file" placeholder="Выберете аватар" name="avatar"/>', a = 23, s = ".//src/Views/PugTemplates/SignUpForm.pug", r = r + "<input" + F("class", U(["submit", u.inputClass], [!1, !0]), !1, !1) + ' type="submit" value="Зарегистироваться"/>', a = 24, s = ".//src/Views/PugTemplates/SignUpForm.pug", o.button("Назад", "back", u.regButton), r += "</form>", a = 26, s = ".//src/Views/PugTemplates/SignUpForm.pug", r += "\x3c!--export {template}--\x3e"
        } catch (e) {
            !function e(t, s, a, r) {
                if (!(t instanceof Error)) throw t;
                if (!("undefined" == typeof window && s || r)) throw t.message += " on line " + a, t;
                try {
                    r = r || n(!function () {
                        var e = new Error("Cannot find module 'fs'");
                        throw e.code = "MODULE_NOT_FOUND", e
                    }()).readFileSync(s, "utf8")
                } catch (s) {
                    e(t, null, a)
                }
                var o = 3, i = r.split("\n"), u = Math.max(a - o, 0), l = Math.min(i.length, a + o);
                throw o = i.slice(u, l).map((function (e, t) {
                    var n = t + u + 1;
                    return (n == a ? "  > " : "    ") + n + "| " + e
                })).join("\n"), t.path = s, t.message = (s || "Pug") + ":" + a + "\n" + o + "\n\n" + t.message, t
            }(e, s, a, i[s])
        }
        return r
    }

    function _(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var R = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.element = t, T.on(m.signUp.fail, this.showErrors.bind(this))
        }

        var t, n, a;
        return t = e, (n = [{
            key: "render", value: function () {
                this.element.innerHTML = j();
                var e = document.getElementsByTagName("form")[0], t = document.getElementsByName("back")[0];
                e.addEventListener("submit", (function (t) {
                    t.preventDefault(), T.emit(r.submit, {target: "SignUpView", data: new FormData(e)})
                })), t.addEventListener("click", (function (e) {
                    e.preventDefault(), T.emit(s.goBack)
                }))
            }
        }, {
            key: "showErrors", value: function (e) {
                console.log("SIGN UP ERRORS SHOW", e);
                var t = document.getElementsByName("email")[0], n = document.getElementsByName("password1")[0],
                    s = document.getElementsByName("password2")[0], a = document.getElementsByName("name")[0],
                    r = document.getElementsByName("surname")[0];
                console.log(e.password1), e.password1 ? (n.value = "", n.placeholder = e.password1) : e.password2 && (s.value = "", s.placeholder = e.password2), e.email && (t.value = "", t.placeholder = e.email), e.name && (a.value = "", a.placeholder = e.name), e.surname && (r.value = "", r.placeholder = e.surname)
            }
        }]) && _(t.prototype, n), a && _(t, a), e
    }();

    function G(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var H = new (function () {
        function e() {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }

        var t, n, s;
        return t = e, (n = [{
            key: "_checkEmail", value: function (e) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
            }
        }, {
            key: "_checkName", value: function (e) {
                return /[0-9a-z]+/i.test(e)
            }
        }, {
            key: "_checkSurname", value: function (e) {
                return /[0-9a-z]+/i.test(e)
            }
        }, {
            key: "_checkPassword", value: function (e) {
                return e.length > 3
            }
        }, {
            key: "_checkPasswordEqual", value: function (e, t) {
                return e === t
            }
        }, {
            key: "checkSignInForm", value: function (e) {
                var t = {};
                return this._checkEmail(e.get("email")) || (t.email = "Некорректный email"), this._checkPassword(e.get("password")) || (t.password = "слишком короткий пароль"), t
            }
        }, {
            key: "checkSignUpForm", value: function (e) {
                console.log("VALIDATOR SIGN UP", e.get("email"), e.get("password1"), e.get("password2"), e.get("name"), e.get("surname"));
                var t = {};
                return this._checkEmail(e.get("email")) || (t.email = "Некорректный email"), this._checkPassword(e.get("password1")) ? this._checkPasswordEqual(e.get("password1"), e.get("password2")) || (t.password2 = "Пароли не совпадают") : t.password1 = "слишком короткий пароль", this._checkName(e.get("name")) || (t.name = "Некорректное имя"), this._checkSurname(e.get("surname")) || (t.surname = "Некорректная фамилия"), t
            }
        }]) && G(t.prototype, n), s && G(t, s), e
    }());

    function J(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var q = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.baseUrl = t, this.user = {}, T.on(a.submit, this.signIn.bind(this)), T.on(r.submit, this.signUp.bind(this)), T.on(o.submit, this.editUser.bind(this)), T.on(i.needUserData, this.getUserData.bind(this, m.profileGetData))
        }

        var t, n, s;
        return t = e, (n = [{
            key: "signIn", value: function (e) {
                var t = this, n = H.checkSignInForm(e.data);
                if (0 !== Object.keys(n).length) return console.log("ERRORS IN SIGN IN ", n), void T.emit(m.signIn.fail, n);
                console.log("SIGN IN ", e, this.baseUrl + g), fetch(this.baseUrl + g, {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    body: e.data
                }).then((function (e) {
                    return e.json()
                })).then((function (e) {
                    200 === e.Code ? t.getUserData(m.signIn) : 401 === e.Code ? T.emit(m.signIn.fail, {password: e.Description}) : 404 === e.Code ? T.emit(m.signIn.fail, {email: e.Description}) : T.emit(m.signIn.fail, {unknowError: e.Description})
                })).catch((function (e) {
                    console.log("CAAAAAAAAAAAAAAAATCH", e)
                }))
            }
        }, {
            key: "signUp", value: function (e) {
                var t = this, n = H.checkSignUpForm(e.data);
                if (0 !== Object.keys(n).length) return console.log("ERRORS IN SIGN UP ", n), void T.emit(m.signUp.fail, n);
                fetch(this.baseUrl + f, {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    body: e.data
                }).then((function (e) {
                    return e.json()
                })).then((function (e) {
                    console.log("RESP SIGN UP UP", e.Code, e), 200 === e.Code ? t.getUserData(m.signUp) : T.emit(m.signUp.fail, {email: e.Description})
                })).catch((function (e) {
                    console.log("CAAAAAAAAAAAAAAAATCH", e)
                }))
            }
        }, {
            key: "editUser", value: function (e) {
                var t = this;
                fetch(this.baseUrl + d, {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    body: e.data
                }).then((function (e) {
                    return e.json()
                })).then((function (e) {
                    console.log("RESP SIGN UP UP", e.Code, e), 200 === e.Code ? t.getUserData(m.profileEdit) : T.emit(m.profileEdit.fail, {error: e.Description})
                })).catch((function (e) {
                    console.log("CAAAAAAAAAAAAAAAATCH", e)
                }))
            }
        }, {
            key: "getUserData", value: function (e) {
                var t = this;
                console.log("GET USER DATA EVENT TYPE", e);
                var n = fetch(this.baseUrl + d, {
                    method: "GET",
                    mode: "cors",
                    credentials: "include"
                }).then((function (e) {
                    return e.json()
                })).then((function (e) {
                    if (console.log("RESP GET USER DATA", e.status, e), 200 !== e.Code) throw new Error(e.Description);
                    t.user.name = e.User.Name, t.user.email = e.User.Email, t.user.surname = e.User.Surname, t.user.avatar = ""
                })), s = fetch(this.baseUrl + "/getAvatar", {
                    method: "GET",
                    mode: "cors",
                    credentials: "include"
                }).then((function (e) {
                    return e.blob()
                })).then((function (e) {
                    console.log("BLOB", e), t.user.avatar = URL.createObjectURL(e)
                }));
                Promise.all([n, s]).then((function (n) {
                    console.log("УСПЕХ"), console.log("USER", t.user), T.emit(e.success, t.user)
                }), (function (t) {
                    T.emit(e.fail, {errors: t.message})
                }))
            }
        }, {
            key: "logout", value: function () {
            }
        }]) && J(t.prototype, n), s && J(t, s), e
    }();

    function W(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var z = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.baseUrl = t, this.Letters = {}, T.on(l.needGetLetter, this.getLetter.bind(this)), T.on(l.needGetLetterList, this.getLetterList.bind(this)), T.on(l.needGetFolderList, this.getFolders.bind(this)), T.on(c.sendLetter, this.sendLetter.bind(this))
        }

        var t, n, s;
        return t = e, (n = [{
            key: "getLetter", value: function () {
                T.emit(p.getLetter.success, {
                    id: 12,
                    dateTime: 24,
                    sender: "sergiy",
                    text: "HELLO WORLD",
                    theme: "JAVA SCRIPT"
                })
            }
        }, {
            key: "sendLetter", value: function (e) {
                var t = this;
                fetch(this.baseUrl + "/sendMessage", {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    body: e.data
                }).then((function (e) {
                    return e.json()
                })).then((function (n) {
                    console.log("RESP SIGN UP UP", n.Code, n), 200 === n.Code ? (console.log("SUCCES SEND LETTER"), T.emit(p.sendLetter.success, b), t.Letters["исходящие"] += [e.data]) : T.emit(p.sendLetter.fail, {error: n.Description})
                })).catch((function (e) {
                    console.log("CAAAAAAAAAAAAAAAATCH", e)
                }))
            }
        }, {
            key: "getFolders", value: function () {
                T.emit(p.getFolderList.success, ["Входящие", "Отправленные"])
            }
        }, {
            key: "getLetterList", value: function () {
                console.log("letters", this.Letters), T.emit(p.getLetterList.success, [{
                    id: 12,
                    dateTime: 24,
                    sender: "sergiy",
                    text: "HELLO WORLD",
                    theme: "JAVA SCRIPT"
                }])
            }
        }]) && W(t.prototype, n), s && W(t, s), e
    }();

    function K(e) {
        return (K = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function Y(e, t, n, s) {
        if (!1 === t || null == t || !t && ("class" === e || "style" === e)) return "";
        if (!0 === t) return " " + (s ? e : e + '="' + e + '"');
        var a = K(t);
        return "object" !== a && "function" !== a || "function" != typeof t.toJSON || (t = t.toJSON()), "string" == typeof t || (t = JSON.stringify(t), n || -1 === t.indexOf('"')) ? (n && (t = $(t)), " " + e + '="' + t + '"') : " " + e + "='" + t.replace(/'/g, "&#39;") + "'"
    }

    function Z(e, t) {
        return Array.isArray(e) ? function (e, t) {
            for (var n, s = "", a = "", r = Array.isArray(t), o = 0; o < e.length; o++) (n = Z(e[o])) && (r && t[o] && (n = $(n)), s = s + a + n, a = " ");
            return s
        }(e, t) : e && "object" == K(e) ? function (e) {
            var t = "", n = "";
            for (var s in e) s && e[s] && Q.call(e, s) && (t = t + n + s, n = " ");
            return t
        }(e) : e || ""
    }

    function $(e) {
        var t = "" + e, n = X.exec(t);
        if (!n) return e;
        var s, a, r, o = "";
        for (s = n.index, a = 0; s < t.length; s++) {
            switch (t.charCodeAt(s)) {
                case 34:
                    r = "&quot;";
                    break;
                case 38:
                    r = "&amp;";
                    break;
                case 60:
                    r = "&lt;";
                    break;
                case 62:
                    r = "&gt;";
                    break;
                default:
                    continue
            }
            a !== s && (o += t.substring(a, s)), a = s + 1, o += r
        }
        return a !== s ? o + t.substring(a, s) : o
    }

    var Q = Object.prototype.hasOwnProperty, X = /["&<>]/;

    function ee(e) {
        var t, s, a, r = "", o = {};
        try {
            var i = {
                ".//src/Views/PugTemplates/ProfilePage.pug": "include  BaseComponents/button\ninclude BaseComponents/pageTitle\ninclude BaseComponents/Text\ninclude BaseComponents/avatar\ninclude BaseComponents/classNames\n\n+pageTitle('Профиль')\n\ndiv\n    +text(locals.name + ' ' + locals.surname, 'profile_name')\n    +text('Email: ' + locals.email)\n    +text('Аватар')\n    +avatar(locals.avatar)\n    +button('Редактировать', 'editButton')\n    +button('Назад' ,name='back')\n\n\n//export {template}",
                "src/Views/PugTemplates/BaseComponents/button.pug": "mixin button(text, name, className)\n    button(class=className, name=name) #{text}",
                "src/Views/PugTemplates/BaseComponents/pageTitle.pug": "mixin pageTitle(text, className)\n    h1(class=className) #{text}",
                "src/Views/PugTemplates/BaseComponents/Text.pug": "mixin text(text, name)\n    p(class='MainTitle', name=name) #{text}",
                "src/Views/PugTemplates/BaseComponents/avatar.pug": "mixin avatar(src)\n    img(width=70, height=70, id='avatar', src=src)",
                "src/Views/PugTemplates/BaseComponents/classNames.pug": "- var classNames ={inputClass:'login-reg-input',formClass:'login-form',regButton:'reg-button',loginButton:'login-button', sendLetterButton:'send-button'}"
            }, u = e || {};
            (function (n) {
                a = 1, s = "src/Views/PugTemplates/BaseComponents/button.pug", o.button = t = function (e, n, o) {
                    this && this.block, this && this.attributes;
                    a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + "<button" + (Y("class", Z([o], [!0]), !1, !1) + Y("name", n, !0, !1)) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + $(null == (t = e) ? "" : t) + "</button>"
                }, a = 1, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", o.pageTitle = t = function (e, n) {
                    this && this.block, this && this.attributes;
                    a = 2, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", r = r + "<h1" + Y("class", Z([n], [!0]), !1, !1) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", r = r + $(null == (t = e) ? "" : t) + "</h1>"
                }, a = 1, s = "src/Views/PugTemplates/BaseComponents/Text.pug", o.text = t = function (e, n) {
                    this && this.block, this && this.attributes;
                    a = 2, s = "src/Views/PugTemplates/BaseComponents/Text.pug", r = r + '<p class="MainTitle"' + Y("name", n, !0, !1) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/Text.pug", r = r + $(null == (t = e) ? "" : t) + "</p>"
                }, a = 1, s = "src/Views/PugTemplates/BaseComponents/avatar.pug", o.avatar = t = function (e) {
                    this && this.block, this && this.attributes;
                    a = 2, s = "src/Views/PugTemplates/BaseComponents/avatar.pug", r = r + '<img width="70" height="70" id="avatar"' + Y("src", e, !0, !1) + "/>"
                }, a = 1, s = "src/Views/PugTemplates/BaseComponents/classNames.pug";
                a = 7, s = ".//src/Views/PugTemplates/ProfilePage.pug", o.pageTitle("Профиль"), a = 9, s = ".//src/Views/PugTemplates/ProfilePage.pug", r += "<div>", a = 10, s = ".//src/Views/PugTemplates/ProfilePage.pug", o.text(e.name + " " + e.surname, "profile_name"), a = 11, s = ".//src/Views/PugTemplates/ProfilePage.pug", o.text("Email: " + e.email), a = 12, s = ".//src/Views/PugTemplates/ProfilePage.pug", o.text("Аватар"), a = 13, s = ".//src/Views/PugTemplates/ProfilePage.pug", o.avatar(e.avatar), a = 14, s = ".//src/Views/PugTemplates/ProfilePage.pug", o.button("Редактировать", "editButton"), a = 15, s = ".//src/Views/PugTemplates/ProfilePage.pug", o.button("Назад", "back"), r += "</div>", a = 18, s = ".//src/Views/PugTemplates/ProfilePage.pug", r += "\x3c!--export {template}--\x3e"
            }).call(this, "name" in u ? u.name : "undefined" != typeof name ? name : void 0)
        } catch (e) {
            !function e(t, s, a, r) {
                if (!(t instanceof Error)) throw t;
                if (!("undefined" == typeof window && s || r)) throw t.message += " on line " + a, t;
                try {
                    r = r || n(!function () {
                        var e = new Error("Cannot find module 'fs'");
                        throw e.code = "MODULE_NOT_FOUND", e
                    }()).readFileSync(s, "utf8")
                } catch (s) {
                    e(t, null, a)
                }
                var o = 3, i = r.split("\n"), u = Math.max(a - o, 0), l = Math.min(i.length, a + o);
                throw o = i.slice(u, l).map((function (e, t) {
                    var n = t + u + 1;
                    return (n == a ? "  > " : "    ") + n + "| " + e
                })).join("\n"), t.path = s, t.message = (s || "Pug") + ":" + a + "\n" + o + "\n\n" + t.message, t
            }(e, s, a, i[s])
        }
        return r
    }

    function te(e) {
        return (te = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function ne(e) {
        var t = "" + e, n = se.exec(t);
        if (!n) return e;
        var s, a, r, o = "";
        for (s = n.index, a = 0; s < t.length; s++) {
            switch (t.charCodeAt(s)) {
                case 34:
                    r = "&quot;";
                    break;
                case 38:
                    r = "&amp;";
                    break;
                case 60:
                    r = "&lt;";
                    break;
                case 62:
                    r = "&gt;";
                    break;
                default:
                    continue
            }
            a !== s && (o += t.substring(a, s)), a = s + 1, o += r
        }
        return a !== s ? o + t.substring(a, s) : o
    }

    Object.prototype.hasOwnProperty;
    var se = /["&<>]/;

    function ae(e) {
        var t, s, a = "", r = {};
        try {
            var o = {
                ".//src/Views/PugTemplates/BaseComponents/navbar.pug": "include button\ninclude avatar\nmixin navbar(src)\n    ul()\n        li() LOGO\n        li()\n            a(name = 'navbar-send') 'Отправить'\n        li()\n            +avatar('')\n        li()\n            a(name = 'navbar-profile') 'Профиль'\n        li()\n            a(name = 'navbar-exit') 'Выйти'\n\n+navbar(src)\n//export {template}",
                "src/Views/PugTemplates/BaseComponents/button.pug": "mixin button(text, name, className)\n    button(class=className, name=name) #{text}",
                "src/Views/PugTemplates/BaseComponents/avatar.pug": "mixin avatar(src)\n    img(width=70, height=70, id='avatar', src=src)"
            }, i = e || {};
            (function (e) {
                s = 1, t = "src/Views/PugTemplates/BaseComponents/button.pug", s = 1, t = "src/Views/PugTemplates/BaseComponents/avatar.pug", r.avatar = function (e) {
                    this && this.block, this && this.attributes;
                    s = 2, t = "src/Views/PugTemplates/BaseComponents/avatar.pug", a = a + '<img width="70" height="70" id="avatar"' + function (e, t, n, s) {
                        if (!1 === t || null == t || !t && ("class" === e || "style" === e)) return "";
                        if (!0 === t) return " " + (s ? e : e + '="' + e + '"');
                        var a = te(t);
                        return "object" !== a && "function" !== a || "function" != typeof t.toJSON || (t = t.toJSON()), "string" == typeof t || (t = JSON.stringify(t), n || -1 === t.indexOf('"')) ? (n && (t = ne(t)), " " + e + '="' + t + '"') : " " + e + "='" + t.replace(/'/g, "&#39;") + "'"
                    }("src", e, !0, !1) + "/>"
                }, s = 3, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", r.navbar = function (e) {
                    this && this.block, this && this.attributes;
                    s = 4, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += "<ul>", s = 5, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += "<li>", s = 5, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += "LOGO</li>", s = 6, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += "<li>", s = 7, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += '<a name="navbar-send">', s = 7, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += "'Отправить'</a></li>", s = 8, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += "<li>", s = 9, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", r.avatar(""), a += "</li>", s = 10, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += "<li>", s = 11, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += '<a name="navbar-profile">', s = 11, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += "'Профиль'</a></li>", s = 12, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += "<li>", s = 13, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += '<a name="navbar-exit">', s = 13, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += "'Выйти'</a></li></ul>"
                }, s = 15, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", r.navbar(e), s = 16, t = ".//src/Views/PugTemplates/BaseComponents/navbar.pug", a += "\x3c!--export {template}--\x3e"
            }).call(this, "src" in i ? i.src : "undefined" != typeof src ? src : void 0)
        } catch (e) {
            !function e(t, s, a, r) {
                if (!(t instanceof Error)) throw t;
                if (!("undefined" == typeof window && s || r)) throw t.message += " on line " + a, t;
                try {
                    r = r || n(!function () {
                        var e = new Error("Cannot find module 'fs'");
                        throw e.code = "MODULE_NOT_FOUND", e
                    }()).readFileSync(s, "utf8")
                } catch (s) {
                    e(t, null, a)
                }
                var o = 3, i = r.split("\n"), u = Math.max(a - o, 0), l = Math.min(i.length, a + o);
                throw o = i.slice(u, l).map((function (e, t) {
                    var n = t + u + 1;
                    return (n == a ? "  > " : "    ") + n + "| " + e
                })).join("\n"), t.path = s, t.message = (s || "Pug") + ":" + a + "\n" + o + "\n\n" + t.message, t
            }(e, t, s, o[t])
        }
        return a
    }

    function re(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var oe = new (function () {
        function e() {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.element = document.body
        }

        var t, n, a;
        return t = e, (n = [{
            key: "render", value: function (e) {
                console.log("NAVBAR VIEW RENDER", e);
                var t = document.getElementById("navbar") || document.createElement("div");
                t.id = "navbar", t.innerHTML = ae(e), this.element.appendChild(t);
                var n = document.getElementsByName("navbar-send")[0],
                    a = document.getElementsByName("navbar-profile")[0],
                    r = document.getElementsByName("navbar-exit")[0];
                n.onclick = function (e) {
                    console.log("CLICK"), e.preventDefault(), T.emit(s.redirect, {path: w})
                }, a.onclick = function (e) {
                    e.preventDefault(), console.log("CLICK"), T.emit(s.redirect, {path: d})
                }, r.onclick = function (e) {
                    console.log("CLICK"), e.preventDefault(), T.emit(s.redirect, {path: v})
                }, r.onsubmit = function (e) {
                    console.log("submint"), e.preventDefault()
                }
            }
        }, {
            key: "hide", value: function () {
                document.getElementById("navbar").innerHTML = ""
            }
        }]) && re(t.prototype, n), a && re(t, a), e
    }());

    function ie(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var ue = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.element = t, T.on(m.profileGetData.success, this.render.bind(this)), T.on(m.profileGetData.fail, this.showErrors.bind(this))
        }

        var t, n, a;
        return t = e, (n = [{
            key: "render", value: function (e) {
                if (e) {
                    this.element.innerHTM = "", oe.render(e.navbar), this.element.innerHTML += ee(e);
                    var t = document.getElementsByName("editButton")[0], n = document.getElementsByName("back")[0];
                    t.addEventListener("click", (function (t) {
                        t.preventDefault(), T.emit(s.redirect, {path: h, data: e})
                    })), n.addEventListener("click", (function (e) {
                        e.preventDefault(), T.emit(s.goBack)
                    }))
                } else T.emit(i.needUserData)
            }
        }, {
            key: "showErrors", value: function (e) {
                console.log("SHow Errors", e)
            }
        }]) && ie(t.prototype, n), a && ie(t, a), e
    }();

    function le(e) {
        return (le = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function ce(e, t, n, s) {
        if (!1 === t || null == t || !t && ("class" === e || "style" === e)) return "";
        if (!0 === t) return " " + (s ? e : e + '="' + e + '"');
        var a = le(t);
        return "object" !== a && "function" !== a || "function" != typeof t.toJSON || (t = t.toJSON()), "string" == typeof t || (t = JSON.stringify(t), n || -1 === t.indexOf('"')) ? (n && (t = me(t)), " " + e + '="' + t + '"') : " " + e + "='" + t.replace(/'/g, "&#39;") + "'"
    }

    function pe(e, t) {
        return Array.isArray(e) ? function (e, t) {
            for (var n, s = "", a = "", r = Array.isArray(t), o = 0; o < e.length; o++) (n = pe(e[o])) && (r && t[o] && (n = me(n)), s = s + a + n, a = " ");
            return s
        }(e, t) : e && "object" == le(e) ? function (e) {
            var t = "", n = "";
            for (var s in e) s && e[s] && ge.call(e, s) && (t = t + n + s, n = " ");
            return t
        }(e) : e || ""
    }

    function me(e) {
        var t = "" + e, n = fe.exec(t);
        if (!n) return e;
        var s, a, r, o = "";
        for (s = n.index, a = 0; s < t.length; s++) {
            switch (t.charCodeAt(s)) {
                case 34:
                    r = "&quot;";
                    break;
                case 38:
                    r = "&amp;";
                    break;
                case 60:
                    r = "&lt;";
                    break;
                case 62:
                    r = "&gt;";
                    break;
                default:
                    continue
            }
            a !== s && (o += t.substring(a, s)), a = s + 1, o += r
        }
        return a !== s ? o + t.substring(a, s) : o
    }

    var ge = Object.prototype.hasOwnProperty, fe = /["&<>]/;

    function de(e) {
        var t, s, a, r = "", o = {};
        try {
            var i = {
                ".//src/Views/PugTemplates/ProfileEditForm.pug": "include  BaseComponents/button\ninclude BaseComponents/pageTitle\ninclude BaseComponents/Text\ninclude BaseComponents/avatar\ninclude BaseComponents/classNames\n\n+pageTitle('Редактирование профиля')\n\nform(method='POST', enctype = 'multipart/form-data')\n    +text('Имя')\n    input(type='text', name='profile_firstName', value=locals.name, class=classNames.inputClass)\n    +text('Фамилия')\n    input(type='text', name='profile_lastName', value=locals.surname, class=classNames.inputClass)\n    +text('Аватар')\n    +avatar(locals.avatar)\n    input(type='file', placeholder='Выберете аватар', name='avatar', class=classNames.inputClass)\n    input(type='submit', value='Применить', class=classNames.inputClass)\n    +button('Назад','back')\n\n//export {template}",
                "src/Views/PugTemplates/BaseComponents/button.pug": "mixin button(text, name, className)\n    button(class=className, name=name) #{text}",
                "src/Views/PugTemplates/BaseComponents/pageTitle.pug": "mixin pageTitle(text, className)\n    h1(class=className) #{text}",
                "src/Views/PugTemplates/BaseComponents/Text.pug": "mixin text(text, name)\n    p(class='MainTitle', name=name) #{text}",
                "src/Views/PugTemplates/BaseComponents/avatar.pug": "mixin avatar(src)\n    img(width=70, height=70, id='avatar', src=src)",
                "src/Views/PugTemplates/BaseComponents/classNames.pug": "- var classNames ={inputClass:'login-reg-input',formClass:'login-form',regButton:'reg-button',loginButton:'login-button', sendLetterButton:'send-button'}"
            };
            a = 1, s = "src/Views/PugTemplates/BaseComponents/button.pug", o.button = t = function (e, n, o) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + "<button" + (ce("class", pe([o], [!0]), !1, !1) + ce("name", n, !0, !1)) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + me(null == (t = e) ? "" : t) + "</button>"
            }, a = 1, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", o.pageTitle = t = function (e, n) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", r = r + "<h1" + ce("class", pe([n], [!0]), !1, !1) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", r = r + me(null == (t = e) ? "" : t) + "</h1>"
            }, a = 1, s = "src/Views/PugTemplates/BaseComponents/Text.pug", o.text = t = function (e, n) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/Text.pug", r = r + '<p class="MainTitle"' + ce("name", n, !0, !1) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/Text.pug", r = r + me(null == (t = e) ? "" : t) + "</p>"
            }, a = 1, s = "src/Views/PugTemplates/BaseComponents/avatar.pug", o.avatar = t = function (e) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/avatar.pug", r = r + '<img width="70" height="70" id="avatar"' + ce("src", e, !0, !1) + "/>"
            }, a = 1, s = "src/Views/PugTemplates/BaseComponents/classNames.pug";
            var u = {
                inputClass: "login-reg-input",
                formClass: "login-form",
                regButton: "reg-button",
                loginButton: "login-button",
                sendLetterButton: "send-button"
            };
            a = 7, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", o.pageTitle("Редактирование профиля"), a = 9, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", r += '<form method="POST" enctype="multipart/form-data">', a = 10, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", o.text("Имя"), a = 11, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", r = r + "<input" + ce("class", pe([u.inputClass], [!0]), !1, !1) + ' type="text" name="profile_firstName"' + ce("value", e.name, !0, !1) + "/>", a = 12, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", o.text("Фамилия"), a = 13, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", r = r + "<input" + ce("class", pe([u.inputClass], [!0]), !1, !1) + ' type="text" name="profile_lastName"' + ce("value", e.surname, !0, !1) + "/>", a = 14, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", o.text("Аватар"), a = 15, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", o.avatar(e.avatar), a = 16, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", r = r + "<input" + ce("class", pe([u.inputClass], [!0]), !1, !1) + ' type="file" placeholder="Выберете аватар" name="avatar"/>', a = 17, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", r = r + "<input" + ce("class", pe([u.inputClass], [!0]), !1, !1) + ' type="submit" value="Применить"/>', a = 18, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", o.button("Назад", "back"), r += "</form>", a = 20, s = ".//src/Views/PugTemplates/ProfileEditForm.pug", r += "\x3c!--export {template}--\x3e"
        } catch (e) {
            !function e(t, s, a, r) {
                if (!(t instanceof Error)) throw t;
                if (!("undefined" == typeof window && s || r)) throw t.message += " on line " + a, t;
                try {
                    r = r || n(!function () {
                        var e = new Error("Cannot find module 'fs'");
                        throw e.code = "MODULE_NOT_FOUND", e
                    }()).readFileSync(s, "utf8")
                } catch (s) {
                    e(t, null, a)
                }
                var o = 3, i = r.split("\n"), u = Math.max(a - o, 0), l = Math.min(i.length, a + o);
                throw o = i.slice(u, l).map((function (e, t) {
                    var n = t + u + 1;
                    return (n == a ? "  > " : "    ") + n + "| " + e
                })).join("\n"), t.path = s, t.message = (s || "Pug") + ":" + a + "\n" + o + "\n\n" + t.message, t
            }(e, s, a, i[s])
        }
        return r
    }

    function he(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var be = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.element = t, T.on(m.profileEdit.fail, this.showErrors.bind(this))
        }

        var t, n, a;
        return t = e, (n = [{
            key: "render", value: function (e) {
                this.element.innerHTML = "", oe.render(e.navbar), this.element.innerHTML += de(e);
                var t = document.getElementsByTagName("form")[0], n = document.getElementsByName("back")[0];
                t.addEventListener("submit", (function (e) {
                    e.preventDefault(), T.emit(o.submit, {target: "ProfileEditView", data: new FormData(t)})
                })), n.addEventListener("click", (function (e) {
                    e.preventDefault(), T.emit(s.goBack)
                }))
            }
        }, {
            key: "showErrors", value: function (e) {
                console.log("PROFILE EDIT Errors", e)
            }
        }]) && he(t.prototype, n), a && he(t, a), e
    }();
    Object.prototype.hasOwnProperty;

    function we(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var ve = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.element = t
        }

        var t, n, s;
        return t = e, (n = [{
            key: "render", value: function (e) {
                console.log("RENDER MAIN PAGE DATA, dat", e), e && e.letterList && e.folderList && e.letter ? (this.element.innerHTML = "", oe.render(e.navbar), this.element.appendChild(document.createTextNode("SUUUUUKA"))) : T.emit(u.needData)
            }
        }]) && we(t.prototype, n), s && we(t, s), e
    }();

    function ye(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var Te = function () {
        function e(t) {
            var n = this;
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.mainPageView = t, this.data = {}, T.on(p.getLetter.success, (function (e) {
                n.data.letter = e, n._allDataIsReady()
            })), T.on(p.getLetterList.success, (function (e) {
                n.data.letterList = e, n._allDataIsReady()
            })), T.on(p.getFolderList.success, (function (e) {
                n.data.folderList = e, n._allDataIsReady()
            })), T.on(u.needData, (function () {
                var e = !0;
                n.data || (console.log("WTF"), e = !1), n.data.letterList || (T.emit(l.needGetLetterList), e = !1), n.data.letter || (e = !1, T.emit(l.needGetLetter)), n.data.folderList || (e = !1, T.emit(l.needGetFolderList)), e && n._allDataIsReady()
            }))
        }

        var t, n, s;
        return t = e, (n = [{
            key: "_allDataIsReady", value: function () {
                this.data.letter && this.data.folderList && this.data.letterList && (console.log("ALL DATA IS READY"), this.mainPageView.render(this.data))
            }
        }]) && ye(t.prototype, n), s && ye(t, s), e
    }();

    function Pe(e) {
        return (Pe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function Ce(e, t, n, s) {
        if (!1 === t || null == t || !t && ("class" === e || "style" === e)) return "";
        if (!0 === t) return " " + (s ? e : e + '="' + e + '"');
        var a = Pe(t);
        return "object" !== a && "function" !== a || "function" != typeof t.toJSON || (t = t.toJSON()), "string" == typeof t || (t = JSON.stringify(t), n || -1 === t.indexOf('"')) ? (n && (t = Ve(t)), " " + e + '="' + t + '"') : " " + e + "='" + t.replace(/'/g, "&#39;") + "'"
    }

    function Be(e, t) {
        return Array.isArray(e) ? function (e, t) {
            for (var n, s = "", a = "", r = Array.isArray(t), o = 0; o < e.length; o++) (n = Be(e[o])) && (r && t[o] && (n = Ve(n)), s = s + a + n, a = " ");
            return s
        }(e, t) : e && "object" == Pe(e) ? function (e) {
            var t = "", n = "";
            for (var s in e) s && e[s] && Se.call(e, s) && (t = t + n + s, n = " ");
            return t
        }(e) : e || ""
    }

    function Ve(e) {
        var t = "" + e, n = xe.exec(t);
        if (!n) return e;
        var s, a, r, o = "";
        for (s = n.index, a = 0; s < t.length; s++) {
            switch (t.charCodeAt(s)) {
                case 34:
                    r = "&quot;";
                    break;
                case 38:
                    r = "&amp;";
                    break;
                case 60:
                    r = "&lt;";
                    break;
                case 62:
                    r = "&gt;";
                    break;
                default:
                    continue
            }
            a !== s && (o += t.substring(a, s)), a = s + 1, o += r
        }
        return a !== s ? o + t.substring(a, s) : o
    }

    var Se = Object.prototype.hasOwnProperty, xe = /["&<>]/;

    function Ee(e) {
        var t, s, a, r = "", o = {};
        try {
            var i = {
                ".//src/Views/PugTemplates/SendLetterForm.pug": "include BaseComponents/classNames\ninclude BaseComponents/pageTitle\ninclude  BaseComponents/button\n\n+pageTitle('Отправить письмо')\n\nform(method='POST', name='sendLetterForm' class=classNames.formClass)\n    p(class='InputTitle') Получатель\n    input(type='text', name='to', class=classNames.inputClass)\n    p(class='InputTitle') Тема\n    input(type='text', name='theme', class=classNames.inputClass)\n    p(class='InputTitle') Текст\n    input(type='text', name='text', class=classNames.inputClass)\n    input(type='submit', value='Отправить письмо', class='submit', class=classNames.inputClass)\n    +button('Назад', 'back', classNames.regButton)\n\n//export { template };",
                "src/Views/PugTemplates/BaseComponents/classNames.pug": "- var classNames ={inputClass:'login-reg-input',formClass:'login-form',regButton:'reg-button',loginButton:'login-button', sendLetterButton:'send-button'}",
                "src/Views/PugTemplates/BaseComponents/pageTitle.pug": "mixin pageTitle(text, className)\n    h1(class=className) #{text}",
                "src/Views/PugTemplates/BaseComponents/button.pug": "mixin button(text, name, className)\n    button(class=className, name=name) #{text}"
            };
            a = 1, s = "src/Views/PugTemplates/BaseComponents/classNames.pug";
            var u = {
                inputClass: "login-reg-input",
                formClass: "login-form",
                regButton: "reg-button",
                loginButton: "login-button",
                sendLetterButton: "send-button"
            };
            a = 1, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", o.pageTitle = t = function (e, n) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", r = r + "<h1" + Ce("class", Be([n], [!0]), !1, !1) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/pageTitle.pug", r = r + Ve(null == (t = e) ? "" : t) + "</h1>"
            }, a = 1, s = "src/Views/PugTemplates/BaseComponents/button.pug", o.button = t = function (e, n, o) {
                this && this.block, this && this.attributes;
                a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + "<button" + (Ce("class", Be([o], [!0]), !1, !1) + Ce("name", n, !0, !1)) + ">", a = 2, s = "src/Views/PugTemplates/BaseComponents/button.pug", r = r + Ve(null == (t = e) ? "" : t) + "</button>"
            }, a = 5, s = ".//src/Views/PugTemplates/SendLetterForm.pug", o.pageTitle("Отправить письмо"), a = 7, s = ".//src/Views/PugTemplates/SendLetterForm.pug", r = r + "<form" + Ce("class", Be([u.formClass], [!0]), !1, !1) + ' method="POST" name="sendLetterForm">', a = 8, s = ".//src/Views/PugTemplates/SendLetterForm.pug", r += '<p class="InputTitle">', a = 8, s = ".//src/Views/PugTemplates/SendLetterForm.pug", a = 9, s = ".//src/Views/PugTemplates/SendLetterForm.pug", r = (r += "Получатель</p>") + "<input" + Ce("class", Be([u.inputClass], [!0]), !1, !1) + ' type="text" name="to"/>', a = 10, s = ".//src/Views/PugTemplates/SendLetterForm.pug", r += '<p class="InputTitle">', a = 10, s = ".//src/Views/PugTemplates/SendLetterForm.pug", a = 11, s = ".//src/Views/PugTemplates/SendLetterForm.pug", r = (r += "Тема</p>") + "<input" + Ce("class", Be([u.inputClass], [!0]), !1, !1) + ' type="text" name="theme"/>', a = 12, s = ".//src/Views/PugTemplates/SendLetterForm.pug", r += '<p class="InputTitle">', a = 12, s = ".//src/Views/PugTemplates/SendLetterForm.pug", a = 13, s = ".//src/Views/PugTemplates/SendLetterForm.pug", r = (r += "Текст</p>") + "<input" + Ce("class", Be([u.inputClass], [!0]), !1, !1) + ' type="text" name="text"/>', a = 14, s = ".//src/Views/PugTemplates/SendLetterForm.pug", r = r + "<input" + Ce("class", Be(["submit", u.inputClass], [!1, !0]), !1, !1) + ' type="submit" value="Отправить письмо"/>', a = 15, s = ".//src/Views/PugTemplates/SendLetterForm.pug", o.button("Назад", "back", u.regButton), r += "</form>", a = 17, s = ".//src/Views/PugTemplates/SendLetterForm.pug", r += "\x3c!--export { template };--\x3e"
        } catch (e) {
            !function e(t, s, a, r) {
                if (!(t instanceof Error)) throw t;
                if (!("undefined" == typeof window && s || r)) throw t.message += " on line " + a, t;
                try {
                    r = r || n(!function () {
                        var e = new Error("Cannot find module 'fs'");
                        throw e.code = "MODULE_NOT_FOUND", e
                    }()).readFileSync(s, "utf8")
                } catch (s) {
                    e(t, null, a)
                }
                var o = 3, i = r.split("\n"), u = Math.max(a - o, 0), l = Math.min(i.length, a + o);
                throw o = i.slice(u, l).map((function (e, t) {
                    var n = t + u + 1;
                    return (n == a ? "  > " : "    ") + n + "| " + e
                })).join("\n"), t.path = s, t.message = (s || "Pug") + ":" + a + "\n" + o + "\n\n" + t.message, t
            }(e, s, a, i[s])
        }
        return r
    }

    function Ne(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
        }
    }

    var ke = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.element = t
            }

            var t, n, s;
            return t = e, (n = [{
                key: "render", value: function (e) {
                    e = e || {}, console.log("SEND LETTER VIEW RENDER"), this.element.innerHTML = "", oe.render(e.navbar), this.element.innerHTML += Ee();
                    var t = document.getElementsByName("sendLetterForm")[0];
                    t.addEventListener("submit", (function (e) {
                        e.preventDefault(), T.emit(c.sendLetter, {data: new FormData(t)})
                    }))
                }
            }]) && Ne(t.prototype, n), s && Ne(t, s), e
        }(), Le = new C, Ae = new A(document.body), Oe = new R(document.body), Fe = new ue(document.body),
        Ue = new be(document.body), Ie = new ve(document.body), De = new ke(document.body),
        Me = new q("http://localhost:8080");
    new z("http://localhost:8080"), new function e(t, n) {
        !function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, e), this.view = t, this.model = n, T.on(m.profileEdit.success, (function (e) {
            console.log({path: d, data: e}), T.emit(s.redirect, {path: d, data: e})
        }))
    }(Ae, Me), new function e(t, n) {
        !function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, e), this.signInView = t, this.model = n, T.on(m.signUp.success, (function (e) {
            console.log({path: d, data: e}), T.emit(s.redirect, {path: b, data: e})
        }))
    }(Oe, Me), new function e(t, n) {
        !function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, e), this.view = t, this.model = n, T.on(m.profileEdit.success, (function (e) {
            console.log({path: d, data: e}), T.emit(s.redirect, {path: d, data: e})
        }))
    }(Ue, Me), new Te(Ie);
    Le.register(g, Ae), Le.register(f, Oe), Le.register(d, Fe), Le.register(h, Ue), Le.register(b, Ie), Le.register(w, De), console.log(location.pathname);
    try {
        Le.start(location.pathname)
    } catch (e) {
        console.log("CAtch pATH", e), Le.start(g)
    }
}]);