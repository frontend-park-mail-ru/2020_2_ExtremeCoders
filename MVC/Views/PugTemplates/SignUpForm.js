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
        var pug_debug_sources = {"SignUpForm.pug": "h1 Зарегистрироваться\n\nform(method='POST', enctype = 'multipart\u002Fform-data')\n    h1 Имя\n    input(type='text', name='name')\n    h1 Фамилия\n    input(type='text', name='surname')\n    h1 Email\n    input(type='text', name='email')\n    h1 Введите пароль\n    input(type='password', name='password1')\n    h1 Повторите пароль\n    input(type='password', name='password2')\n    h1 Аватар\n    input(type='file', placeholder='Выберете аватар', name='avatar')\n    input(type='submit', value='Зарегистироваться', class='submit')\n    button(name='back', class='mp-form_button') Назад\n\n\u002F\u002Fexport {template}"};
        ;pug_debug_line = 1;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Ch1\u003E";
        ;pug_debug_line = 1;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Зарегистрироваться\u003C\u002Fh1\u003E";
        ;pug_debug_line = 3;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cform method=\"POST\" enctype=\"multipart\u002Fform-data\"\u003E";
        ;pug_debug_line = 4;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Ch1\u003E";
        ;pug_debug_line = 4;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Имя\u003C\u002Fh1\u003E";
        ;pug_debug_line = 5;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput type=\"text\" name=\"name\"\u002F\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Ch1\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Фамилия\u003C\u002Fh1\u003E";
        ;pug_debug_line = 7;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput type=\"text\" name=\"surname\"\u002F\u003E";
        ;pug_debug_line = 8;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Ch1\u003E";
        ;pug_debug_line = 8;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Email\u003C\u002Fh1\u003E";
        ;pug_debug_line = 9;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput type=\"text\" name=\"email\"\u002F\u003E";
        ;pug_debug_line = 10;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Ch1\u003E";
        ;pug_debug_line = 10;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Введите пароль\u003C\u002Fh1\u003E";
        ;pug_debug_line = 11;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput type=\"password\" name=\"password1\"\u002F\u003E";
        ;pug_debug_line = 12;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Ch1\u003E";
        ;pug_debug_line = 12;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Повторите пароль\u003C\u002Fh1\u003E";
        ;pug_debug_line = 13;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput type=\"password\" name=\"password2\"\u002F\u003E";
        ;pug_debug_line = 14;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Ch1\u003E";
        ;pug_debug_line = 14;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Аватар\u003C\u002Fh1\u003E";
        ;pug_debug_line = 15;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput type=\"file\" placeholder=\"Выберете аватар\" name=\"avatar\"\u002F\u003E";
        ;pug_debug_line = 16;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cinput class=\"submit\" type=\"submit\" value=\"Зарегистироваться\"\u002F\u003E";
        ;pug_debug_line = 17;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003Cbutton class=\"mp-form_button\" name=\"back\"\u003E";
        ;pug_debug_line = 17;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "Назад\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E";
        ;pug_debug_line = 19;
        pug_debug_filename = "SignUpForm.pug";
        pug_html = pug_html + "\u003C!--export {template}--\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}

export {template}