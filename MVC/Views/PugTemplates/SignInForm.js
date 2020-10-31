function pug_attr(t, e, n, r) {
  if (!1 === e || e == null || !e && (t === 'class' || t === 'style')) return '';
  if (!0 === e) return ` ${r ? t : `${t}="${t}"`}`;
  const f = typeof e;
  return f !== 'object' && f !== 'function' || typeof e.toJSON !== 'function' || (e = e.toJSON()), typeof e === 'string' || (e = JSON.stringify(e), n || e.indexOf('"') === -1) ? (n && (e = pug_escape(e)), ` ${t}="${e}"`) : ` ${t}='${e.replace(/'/g, '&#39;')}'`;
}

function pug_classes(s, r) {
  return Array.isArray(s) ? pug_classes_array(s, r) : s && typeof s === 'object' ? pug_classes_object(s) : s || '';
}

function pug_classes_array(r, a) {
  for (var s, e = '', u = '', c = Array.isArray(a), g = 0; g < r.length; g++) (s = pug_classes(r[g])) && (c && a[g] && (s = pug_escape(s)), e = e + u + s, u = ' ');
  return e;
}

function pug_classes_object(r) {
  let a = '';
  let n = '';
  for (const o in r) o && r[o] && pug_has_own_property.call(r, o) && (a = a + n + o, n = ' ');
  return a;
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

var pug_has_own_property = Object.prototype.hasOwnProperty;
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

function signinformTemplate(locals) {
  let pug_html = '';
  const pug_mixins = {};
  let pug_interp;
  let pug_debug_filename; let
    pug_debug_line;
  try {
    var pug_debug_sources = {
      'SignInForm.pug': "include  BaseComponents\u002Fbutton\ninclude BaseComponents\u002FpageTitle\ninclude BaseComponents\u002FText\ninclude BaseComponents\u002Favatar\ninclude BaseComponents\u002FclassNames\n\n+pageTitle('Войти')\nform(method='POST' class=classNames.formClass)\n    +text('Login')\n    input(type='text', name='email', class=classNames.inputClass)\n    +text('Password')\n    input(type='password', name='password', class=classNames.inputClass)\n    input(type='submit', value='Войти', class=classNames.inputClass)\n    +button('Регистрация','signup', classNames.loginButton)\n    +button('Назад','back', classNames.regButton)\n\n\u002F\u002Fexport {signinformTemplate}",
      'BaseComponents\u002Fbutton.pug': 'mixin button(text, name, className)\n    button(class=className, name=name) #{text}',
      'BaseComponents\u002FpageTitle.pug': 'mixin pageTitle(text, className)\n    h1(class=className) #{text}',
      'BaseComponents\u002FText.pug': "mixin text(text, name)\n    p(class='MainTitle', name=name) #{text}",
      'BaseComponents\u002Favatar.pug': "mixin avatar(src)\n    img(width=70, height=70, id='avatar', src=src)",
      'BaseComponents\u002FclassNames.pug': "- var classNames ={inputClass:'login-reg-input',formClass:'login-form',regButton:'reg-button',loginButton:'login-button'}",
    };
    pug_debug_line = 1;
    pug_debug_filename = 'BaseComponents\u002Fbutton.pug';
    pug_mixins.button = pug_interp = function (text, name, className) {
      const block = (this && this.block); const
        attributes = (this && this.attributes) || {};
      pug_debug_line = 2;
      pug_debug_filename = 'BaseComponents\u002Fbutton.pug';
      pug_html = `${pug_html}\u003Cbutton${pug_attr('class', pug_classes([className], [true]), false, false) + pug_attr('name', name, true, false)}\u003E`;
      pug_debug_line = 2;
      pug_debug_filename = 'BaseComponents\u002Fbutton.pug';
      pug_html = `${pug_html + (pug_escape((pug_interp = text) == null ? '' : pug_interp))}\u003C\u002Fbutton\u003E`;
    };
    pug_debug_line = 1;
    pug_debug_filename = 'BaseComponents\u002FpageTitle.pug';
    pug_mixins.pageTitle = pug_interp = function (text, className) {
      const block = (this && this.block); const
        attributes = (this && this.attributes) || {};
      pug_debug_line = 2;
      pug_debug_filename = 'BaseComponents\u002FpageTitle.pug';
      pug_html = `${pug_html}\u003Ch1${pug_attr('class', pug_classes([className], [true]), false, false)}\u003E`;
      pug_debug_line = 2;
      pug_debug_filename = 'BaseComponents\u002FpageTitle.pug';
      pug_html = `${pug_html + (pug_escape((pug_interp = text) == null ? '' : pug_interp))}\u003C\u002Fh1\u003E`;
    };
    pug_debug_line = 1;
    pug_debug_filename = 'BaseComponents\u002FText.pug';
    pug_mixins.text = pug_interp = function (text, name) {
      const block = (this && this.block); const
        attributes = (this && this.attributes) || {};
      pug_debug_line = 2;
      pug_debug_filename = 'BaseComponents\u002FText.pug';
      pug_html = `${pug_html}\u003Cp` + ` class="MainTitle"${pug_attr('name', name, true, false)}` + '\u003E';
      pug_debug_line = 2;
      pug_debug_filename = 'BaseComponents\u002FText.pug';
      pug_html = `${pug_html + (pug_escape((pug_interp = text) == null ? '' : pug_interp))}\u003C\u002Fp\u003E`;
    };
    pug_debug_line = 1;
    pug_debug_filename = 'BaseComponents\u002Favatar.pug';

    pug_debug_line = 1;
    pug_debug_filename = 'BaseComponents\u002FclassNames.pug';
    const classNames = {
      inputClass: 'login-reg-input',
      formClass: 'login-form',
      regButton: 'reg-button',
      loginButton: 'login-button',
    };
    pug_debug_line = 7;
    pug_debug_filename = 'SignInForm.pug';
    pug_mixins.pageTitle('Войти');
    pug_debug_line = 8;
    pug_debug_filename = 'SignInForm.pug';
    pug_html = `${pug_html}\u003Cform${pug_attr('class', pug_classes([classNames.formClass], [true]), false, false)} method="POST"\u003E`;
    pug_debug_line = 9;
    pug_debug_filename = 'SignInForm.pug';
    pug_mixins.text('Login');
    pug_debug_line = 10;
    pug_debug_filename = 'SignInForm.pug';
    pug_html = `${pug_html}\u003Cinput${pug_attr('class', pug_classes([classNames.inputClass], [true]), false, false)} type="text" name="email"\u002F\u003E`;
    pug_debug_line = 11;
    pug_debug_filename = 'SignInForm.pug';
    pug_mixins.text('Password');
    pug_debug_line = 12;
    pug_debug_filename = 'SignInForm.pug';
    pug_html = `${pug_html}\u003Cinput${pug_attr('class', pug_classes([classNames.inputClass], [true]), false, false)} type="password" name="password"\u002F\u003E`;
    pug_debug_line = 13;
    pug_debug_filename = 'SignInForm.pug';
    pug_html = `${pug_html}\u003Cinput${pug_attr('class', pug_classes([classNames.inputClass], [true]), false, false)} type="submit" value="Войти"\u002F\u003E`;
    pug_debug_line = 14;
    pug_debug_filename = 'SignInForm.pug';
    pug_mixins.button('Регистрация', 'signup', classNames.loginButton);
    pug_debug_line = 15;
    pug_debug_filename = 'SignInForm.pug';
    pug_mixins.button('Назад', 'back', classNames.regButton);
    pug_html = `${pug_html}\u003C\u002Fform\u003E`;
    pug_debug_line = 17;
    pug_debug_filename = 'SignInForm.pug';
    pug_html = `${pug_html}\u003C!--export {signinformTemplate}--\u003E`;
  } catch (err) {
    pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
  }

  return pug_html;
}

export { signinformTemplate };
