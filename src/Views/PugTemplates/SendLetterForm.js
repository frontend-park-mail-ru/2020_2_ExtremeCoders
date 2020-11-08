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
        var pug_debug_sources = {"SendLetterForm.pug": "\u002F\u002Finclude BaseComponents\u002FclassNames\n\u002F\u002Finclude BaseComponents\u002FpageTitle\n\u002F\u002Finclude  BaseComponents\u002Fbutton\n\u002F\u002F\n\u002F\u002F+pageTitle('Отправить письмо')\n\u002F\u002F\n\u002F\u002Fform(method='POST', name='sendLetterForm' class=classNames.formClass)\n\u002F\u002F    p(class='InputTitle') Получатель\n\u002F\u002F    input(type='text', name='to', class=classNames.inputClass)\n\u002F\u002F    p(class='InputTitle') Тема\n\u002F\u002F    input(type='text', name='theme', class=classNames.inputClass)\n\u002F\u002F    p(class='InputTitle') Текст\n\u002F\u002F    input(type='text', name='text', class=classNames.inputClass)\n\u002F\u002F    input(type='submit', value='Отправить письмо', class='submit', class=classNames.inputClass)\n\u002F\u002F    +button('Назад', 'back', classNames.regButton)\n\u002F\u002F\n\u002F\u002F\u002F\u002Fexport { template };\n\ndiv(class=\"Page-WriteLetter\")\n\n    form(method='POST', name='sendLetterForm' class=\"Form-WriteLetter\")\n        div(class=\"group input-reciever-writeLetter\") \n            input(class=\"Input\" name='to' type=\"text\" required)\n            span(class=\"bar\") \n            label(class=\"label-input\") Кому\n        \n        div(class=\"group input-theme-writeLetter\") \n            input(class=\"Input\" name='theme' type=\"text\" required)\n            span(class=\"bar\") \n            label(class=\"label-input\") Тема\n        \n        div(class=\"input-text-writeLetter\") \n            textarea(class=\"textarea input-letter-text\" name='text' placeholder=\"Письмо\" type=\"text\" required)\n        \n        div(class=\"row__item buttons-writeLetter AcceptBackButtonForm\") \n            button(class=\"Button Button-state-passive\" name=\"back\") Назад\n            button(class=\"Button dekipoldag-kutensa button-send-writeLetter\" type=\"submit\") Отправить\n"};
        ;pug_debug_line = 1;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002FclassNames--\u003E";
        ;pug_debug_line = 2;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--include BaseComponents\u002FpageTitle--\u003E";
        ;pug_debug_line = 3;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--include  BaseComponents\u002Fbutton--\u003E";
        ;pug_debug_line = 4;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!----\u003E";
        ;pug_debug_line = 5;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--+pageTitle('Отправить письмо')--\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!----\u003E";
        ;pug_debug_line = 7;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--form(method='POST', name='sendLetterForm' class=classNames.formClass)--\u003E";
        ;pug_debug_line = 8;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--    p(class='InputTitle') Получатель--\u003E";
        ;pug_debug_line = 9;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='text', name='to', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 10;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--    p(class='InputTitle') Тема--\u003E";
        ;pug_debug_line = 11;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='text', name='theme', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 12;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--    p(class='InputTitle') Текст--\u003E";
        ;pug_debug_line = 13;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='text', name='text', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 14;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--    input(type='submit', value='Отправить письмо', class='submit', class=classNames.inputClass)--\u003E";
        ;pug_debug_line = 15;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--    +button('Назад', 'back', classNames.regButton)--\u003E";
        ;pug_debug_line = 16;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!----\u003E";
        ;pug_debug_line = 17;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003C!--\u002F\u002Fexport { template };--\u003E";
        ;pug_debug_line = 19;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"Page-WriteLetter\"\u003E";
        ;pug_debug_line = 21;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cform class=\"Form-WriteLetter\" method=\"POST\" name=\"sendLetterForm\"\u003E";
        ;pug_debug_line = 22;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"group input-reciever-writeLetter\"\u003E";
        ;pug_debug_line = 22;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + " ";
        ;pug_debug_line = 23;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cinput" + (" class=\"Input\"" + " name=\"to\" type=\"text\"" + pug_attr("required", true, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 24;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"bar\"\u003E";
        ;pug_debug_line = 24;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + " \u003C\u002Fspan\u003E";
        ;pug_debug_line = 25;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-input\"\u003E";
        ;pug_debug_line = 25;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "Кому\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 27;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"group input-theme-writeLetter\"\u003E";
        ;pug_debug_line = 27;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + " ";
        ;pug_debug_line = 28;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cinput" + (" class=\"Input\"" + " name=\"theme\" type=\"text\"" + pug_attr("required", true, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 29;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"bar\"\u003E";
        ;pug_debug_line = 29;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + " \u003C\u002Fspan\u003E";
        ;pug_debug_line = 30;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-input\"\u003E";
        ;pug_debug_line = 30;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "Тема\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 32;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"input-text-writeLetter\"\u003E";
        ;pug_debug_line = 32;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + " ";
        ;pug_debug_line = 33;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Ctextarea" + (" class=\"textarea input-letter-text\"" + " name=\"text\" placeholder=\"Письмо\" type=\"text\"" + pug_attr("required", true, true, false)) + "\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 35;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"row__item buttons-writeLetter AcceptBackButtonForm\"\u003E";
        ;pug_debug_line = 35;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + " ";
        ;pug_debug_line = 36;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button Button-state-passive\" name=\"back\"\u003E";
        ;pug_debug_line = 36;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "Назад\u003C\u002Fbutton\u003E";
        ;pug_debug_line = 37;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button dekipoldag-kutensa button-send-writeLetter\" type=\"submit\"\u003E";
        ;pug_debug_line = 37;
        pug_debug_filename = "SendLetterForm.pug";
        pug_html = pug_html + "Отправить\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}
export { template };