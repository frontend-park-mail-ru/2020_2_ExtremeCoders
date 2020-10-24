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
        var pug_debug_sources = {"SignInForm.pug": "h1 Войти\n\nform(method='POST')\n    h1 Login\n    input(type='text', name='email')\n    h1 Password\n    input(type='password', name='password')\n    input(type='submit', value='Войти', class='mp-form_button')\n    button(name='signup', class='mp-form_button') Регистрация\n    button(name='back', class='mp-form_button') Назад\n\n\u002F\u002Fexport {template}"};
        ;pug_debug_line = 1;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Ch1\u003E";
        ;pug_debug_line = 1;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "Войти\u003C\u002Fh1\u003E";
        ;pug_debug_line = 3;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cform method=\"POST\"\u003E";
        ;pug_debug_line = 4;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Ch1\u003E";
        ;pug_debug_line = 4;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "Login\u003C\u002Fh1\u003E";
        ;pug_debug_line = 5;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cinput type=\"text\" name=\"email\"\u002F\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Ch1\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "Password\u003C\u002Fh1\u003E";
        ;pug_debug_line = 7;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cinput type=\"password\" name=\"password\"\u002F\u003E";
        ;pug_debug_line = 8;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cinput class=\"mp-form_button\" type=\"submit\" value=\"Войти\"\u002F\u003E";
        ;pug_debug_line = 9;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cbutton class=\"mp-form_button\" name=\"signup\"\u003E";
        ;pug_debug_line = 9;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "Регистрация\u003C\u002Fbutton\u003E";
        ;pug_debug_line = 10;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003Cbutton class=\"mp-form_button\" name=\"back\"\u003E";
        ;pug_debug_line = 10;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "Назад\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E";
        ;pug_debug_line = 12;
        pug_debug_filename = "SignInForm.pug";
        pug_html = pug_html + "\u003C!--export {template}--\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}

export {template}