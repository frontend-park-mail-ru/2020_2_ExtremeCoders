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
            ".\u002F\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfilePage.pug": "include  BaseComponents\u002Fbutton\ninclude BaseComponents\u002FpageTitle\ninclude BaseComponents\u002FText\ninclude BaseComponents\u002Favatar\ninclude BaseComponents\u002FclassNames\n\n+pageTitle('Профиль')\n\ndiv\n    +text(locals.name + ' ' + locals.surname, 'profile_name')\n    +text('Email: ' + locals.email)\n    +text('Аватар')\n    +avatar(locals.avatar)\n    +button('Редактировать', 'editButton')\n    +button('Назад' ,name='back')\n\n\n\u002F\u002Fexport {template}",
            "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002Fbutton.pug": "mixin button(text, name, className)\n    button(class=className, name=name) #{text}",
            "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002FpageTitle.pug": "mixin pageTitle(text, className)\n    h1(class=className) #{text}",
            "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002FText.pug": "mixin text(text, name)\n    p(class='MainTitle', name=name) #{text}",
            "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002Favatar.pug": "mixin avatar(src)\n    img(width=70, height=70, id='avatar', src=src)",
            "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002FclassNames.pug": "- var classNames ={inputClass:'login-reg-input',formClass:'login-form',regButton:'reg-button',loginButton:'login-button', sendLetterButton:'send-button'}"
        };
        ;var locals_for_with = (locals || {});
        (function (name) {
            ;pug_debug_line = 1;
            pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002Fbutton.pug";
            pug_mixins["button"] = pug_interp = function (text, name, className) {
                var block = (this && this.block), attributes = (this && this.attributes) || {};
                ;pug_debug_line = 2;
                pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002Fbutton.pug";
                pug_html = pug_html + "\u003Cbutton" + (pug_attr("class", pug_classes([className], [true]), false, false) + pug_attr("name", name, true, false)) + "\u003E";
                ;pug_debug_line = 2;
                pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002Fbutton.pug";
                pug_html = pug_html + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
            };
            ;pug_debug_line = 1;
            pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002FpageTitle.pug";
            pug_mixins["pageTitle"] = pug_interp = function (text, className) {
                var block = (this && this.block), attributes = (this && this.attributes) || {};
                ;pug_debug_line = 2;
                pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002FpageTitle.pug";
                pug_html = pug_html + "\u003Ch1" + (pug_attr("class", pug_classes([className], [true]), false, false)) + "\u003E";
                ;pug_debug_line = 2;
                pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002FpageTitle.pug";
                pug_html = pug_html + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
            };
            ;pug_debug_line = 1;
            pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002FText.pug";
            pug_mixins["text"] = pug_interp = function (text, name) {
                var block = (this && this.block), attributes = (this && this.attributes) || {};
                ;pug_debug_line = 2;
                pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002FText.pug";
                pug_html = pug_html + "\u003Cp" + (" class=\"MainTitle\"" + pug_attr("name", name, true, false)) + "\u003E";
                ;pug_debug_line = 2;
                pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002FText.pug";
                pug_html = pug_html + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
            };
            ;pug_debug_line = 1;
            pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002Favatar.pug";
            pug_mixins["avatar"] = pug_interp = function (src) {
                var block = (this && this.block), attributes = (this && this.attributes) || {};
                ;pug_debug_line = 2;
                pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002Favatar.pug";
                pug_html = pug_html + "\u003Cimg" + (" width=\"70\" height=\"70\" id=\"avatar\"" + pug_attr("src", src, true, false)) + "\u002F\u003E";
            };
            ;pug_debug_line = 1;
            pug_debug_filename = "src\u002FViews\u002FPugTemplates\u002FBaseComponents\u002FclassNames.pug";
            var classNames = {
                    inputClass: 'login-reg-input',
                    formClass: 'login-form',
                    regButton: 'reg-button',
                    loginButton: 'login-button',
                    sendLetterButton: 'send-button'
                }
            ;pug_debug_line = 7;
            pug_debug_filename = ".\u002F\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfilePage.pug";
            pug_mixins["pageTitle"]('Профиль');
            ;pug_debug_line = 9;
            pug_debug_filename = ".\u002F\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfilePage.pug";
            pug_html = pug_html + "\u003Cdiv\u003E";
            ;pug_debug_line = 10;
            pug_debug_filename = ".\u002F\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfilePage.pug";
            pug_mixins["text"](locals.name + ' ' + locals.surname, 'profile_name');
            ;pug_debug_line = 11;
            pug_debug_filename = ".\u002F\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfilePage.pug";
            pug_mixins["text"]('Email: ' + locals.email);
            ;pug_debug_line = 12;
            pug_debug_filename = ".\u002F\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfilePage.pug";
            pug_mixins["text"]('Аватар');
            ;pug_debug_line = 13;
            pug_debug_filename = ".\u002F\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfilePage.pug";
            pug_mixins["avatar"](locals.avatar);
            ;pug_debug_line = 14;
            pug_debug_filename = ".\u002F\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfilePage.pug";
            pug_mixins["button"]('Редактировать', 'editButton');
            ;pug_debug_line = 15;
            pug_debug_filename = ".\u002F\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfilePage.pug";
            pug_mixins["button"]('Назад', name = 'back');
            pug_html = pug_html + "\u003C\u002Fdiv\u003E";
            ;pug_debug_line = 18;
            pug_debug_filename = ".\u002F\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfilePage.pug";
            pug_html = pug_html + "\u003C!--export {template}--\u003E";
        }.call(this, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined));
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}
export {template};