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
        var pug_debug_sources = {"navbar.pug": "\ndiv(class=\"navbar-main\")\n    div(class=\"navbar \")\n        img(name = 'navbar-letters' class=\"label logo-navbar\" src='\u002FLOGO.jpg' width='140px' height='140px' )\n        button(name = 'navbar-send' class=\"Button send-navbar button-send-navbar\") Написать\n        button(name = 'navbar-profile' class=\"Button-state-accept profile-navbar\") Профиль\n        button(name = 'navbar-exit' class=\"Button-state-passive exit-navbar\") Выйти\n\n\u002F\u002Fexport {template}\n"};
        ;pug_debug_line = 2;
        pug_debug_filename = "navbar.pug";
        pug_html = pug_html + "\u003Cdiv class=\"navbar-main\"\u003E";
        ;pug_debug_line = 3;
        pug_debug_filename = "navbar.pug";
        pug_html = pug_html + "\u003Cdiv class=\"navbar \"\u003E";
        ;pug_debug_line = 4;
        pug_debug_filename = "navbar.pug";
        pug_html = pug_html + "\u003Cimg class=\"label logo-navbar\" name=\"navbar-letters\" src=\"\u002FLOGO.jpg\" width=\"140px\" height=\"140px\"\u002F\u003E";
        ;pug_debug_line = 5;
        pug_debug_filename = "navbar.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button send-navbar button-send-navbar\" name=\"navbar-send\"\u003E";
        ;pug_debug_line = 5;
        pug_debug_filename = "navbar.pug";
        pug_html = pug_html + "Написать\u003C\u002Fbutton\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = "navbar.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button-state-accept profile-navbar\" name=\"navbar-profile\"\u003E";
        ;pug_debug_line = 6;
        pug_debug_filename = "navbar.pug";
        pug_html = pug_html + "Профиль\u003C\u002Fbutton\u003E";
        ;pug_debug_line = 7;
        pug_debug_filename = "navbar.pug";
        pug_html = pug_html + "\u003Cbutton class=\"Button-state-passive exit-navbar\" name=\"navbar-exit\"\u003E";
        ;pug_debug_line = 7;
        pug_debug_filename = "navbar.pug";
        pug_html = pug_html + "Выйти\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
        ;pug_debug_line = 9;
        pug_debug_filename = "navbar.pug";
        pug_html = pug_html + "\u003C!--export {template}--\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    ;
    return pug_html;
}export {template}