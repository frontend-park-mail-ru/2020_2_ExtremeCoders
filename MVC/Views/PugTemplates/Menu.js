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

function menuTemplate(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    var pug_debug_filename, pug_debug_line;
    try {
        var pug_debug_sources = {
            "Menu.pug": "include  BaseComponents\u002Fbutton\ninclude BaseComponents\u002FpageTitle\n+pageTitle('Меню')\n+button('Войти','signin')\n+button('Регистрация', 'signup')\n+button('Профиль', 'profile')\n\n\u002F\u002Fexport {template}Регистрация",
            "BaseComponents\u002Fbutton.pug": "mixin button(text, name)\n    button(class='', name=name) #{text}",
            "BaseComponents\u002FpageTitle.pug": "mixin pageTitle(text)\n    h1(class='') #{text}"
        };
        ;pug_debug_line = 1;
        pug_debug_filename = "BaseComponents\u002Fbutton.pug";
        pug_mixins["button"] = pug_interp = function (text, name) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            ;pug_debug_line = 2;
            pug_debug_filename = "BaseComponents\u002Fbutton.pug";
            pug_html = pug_html + "\u003Cbutton" + ("" + pug_attr("name", name, true, false)) + "\u003E";
            ;pug_debug_line = 2;
            pug_debug_filename = "BaseComponents\u002Fbutton.pug";
            pug_html = pug_html + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
        };
        ;pug_debug_line = 1;
        pug_debug_filename = "BaseComponents\u002FpageTitle.pug";
        pug_mixins["pageTitle"] = pug_interp = function (text) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            ;pug_debug_line = 2;
            pug_debug_filename = "BaseComponents\u002FpageTitle.pug";
            pug_html = pug_html + "\u003Ch1\u003E";
            ;pug_debug_line = 2;
            pug_debug_filename = "BaseComponents\u002FpageTitle.pug";
            pug_html = pug_html + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
        };
        ;pug_debug_line = 3;
        pug_debug_filename = "Menu.pug";
        pug_mixins["pageTitle"]('Меню');
        ;pug_debug_line = 4;
        pug_debug_filename = "Menu.pug";
        pug_mixins["button"]('Войти', 'signin');
        ;pug_debug_line = 5;
        pug_debug_filename = "Menu.pug";
        pug_mixins["button"]('Регистрация', 'signup');
        ;pug_debug_line = 6;
        pug_debug_filename = "Menu.pug";
        pug_mixins["button"]('Профиль', 'profile');
        ;pug_debug_line = 8;
        pug_debug_filename = "Menu.pug";
        pug_html = pug_html + "\u003C!--export {template}Регистрация--\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}

export {menuTemplate}