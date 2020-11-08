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
        var pug_debug_sources = {"ProfilePage.pug": "\u002F\u002Finclude  BaseComponents\u002Fbutton\n\u002F\u002Finclude BaseComponents\u002FpageTitle\n\u002F\u002Finclude BaseComponents\u002FText\n\u002F\u002Finclude BaseComponents\u002Favatar\n\u002F\u002Finclude BaseComponents\u002FclassNames\n\u002F\u002F\n\u002F\u002F+pageTitle('Профиль')\n\u002F\u002F\n\u002F\u002F\u002F\u002Fdiv\n\u002F\u002F\u002F\u002F    +text(locals.name + ' ' + locals.surname, 'profile_name')\n\u002F\u002F\u002F\u002F    +text('Email: ' + locals.email)\n\u002F\u002F\u002F\u002F    +text('Аватар')\n\u002F\u002F\u002F\u002F    +avatar(locals.avatar)\n\u002F\u002F\u002F\u002F    +button('Редактировать', name = 'editButton')\n\u002F\u002F\u002F\u002F    +button('Назад' ,name='back')\n\ndiv(class=\"Page-profile\")\n    form(class=\"form-profile-view \")\n        img(src=locals.avatar class=\"img-Profile\")\n        h3(class=\"row__item nameTitle-Profile\") Имя\n        h3(class=\"row__item name-Profile\") #{locals.name}\n        h3(class=\"row__item surnameTitle-Profile\") Фамилия\n        h3(class=\"row__item surname-Profile\") #{locals.surname}\n        h3(class=\"row__item emailTitle-Profile\") Email\n        h3(class=\"row__item email-Profile\") #{locals.email}\n        button(class=\"Button button-back Button-state-passive\" name=\"back\") Назад\n        button(class=\"Button button-edit Button-state-accept\" name=\"editButton\") Редактировать\n\n\u002F\u002Fexport {template}"};
        ;pug_debug_line = 1;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--include  BaseComponents\u002Fbutton--\u003E";
        ;pug_debug_line = 2;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002FpageTitle--\u003E";
        ;pug_debug_line = 3;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002FText--\u003E";
        ;pug_debug_line = 4;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002Favatar--\u003E";
        ;pug_debug_line = 5;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002FclassNames--\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!----\u003E";
        ;pug_debug_line = 7;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--+pageTitle('Профиль')--\u003E";
        ;pug_debug_line = 8;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!----\u003E";
        ;pug_debug_line = 9;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--\u002F\u002Fdiv--\u003E";
        ;pug_debug_line = 10;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--\u002F\u002F    +text(locals.name + ' ' + locals.surname, 'profile_name')--\u003E";
        ;pug_debug_line = 11;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--\u002F\u002F    +text('Email: ' + locals.email)--\u003E";
        ;pug_debug_line = 12;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--\u002F\u002F    +text('Аватар')--\u003E";
        ;pug_debug_line = 13;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--\u002F\u002F    +avatar(locals.avatar)--\u003E";
        ;pug_debug_line = 14;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--\u002F\u002F    +button('Редактировать', name = 'editButton')--\u003E";
        ;pug_debug_line = 15;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--\u002F\u002F    +button('Назад' ,name='back')--\u003E";
        ;pug_debug_line = 17;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003Cdiv class=\"Page-profile\"\u003E";
        ;pug_debug_line = 18;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003Cform class=\"form-profile-view \"\u003E";
        ;pug_debug_line = 19;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003Cimg" + (" class=\"img-Profile\"" + pug_attr("src", locals.avatar, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 20;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003Ch3 class=\"row__item nameTitle-Profile\"\u003E";
        ;pug_debug_line = 20;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "Имя\u003C\u002Fh3\u003E";
        ;pug_debug_line = 21;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003Ch3 class=\"row__item name-Profile\"\u003E";
        ;pug_debug_line = 21;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + (pug_escape(null == (pug_interp = locals.name) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
        ;pug_debug_line = 22;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003Ch3 class=\"row__item surnameTitle-Profile\"\u003E";
        ;pug_debug_line = 22;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "Фамилия\u003C\u002Fh3\u003E";
        ;pug_debug_line = 23;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003Ch3 class=\"row__item surname-Profile\"\u003E";
        ;pug_debug_line = 23;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + (pug_escape(null == (pug_interp = locals.surname) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
        ;pug_debug_line = 24;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003Ch3 class=\"row__item emailTitle-Profile\"\u003E";
        ;pug_debug_line = 24;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "Email\u003C\u002Fh3\u003E";
        ;pug_debug_line = 25;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003Ch3 class=\"row__item email-Profile\"\u003E";
        ;pug_debug_line = 25;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + (pug_escape(null == (pug_interp = locals.email) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
        ;pug_debug_line = 26;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button button-back Button-state-passive\" name=\"back\"\u003E";
        ;pug_debug_line = 26;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "Назад\u003C\u002Fbutton\u003E";
        ;pug_debug_line = 27;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button button-edit Button-state-accept\" name=\"editButton\"\u003E";
        ;pug_debug_line = 27;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "Редактировать\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 29;
        pug_debug_filename = "ProfilePage.pug";
        pug_html = pug_html + "\u003C!--export {template}--\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}

export {template}