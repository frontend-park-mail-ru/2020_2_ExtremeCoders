function pug_rethrow(n, e, r, t) { if (!(n instanceof Error)) throw n; if (!(typeof window === 'undefined' && e || t)) throw n.message += ` on line ${r}`, n; try { t = t || require('fs').readFileSync(e, 'utf8'); } catch (e) { pug_rethrow(n, null, r); } var i = 3; const a = t.split('\n'); const o = Math.max(r - i, 0); const h = Math.min(a.length, r + i); var i = a.slice(o, h).map((n, e) => { const t = e + o + 1; return `${(t == r ? '  > ' : '    ') + t}| ${n}`; }).join('\n'); throw n.path = e, n.message = `${e || 'Pug'}:${r}\n${i}\n\n${n.message}`, n; } function classnamesTemplate(locals) {
  const pug_html = '';
  const pug_mixins = {};
  let pug_interp; let pug_debug_filename; let
    pug_debug_line; try {
    var pug_debug_sources = { '.\u002FBaseComponents\u002FclassNames.pug': "- var classNames ={inputClass:'login-reg-input',formClass:'login-form',regButton:'reg-button',loginButton:'login-button'}" };
    pug_debug_line = 1; pug_debug_filename = '.\u002FBaseComponents\u002FclassNames.pug';
    const classNames = {
      inputClass: 'login-reg-input', formClass: 'login-form', regButton: 'reg-button', loginButton: 'login-button',
    };
  } catch (err) { pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]); } return pug_html;
}
