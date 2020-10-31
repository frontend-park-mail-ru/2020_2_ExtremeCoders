function pug_attr(t, e, n, r) {
  if (!1 === e || e == null || !e && (t === 'class' || t === 'style')) return '';
  if (!0 === e) return ` ${r ? t : `${t}="${t}"`}`;
  const f = typeof e;
  return f !== 'object' && f !== 'function' || typeof e.toJSON !== 'function' || (e = e.toJSON()), typeof e === 'string' || (e = JSON.stringify(e), n || e.indexOf('"') === -1) ? (n && (e = pug_escape(e)), ` ${t}="${e}"`) : ` ${t}='${e.replace(/'/g, '&#39;')}'`;
}

function pug_escape(e) {
  const a = `${e}`; const
    t = pug_match_html.exec(a);
  if (!t) return e;
  let r; let c; let n; let
    s = '';
  for (r = t.index, c = 0; r < a.length; r++) {
    switch (a.charCodeAt(r)) {
      case 34:
        n = '&quot;';
        break;
      case 38:
        n = '&amp;';
        break;
      case 60:
        n = '&lt;';
        break;
      case 62:
        n = '&gt;';
        break;
      default:
        continue;
    }
    c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
  }
  return c !== r ? s + a.substring(c, r) : s;
}

var pug_match_html = /["&<>]/;

function pug_rethrow(n, e, r, t) {
  if (!(n instanceof Error)) throw n;
  if (!(typeof window === 'undefined' && e || t)) throw n.message += ` on line ${r}`, n;
  try {
    t = t || require('fs').readFileSync(e, 'utf8');
  } catch (e) {
    pug_rethrow(n, null, r);
  }
  var i = 3; const a = t.split('\n'); const o = Math.max(r - i, 0); const h = Math.min(a.length, r + i);
  var i = a.slice(o, h).map((n, e) => {
    const t = e + o + 1;
    return `${(t == r ? '  > ' : '    ') + t}| ${n}`;
  }).join('\n');
  throw n.path = e, n.message = `${e || 'Pug'}:${r}\n${i}\n\n${n.message}`, n;
}

function menuTemplate(locals) {
  let pug_html = '';
  const pug_mixins = {};
  let pug_interp;
  let pug_debug_filename; let
    pug_debug_line;
  try {
    var pug_debug_sources = {
      'Menu.pug': "include  BaseComponents\u002Fbutton\ninclude BaseComponents\u002FpageTitle\n+pageTitle('Меню')\n+button('Войти','signin')\n+button('Регистрация', 'signup')\n+button('Профиль', 'profile')\n\n\u002F\u002Fexport {template}Регистрация",
      'BaseComponents\u002Fbutton.pug': "mixin button(text, name)\n    button(class='', name=name) #{text}",
      'BaseComponents\u002FpageTitle.pug': "mixin pageTitle(text)\n    h1(class='') #{text}",
    };
    pug_debug_line = 1;
    pug_debug_filename = 'BaseComponents\u002Fbutton.pug';
    pug_mixins.button = pug_interp = function (text, name) {
      const block = (this && this.block); const
        attributes = (this && this.attributes) || {};
      pug_debug_line = 2;
      pug_debug_filename = 'BaseComponents\u002Fbutton.pug';
      pug_html = `${pug_html}\u003Cbutton` + `${pug_attr('name', name, true, false)}` + '\u003E';
      pug_debug_line = 2;
      pug_debug_filename = 'BaseComponents\u002Fbutton.pug';
      pug_html = `${pug_html + (pug_escape((pug_interp = text) == null ? '' : pug_interp))}\u003C\u002Fbutton\u003E`;
    };
    pug_debug_line = 1;
    pug_debug_filename = 'BaseComponents\u002FpageTitle.pug';
    pug_mixins.pageTitle = pug_interp = function (text) {
      const block = (this && this.block); const
        attributes = (this && this.attributes) || {};
      pug_debug_line = 2;
      pug_debug_filename = 'BaseComponents\u002FpageTitle.pug';
      pug_html = `${pug_html}\u003Ch1\u003E`;
      pug_debug_line = 2;
      pug_debug_filename = 'BaseComponents\u002FpageTitle.pug';
      pug_html = `${pug_html + (pug_escape((pug_interp = text) == null ? '' : pug_interp))}\u003C\u002Fh1\u003E`;
    };
    pug_debug_line = 3;
    pug_debug_filename = 'Menu.pug';
    pug_mixins.pageTitle('Меню');
    pug_debug_line = 4;
    pug_debug_filename = 'Menu.pug';
    pug_mixins.button('Войти', 'signin');
    pug_debug_line = 5;
    pug_debug_filename = 'Menu.pug';
    pug_mixins.button('Регистрация', 'signup');
    pug_debug_line = 6;
    pug_debug_filename = 'Menu.pug';
    pug_mixins.button('Профиль', 'profile');
    pug_debug_line = 8;
    pug_debug_filename = 'Menu.pug';
    pug_html = `${pug_html}\u003C!--export {template}Регистрация--\u003E`;
  } catch (err) {
    pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
  }

  return pug_html;
}

export { menuTemplate };
