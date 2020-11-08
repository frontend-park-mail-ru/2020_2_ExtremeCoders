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
        var pug_debug_sources = {"SignUpForm.pug": "\u002F\u002Finclude  BaseComponents\u002Fbutton\n\u002F\u002Finclude  BaseComponents\u002Fbutton\n\u002F\u002Finclude BaseComponents\u002FpageTitle\n\u002F\u002Finclude BaseComponents\u002FText\n\u002F\u002Finclude BaseComponents\u002Favatar\n\u002F\u002Finclude BaseComponents\u002FclassNames\n\u002F\u002F\n\u002F\u002F+pageTitle('Зарегистрироваться')\n\u002F\u002F\n\u002F\u002Fform(method='POST', enctype = 'multipart\u002Fform-data', class='reg-form')\n\u002F\u002F    p(class='InputTitle') Имя\n\u002F\u002F    input(type='text', name='name', class=classNames.inputClass)\n\u002F\u002F    p(class='InputTitle') Фамилия\n\u002F\u002F    input(type='text', name='surname', class=classNames.inputClass)\n\u002F\u002F    p(class='InputTitle') Email\n\u002F\u002F    input(type='text', name='email', class=classNames.inputClass)\n\u002F\u002F    p(class='InputTitle') Введите Пароль\n\u002F\u002F    input(type='password', name='password1', class=classNames.inputClass)\n\u002F\u002F    p(class='InputTitle') Повторите пароль\n\u002F\u002F    input(type='password', name='password2', class=classNames.inputClass)\n\u002F\u002F    p(class='InputTitle') Аватар\n\u002F\u002F    input(type='file', placeholder='Выберете аватар', name='avatar', class=classNames.inputClass)\n\u002F\u002F    input(type='submit', value='Зарегистироваться', class='submit', class=classNames.inputClass)\n\u002F\u002F    +button('Назад', 'back', classNames.regButton)\n\u002F\u002F\n\u002F\u002F\u002F\u002Fexport {template}\n\ndiv(class=\"SignUpPage\")\n    form(class=\"SignUpForm\")\n        label(class=\"label-form\") Регистрация\n\n        div(class=\"group\")\n            input(class=\"Input\" name='email' type=\"text\" required)\n            span(class=\"bar\")\n            label(class=\"label-input\") Email\n\n        div(class=\"group\")\n            input(class=\"Input\" name='password1' type=\"text\" required)\n            span(class=\"bar\")\n            label(class=\"label-input\") Пароль\n\n        div(class=\"group\")\n            input(class=\"Input\" name='password2' type=\"text\" required)\n            span(class=\"bar\")\n            label(class=\"label-input\") Повторите пароль\n\n        div(class=\"group\")\n            input(class=\"Input\" name='name' type=\"text\" required)\n            span(class=\"bar\")\n            label(class=\"label-input\") Имя\n\n        div(class=\"group\")\n            input(class=\"Input\" name='surname' type=\"text\" required)\n            span(class=\"bar\")\n            label(class=\"label-input\") Фамилия\n\n        div(class=\"input-file\")\n            div(class=\"form-group\")\n                input(type=\"file\" name=\"avatar\" id=\"file\" class=\"input-file\")\n                label(for=\"file\" class=\"btn btn-tertiary js-labelFile\")\n                span(class=\"js-fileName\") Загрузить аватар\n\n        div(class=\"row__item buttons-SignInForm AcceptBackButtonForm\")\n            button(class=\"Button Button-state-passive\" name=\"back\") Войти\n            button(class=\"Button Button-state-accept\" name=\"submit\") Зарегистрироваться\n\n\u002F\u002Fexport {template}\n"};
        ;pug_debug_line = 1;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--include  BaseComponents\u002Fbutton--\u003E";
        ;pug_debug_line = 2;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--include  BaseComponents\u002Fbutton--\u003E";
        ;pug_debug_line = 3;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002FpageTitle--\u003E";
        ;pug_debug_line = 4;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002FText--\u003E";
        ;pug_debug_line = 5;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002Favatar--\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002FclassNames--\u003E";
        ;pug_debug_line = 7;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!----\u003E";
        ;pug_debug_line = 8;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--+pageTitle('Зарегистрироваться')--\u003E";
        ;pug_debug_line = 9;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!----\u003E";
        ;pug_debug_line = 10;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--form(method='POST', enctype = 'multipart\u002Fform-data', class='reg-form')--\u003E";
        ;pug_debug_line = 11;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    p(class='InputTitle') Имя--\u003E";
        ;pug_debug_line = 12;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='text', name='name', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 13;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    p(class='InputTitle') Фамилия--\u003E";
        ;pug_debug_line = 14;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='text', name='surname', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 15;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    p(class='InputTitle') Email--\u003E";
        ;pug_debug_line = 16;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='text', name='email', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 17;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    p(class='InputTitle') Введите Пароль--\u003E";
        ;pug_debug_line = 18;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='password', name='password1', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 19;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    p(class='InputTitle') Повторите пароль--\u003E";
        ;pug_debug_line = 20;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='password', name='password2', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 21;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    p(class='InputTitle') Аватар--\u003E";
        ;pug_debug_line = 22;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='file', placeholder='Выберете аватар', name='avatar', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 23;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='submit', value='Зарегистироваться', class='submit', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 24;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--    +button('Назад', 'back', classNames.regButton)--\u003E";
        ;pug_debug_line = 25;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!----\u003E";
        ;pug_debug_line = 26;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--\u002F\u002Fexport {template}--\u003E";
        ;pug_debug_line = 28;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"SignUpPage\"\u003E";
        ;pug_debug_line = 29;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cform class=\"SignUpForm\"\u003E";
        ;pug_debug_line = 30;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-form\"\u003E";
        ;pug_debug_line = 30;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Регистрация\u003C\u002Flabel\u003E";
        ;pug_debug_line = 32;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"group\"\u003E";
        ;pug_debug_line = 33;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput" + (" class=\"Input\"" + " name=\"email\" type=\"text\"" + pug_attr("required", true, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 34;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"bar\"\u003E\u003C\u002Fspan\u003E";
        ;pug_debug_line = 35;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-input\"\u003E";
        ;pug_debug_line = 35;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Email\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 37;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"group\"\u003E";
        ;pug_debug_line = 38;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput" + (" class=\"Input\"" + " name=\"password1\" type=\"text\"" + pug_attr("required", true, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 39;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"bar\"\u003E\u003C\u002Fspan\u003E";
        ;pug_debug_line = 40;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-input\"\u003E";
        ;pug_debug_line = 40;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Пароль\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 42;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"group\"\u003E";
        ;pug_debug_line = 43;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput" + (" class=\"Input\"" + " name=\"password2\" type=\"text\"" + pug_attr("required", true, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 44;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"bar\"\u003E\u003C\u002Fspan\u003E";
        ;pug_debug_line = 45;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-input\"\u003E";
        ;pug_debug_line = 45;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Повторите пароль\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 47;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"group\"\u003E";
        ;pug_debug_line = 48;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput" + (" class=\"Input\"" + " name=\"name\" type=\"text\"" + pug_attr("required", true, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 49;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"bar\"\u003E\u003C\u002Fspan\u003E";
        ;pug_debug_line = 50;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-input\"\u003E";
        ;pug_debug_line = 50;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Имя\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 52;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"group\"\u003E";
        ;pug_debug_line = 53;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput" + (" class=\"Input\"" + " name=\"surname\" type=\"text\"" + pug_attr("required", true, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 54;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"bar\"\u003E\u003C\u002Fspan\u003E";
        ;pug_debug_line = 55;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-input\"\u003E";
        ;pug_debug_line = 55;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Фамилия\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 57;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"input-file\"\u003E";
        ;pug_debug_line = 58;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
        ;pug_debug_line = 59;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput class=\"input-file\" type=\"file\" name=\"avatar\" id=\"file\"\u002F\u003E";
        ;pug_debug_line = 60;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"btn btn-tertiary js-labelFile\" for=\"file\"\u003E\u003C\u002Flabel\u003E";
        ;pug_debug_line = 61;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"js-fileName\"\u003E";
        ;pug_debug_line = 61;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Загрузить аватар\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 63;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"row__item buttons-SignInForm AcceptBackButtonForm\"\u003E";
        ;pug_debug_line = 64;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button Button-state-passive\" name=\"back\"\u003E";
        ;pug_debug_line = 64;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Войти\u003C\u002Fbutton\u003E";
        ;pug_debug_line = 65;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button Button-state-accept\" name=\"submit\"\u003E";
        ;pug_debug_line = 65;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Зарегистрироваться\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 67;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--export {template}--\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}

export {template}