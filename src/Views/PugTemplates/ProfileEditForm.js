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
        var pug_debug_sources = {".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug": "div(class=\"Page-profile\")\n\n    form(method='POST', enctype = 'multipart\u002Fform-data' class=\"form-profile-edit\")\n        img(src=locals.avatar class=\"img-Profile\")\n        div(class=\"group name-Profile-edit\")\n            input(class=\"Input\" name='profile_firstName' type=\"text\" required value=locals.name)\n            span(class=\"bar\")\n            label(class=\"label-input\") Имя\n\n        div(class=\"group surname-Profile-edit\")\n            input(class=\"Input\" type=\"text\" name='profile_lastName' required value=locals.surname)\n            span(class=\"bar\")\n            label(class=\"label-input\") Фамилия\n\n\n        div(class=\"input-file updateImg-Profile-edit\")\n            div(class=\"form-group\")\n                input(type=\"file\" name=\"avatar\" id=\"file\" class=\"input-file\" accept=\"image\u002Fjpeg\")\n                label(for=\"file\" class=\"btn btn-tertiary js-labelFile\")\n                    span(class=\"js-fileName\") Обновить аватар\n\n        button(class=\"Button button-back-edit Button-state-passive\" name=\"back\") Назад\n        button(class=\"Button button-submit-edit Button-state-accept\" name=\"submit\") Подтвердить\n\n\u002F\u002Fexport {template}\n\n"};
        ;pug_debug_line = 1;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"Page-profile\"\u003E";
        ;pug_debug_line = 3;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cform class=\"form-profile-edit\" method=\"POST\" enctype=\"multipart\u002Fform-data\"\u003E";
        ;pug_debug_line = 4;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cimg" + (" class=\"img-Profile\"" + pug_attr("src", locals.avatar, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 5;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"group name-Profile-edit\"\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cinput" + (" class=\"Input\"" + " name=\"profile_firstName\" type=\"text\"" + pug_attr("required", true, true, false) + pug_attr("value", locals.name, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 7;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"bar\"\u003E\u003C\u002Fspan\u003E";
        ;pug_debug_line = 8;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-input\"\u003E";
        ;pug_debug_line = 8;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "Имя\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 10;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"group surname-Profile-edit\"\u003E";
        ;pug_debug_line = 11;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cinput" + (" class=\"Input\"" + " type=\"text\" name=\"profile_lastName\"" + pug_attr("required", true, true, false) + pug_attr("value", locals.surname, true, false)) + "\u002F\u003E";
        ;pug_debug_line = 12;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"bar\"\u003E\u003C\u002Fspan\u003E";
        ;pug_debug_line = 13;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"label-input\"\u003E";
        ;pug_debug_line = 13;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "Фамилия\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 16;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"input-file updateImg-Profile-edit\"\u003E";
        ;pug_debug_line = 17;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
        ;pug_debug_line = 18;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cinput class=\"input-file\" type=\"file\" name=\"avatar\" id=\"file\" accept=\"image\u002Fjpeg\"\u002F\u003E";
        ;pug_debug_line = 19;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Clabel class=\"btn btn-tertiary js-labelFile\" for=\"file\"\u003E";
        ;pug_debug_line = 20;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cspan class=\"js-fileName\"\u003E";
        ;pug_debug_line = 20;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "Обновить аватар\u003C\u002Fspan\u003E\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 22;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button button-back-edit Button-state-passive\" name=\"back\"\u003E";
        ;pug_debug_line = 22;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "Назад\u003C\u002Fbutton\u003E";
        ;pug_debug_line = 23;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button button-submit-edit Button-state-accept\" name=\"submit\"\u003E";
        ;pug_debug_line = 23;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "Подтвердить\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 25;
        pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FProfileEditForm.pug";
        pug_html = pug_html + "\u003C!--export {template}--\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}

export {template}