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
            "mainPage.pug": "include BaseComponents\u002FLetterList\ninclude BaseComponents\u002FFolderList\ninclude BaseComponents\u002FLetter\n\ndiv(class='folders')\n    +folders(locals.folderList)\n\ndiv(class='letterList')\n    +LetterList(locals.letterList)\n\ndiv(class='letter')\n    +Letter(locals.letter)\n\n\u002F\u002Fexport {template}",
            "BaseComponents\u002FLetterList.pug": "include LetterPreview\nmixin LetterList(letters)\n    ul\n    each letter in letters\n        li\n            div(id=letter.id)\n                p() #{letter.sender}\n                p() #{letter.dateTime}\n                p() #{letter.theme}\n\n",
            "BaseComponents\u002FLetterPreview.pug": "mixin LetterPreview(letter)\n    div(id=letter.id)\n        p() #{letter.sender}\n        p() #{letter.dateTime}\n        p() #{letter.theme}\n",
            "BaseComponents\u002FFolderList.pug": "include button\nmixin folders(data)\n    ul() Почтовый ящик\n        li()\n            +button('Входящие', 'got', '')\n        li()\n            +button('Отправленные', 'sended', '')\n\u002F\u002Fexport { template };\n",
            "BaseComponents\u002Fbutton.pug": "mixin button(text, name, className)\n    button(class=className, name=name) #{text}",
            "BaseComponents\u002FLetter.pug": "mixin Letter(letter)\n    div(id=letter.id)\n        p() #{letter.sender}\n        p() #{letter.dateTime}\n        p() #{letter.theme}\n        p() #{letter.text}"
        };
        ;pug_debug_line = 1;
        pug_debug_filename = "BaseComponents\u002FLetterPreview.pug";


        ;pug_debug_line = 2;
        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
        pug_mixins["LetterList"] = pug_interp = function (letters) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            ;pug_debug_line = 3;
            pug_debug_filename = "BaseComponents\u002FLetterList.pug";
            pug_html = pug_html + "\u003Cul\u003E\u003C\u002Ful\u003E";
            ;pug_debug_line = 4;
            pug_debug_filename = "BaseComponents\u002FLetterList.pug";
