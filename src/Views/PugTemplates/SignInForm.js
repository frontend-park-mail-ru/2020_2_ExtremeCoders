function pug_attr(t, e, n, r) {
    if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
    if (!0 === e) return " " + (r ? t : t + '="' + t + '"');
    var f = typeof e;
    return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'"
}

function pug_escape(e) {
    var a = "" + e, t = pug_match_html.exec(a);
    if (!t) return e;
    var r, c, n, s = "";
    for (r = t.index, c = 0; r < a.length; r++) {
        switch (a.charCodeAt(r)) {
            case 34:
                n = "&quot;";
                break;
            case 38:
                n = "&amp;";
                break;
            case 60:
                n = "&lt;";
                break;
            case 62:
                n = "&gt;";
                break;
            default:
                continue
        }
        c !== r && (s += a.substring(c, r)), c = r + 1, s += n
    }
    return c !== r ? s + a.substring(c, r) : s
}

var pug_match_html = /["&<>]/;

function pug_rethrow(n, e, r, t) {
    if (!(n instanceof Error)) throw n;
    if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;
    try {
        t = t || require("fs").readFileSync(e, "utf8")
    } catch (e) {
        pug_rethrow(n, null, r)
    }
    var i = 3, a = t.split("\n"), o = Math.max(r - i, 0), h = Math.min(a.length, r + i),
        i = a.slice(o, h).map(function (n, e) {
            var t = e + o + 1;
            return (t == r ? "  > " : "    ") + t + "| " + n
        }).join("\n");
    throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n
}

function template(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    var pug_debug_filename, pug_debug_line;
    try {
        var pug_debug_sources = {"SignInForm.pug": "\u002F\u002Finclude  BaseComponents\u002Fbutton\n\u002F\u002Finclude BaseComponents\u002FpageTitle\n\u002F\u002Finclude BaseComponents\u002FText\n\u002F\u002Finclude BaseComponents\u002Favatar\n\u002F\u002Finclude BaseComponents\u002FclassNames\n\u002F\u002F\n\u002F\u002F+pageTitle('Войти')\n\u002F\u002Fform(method='POST' class=classNames.formClass)\n\u002F\u002F    +text('Login')\n\u002F\u002F    input(type='text', name='email', class=classNames.inputClass)\n\u002F\u002F    +text('Password')\n\u002F\u002F    input(type='password', name='password', class=classNames.inputClass)\n\u002F\u002F    input(type='submit', value='Войти', class=classNames.inputClass)\n\u002F\u002F    +button('Регистрация','signup', classNames.loginButton)\n\u002F\u002F    +button('Назад','back', classNames.regButton)\n\n\u002F\u002Fexport {signinformTemplate}\n\ndiv(class=\"SignInPage\")\n    form(class=\"SignInForm\")\n        label(class=\"label-form\") Вход\n        div(class=\"group\")\n            input(class=\"Input\" type=\"text\" name='email' required)\n            span(class=\"bar\")\n            label(class=\"label-input\") Email\n\n        div(class=\"group\")\n            input(class=\"Input\" type=\"text\" name='password' required)\n            span(class=\"bar\")\n            label(class=\"label-input\") Password\n        div(class=\"row__item buttons-SignInForm AcceptBackButtonForm\")\n            button(class=\"Button Button-state-passive\" name=\"signup\") Зарегистрироваться\n            button(class=\"Button Button-state-accept\" name=\"submit\") Войти\n\n\u002F\u002Fexport {template}"};
        ;pug_debug_line = 1;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--include  BaseComponents\u002Fbutton--\u003E";
        ;pug_debug_line = 2;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002FpageTitle--\u003E";
        ;pug_debug_line = 3;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002FText--\u003E";
        ;pug_debug_line = 4;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002Favatar--\u003E";
        ;pug_debug_line = 5;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002FclassNames--\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!----\u003E";
        ;pug_debug_line = 7;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--+pageTitle('Войти')--\u003E";
        ;pug_debug_line = 8;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--form(method='POST' class=classNames.formClass)--\u003E";
        ;pug_debug_line = 9;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--    +text('Login')--\u003E";
        ;pug_debug_line = 10;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='text', name='email', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 11;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--    +text('Password')--\u003E";
        ;pug_debug_line = 12;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='password', name='password', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 13;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='submit', value='Войти', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 14;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--    +button('Регистрация','signup', classNames.loginButton)--\u003E";
        ;pug_debug_line = 15;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--    +button('Назад','back', classNames.regButton)--\u003E";
        ;pug_debug_line = 17;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--export {signinformTemplate}--\u003E";
        ;pug_debug_line = 19;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"SignInPage\"\u003E";
        ;pug_debug_line = 20;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cform class=\"SignInForm\"\u003E";
        ;pug_debug_line = 21;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-form\"\u003E";
        ;pug_debug_line = 21;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "Вход\u003C\u002Flabel\u003E";
        ;pug_debug_line = 22;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"group\"\u003E";
        ;pug_debug_line = 23;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cinput" + (" class=\"Input\"" + " type=\"text\" name=\"email\"" + pug_attr("required", true, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 24;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"bar\"\u003E\u003C\u002Fspan\u003E";
        ;pug_debug_line = 25;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-input\"\u003E";
        ;pug_debug_line = 25;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "Email\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 27;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"group\"\u003E";
        ;pug_debug_line = 28;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cinput" + (" class=\"Input\"" + " type=\"text\" name=\"password\"" + pug_attr("required", true, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 29;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"bar\"\u003E\u003C\u002Fspan\u003E";
        ;pug_debug_line = 30;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-input\"\u003E";
        ;pug_debug_line = 30;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "Password\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 31;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"row__item buttons-SignInForm AcceptBackButtonForm\"\u003E";
        ;pug_debug_line = 32;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button Button-state-passive\" name=\"signup\"\u003E";
        ;pug_debug_line = 32;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "Зарегистрироваться\u003C\u002Fbutton\u003E";
        ;pug_debug_line = 33;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button Button-state-accept\" name=\"submit\"\u003E";
        ;pug_debug_line = 33;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "Войти\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 35;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--export {template}--\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}

export {template}