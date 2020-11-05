function pug_attr(t, e, n, r) {
    if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
    if (!0 === e) return " " + (r ? t : t + '="' + t + '"');
    var f = typeof e;
    return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'"
}

function pug_classes(s, r) {
    return Array.isArray(s) ? pug_classes_array(s, r) : s && "object" == typeof s ? pug_classes_object(s) : s || ""
}

function pug_classes_array(r, a) {
    for (var s, e = "", u = "", c = Array.isArray(a), g = 0; g < r.length; g++) (s = pug_classes(r[g])) && (c && a[g] && (s = pug_escape(s)), e = e + u + s, u = " ");
    return e
}

function pug_classes_object(r) {
    var a = "", n = "";
    for (var o in r) o && r[o] && pug_has_own_property.call(r, o) && (a = a + n + o, n = " ");
    return a
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

var pug_has_own_property = Object.prototype.hasOwnProperty;
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
        var pug_debug_sources = {
            "navbar.pug": "include button\ninclude avatar\nmixin navbar(src)\n    ul()\n        li() LOGO\n        li()\n            a(name = 'navbar-send') 'Отправить'\n        li()\n            a(name = 'navbar-letters') 'Письма'\n        li()\n            +avatar(src)\n        li()\n            a(name = 'navbar-profile') 'Профиль'\n        li()\n            a(name = 'navbar-exit') 'Выйти'\n\n\n+navbar(locals.avatar)\n\u002F\u002Fexport {template}",
            "button.pug": "mixin button(text, name, className)\n    button(class=className, name=name) #{text}",
            "avatar.pug": "mixin avatar(src)\n    img(width=70, height=70, id='avatar', src=src)"
        };
        ;pug_debug_line = 1;
        pug_debug_filename = "button.pug";


        ;pug_debug_line = 1;
        pug_debug_filename = "avatar.pug";
        pug_mixins["avatar"] = pug_interp = function (src) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            ;pug_debug_line = 2;
            pug_debug_filename = "avatar.pug";
            pug_html = pug_html + "\u003Cimg" + (" width=\"70\" height=\"70\" id=\"avatar\"" + pug_attr("src", src, true, false)) + "\u002F\u003E";
        };
        ;pug_debug_line = 3;
        pug_debug_filename = "navbar.pug";
        pug_mixins["navbar"] = pug_interp = function (src) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            ;pug_debug_line = 4;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "\u003Cul\u003E";
            ;pug_debug_line = 5;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "\u003Cli\u003E";
            ;pug_debug_line = 5;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "LOGO\u003C\u002Fli\u003E";
            ;pug_debug_line = 6;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "\u003Cli\u003E";
            ;pug_debug_line = 7;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "\u003Ca name=\"navbar-send\"\u003E";
            ;pug_debug_line = 7;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "'Отправить'\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
            ;pug_debug_line = 8;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "\u003Cli\u003E";
            ;pug_debug_line = 9;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "\u003Ca name=\"navbar-letters\"\u003E";
            ;pug_debug_line = 9;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "'Письма'\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
            ;pug_debug_line = 10;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "\u003Cli\u003E";
            ;pug_debug_line = 11;
            pug_debug_filename = "navbar.pug";
            pug_mixins["avatar"](src);
            pug_html = pug_html + "\u003C\u002Fli\u003E";
            ;pug_debug_line = 12;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "\u003Cli\u003E";
            ;pug_debug_line = 13;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "\u003Ca name=\"navbar-profile\"\u003E";
            ;pug_debug_line = 13;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "'Профиль'\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
            ;pug_debug_line = 14;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "\u003Cli\u003E";
            ;pug_debug_line = 15;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "\u003Ca name=\"navbar-exit\"\u003E";
            ;pug_debug_line = 15;
            pug_debug_filename = "navbar.pug";
            pug_html = pug_html + "'Выйти'\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
        };
        ;pug_debug_line = 18;
        pug_debug_filename = "navbar.pug";
        pug_mixins["navbar"](locals.avatar);
        ;pug_debug_line = 19;
        pug_debug_filename = "navbar.pug";
        pug_html = pug_html + "\u003C!--export {template}--\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}

export {template}