// iterate letters
            ;(function () {
                var $$obj = letters;
                if ('number' == typeof $$obj.length) {
                    for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
                        var letter = $$obj[pug_index0];
                        ;pug_debug_line = 5;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + "\u003Cli\u003E";
                        ;pug_debug_line = 6;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + "\u003Cdiv" + (pug_attr("id", letter.id, true, false)) + "\u003E";
                        ;pug_debug_line = 7;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + "\u003Cp\u003E";
                        ;pug_debug_line = 7;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + (pug_escape(null == (pug_interp = letter.sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
                        ;pug_debug_line = 8;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + "\u003Cp\u003E";
                        ;pug_debug_line = 8;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + (pug_escape(null == (pug_interp = letter.dateTime) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
                        ;pug_debug_line = 9;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + "\u003Cp\u003E";
                        ;pug_debug_line = 9;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + (pug_escape(null == (pug_interp = letter.theme) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
                    }
                } else {
                    var $$l = 0;
                    for (var pug_index0 in $$obj) {
                        $$l++;
                        var letter = $$obj[pug_index0];
                        ;pug_debug_line = 5;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + "\u003Cli\u003E";
                        ;pug_debug_line = 6;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + "\u003Cdiv" + (pug_attr("id", letter.id, true, false)) + "\u003E";
                        ;pug_debug_line = 7;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + "\u003Cp\u003E";
                        ;pug_debug_line = 7;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + (pug_escape(null == (pug_interp = letter.sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
                        ;pug_debug_line = 8;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + "\u003Cp\u003E";
                        ;pug_debug_line = 8;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + (pug_escape(null == (pug_interp = letter.dateTime) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
                        ;pug_debug_line = 9;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + "\u003Cp\u003E";
                        ;pug_debug_line = 9;
                        pug_debug_filename = "BaseComponents\u002FLetterList.pug";
                        pug_html = pug_html + (pug_escape(null == (pug_interp = letter.theme) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
                    }
                }
            }).call(this);

        };
        ;pug_debug_line = 1;
        pug_debug_filename = "BaseComponents\u002Fbutton.pug";
        pug_mixins["button"] = pug_interp = function (text, name, className) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            ;pug_debug_line = 2;
            pug_debug_filename = "BaseComponents\u002Fbutton.pug";
            pug_html = pug_html + "\u003Cbutton" + (pug_attr("class", pug_classes([className], [true]), false, false) + pug_attr("name", name, true, false)) + "\u003E";
            ;pug_debug_line = 2;
            pug_debug_filename = "BaseComponents\u002Fbutton.pug";
            pug_html = pug_html + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
        };
        ;pug_debug_line = 2;
        pug_debug_filename = "BaseComponents\u002FFolderList.pug";
        pug_mixins["folders"] = pug_interp = function (data) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            ;pug_debug_line = 3;
            pug_debug_filename = "BaseComponents\u002FFolderList.pug";
            pug_html = pug_html + "\u003Cul\u003E";
            ;pug_debug_line = 3;
            pug_debug_filename = "BaseComponents\u002FFolderList.pug";
            pug_html = pug_html + "Почтовый ящик";
            ;pug_debug_line = 4;
            pug_debug_filename = "BaseComponents\u002FFolderList.pug";
            pug_html = pug_html + "\u003Cli\u003E";
            ;pug_debug_line = 5;
            pug_debug_filename = "BaseComponents\u002FFolderList.pug";
            pug_mixins["button"]('Входящие', 'got', '');
            pug_html = pug_html + "\u003C\u002Fli\u003E";
            ;pug_debug_line = 6;
            pug_debug_filename = "BaseComponents\u002FFolderList.pug";
            pug_html = pug_html + "\u003Cli\u003E";
            ;pug_debug_line = 7;
            pug_debug_filename = "BaseComponents\u002FFolderList.pug";
            pug_mixins["button"]('Отправленные', 'sended', '');
            pug_html = pug_html + "\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
        };
        ;pug_debug_line = 8;
        pug_debug_filename = "BaseComponents\u002FFolderList.pug";
        pug_html = pug_html + "\u003C!--export { template };--\u003E";
        ;pug_debug_line = 1;
        pug_debug_filename = "BaseComponents\u002FLetter.pug";
        pug_mixins["Letter"] = pug_interp = function (letter) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            ;pug_debug_line = 2;
            pug_debug_filename = "BaseComponents\u002FLetter.pug";
            pug_html = pug_html + "\u003Cdiv" + (pug_attr("id", letter.id, true, false)) + "\u003E";
            ;pug_debug_line = 3;
            pug_debug_filename = "BaseComponents\u002FLetter.pug";
            pug_html = pug_html + "\u003Cp\u003E";
            ;pug_debug_line = 3;
            pug_debug_filename = "BaseComponents\u002FLetter.pug";
            pug_html = pug_html + (pug_escape(null == (pug_interp = letter.sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
            ;pug_debug_line = 4;
            pug_debug_filename = "BaseComponents\u002FLetter.pug";
            pug_html = pug_html + "\u003Cp\u003E";
            ;pug_debug_line = 4;
            pug_debug_filename = "BaseComponents\u002FLetter.pug";
            pug_html = pug_html + (pug_escape(null == (pug_interp = letter.dateTime) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
            ;pug_debug_line = 5;
            pug_debug_filename = "BaseComponents\u002FLetter.pug";
            pug_html = pug_html + "\u003Cp\u003E";
            ;pug_debug_line = 5;
            pug_debug_filename = "BaseComponents\u002FLetter.pug";
            pug_html = pug_html + (pug_escape(null == (pug_interp = letter.theme) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
            ;pug_debug_line = 6;
            pug_debug_filename = "BaseComponents\u002FLetter.pug";
            pug_html = pug_html + "\u003Cp\u003E";
            ;pug_debug_line = 6;
            pug_debug_filename = "BaseComponents\u002FLetter.pug";
            pug_html = pug_html + (pug_escape(null == (pug_interp = letter.text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
        };
        ;pug_debug_line = 5;
        pug_debug_filename = "mainPage.pug";
        pug_html = pug_html + "\u003Cdiv class=\"folders\"\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = "mainPage.pug";
        pug_mixins["folders"](locals.folderList);
        pug_html = pug_html + "\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 8;
        pug_debug_filename = "mainPage.pug";
        pug_html = pug_html + "\u003Cdiv class=\"letterList\"\u003E";
        ;pug_debug_line = 9;
        pug_debug_filename = "mainPage.pug";
        pug_mixins["LetterList"](locals.letterList);
        pug_html = pug_html + "\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 11;
        pug_debug_filename = "mainPage.pug";
        pug_html = pug_html + "\u003Cdiv class=\"letter\"\u003E";
        ;pug_debug_line = 12;
        pug_debug_filename = "mainPage.pug";
        pug_mixins["Letter"](locals.letter);
        pug_html = pug_html + "\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 14;
        pug_debug_filename = "mainPage.pug";
        pug_html = pug_html + "\u003C!--export {template}--\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}

export {template}