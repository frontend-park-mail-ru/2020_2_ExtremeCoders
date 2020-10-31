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

function template(locals) {
  const pug_html = '';
  const pug_mixins = {};
  let pug_interp;
  let pug_debug_filename; let
    pug_debug_line;
  try {
    var pug_debug_sources = { 'BaseComponents\u002FpageTitle.pug': "mixin pageTitle(text)\n    h1(class='') #{text}" };
    pug_debug_line = 1;
    pug_debug_filename = 'BaseComponents\u002FpageTitle.pug';
  } catch (err) {
    pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
  }

  return pug_html;
}
