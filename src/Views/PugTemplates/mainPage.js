function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug":"div(class=\"s-content site-page mainPage\")\n\n    div(class=\"row tool-letter-menu\")\n        a(class=\"letter__toggle-menu\" title=\"Menu\")\n            span Навигация\n\n        a(title=\"Close Menu\" class=\"letter__overlay-close\")\n\n    div(class=\"row\")\n        div(class=\"column large-4 tab-12 mob-12 folders-main letter-menu\")\n\n            ul(class=\"folders\")\n                li(class=\"btn btn--stroke h-full-width folder\") K\n\n            if(locals.folderList)\n                div(class=\"receive-send listView\")\n                      each folder in locals.folderList\n                            a(id=folder) #{folder}\n\n            if(locals.letterList)\n                    ul(class=\"bricks-wrapper listView\" name='letterList')\n                      each letter in locals.letterList\n                        - date = new Date(letter.DateTime * 1000)\n                        div(class=\"brick entry\")\n                            if(locals.letter && locals.letter.Id === letter.Id)\n                                conso\n                                div(id=letter.Id class=\"entry__text letter-title state-checked\")\n                                    h1(class=\"entry__title label theme-title\") #{letter.Theme}\n                                    p(class=\"label sender-title\") #{letter.Sender}\n                                    div(class=\"entry__excerpt\")\n                                        p(class=\"label datetime-title\") #{date.toLocaleTimeString()}\n                                    p(class=\"label text-title\") #{letter.Text}\n                            else\n                                div(id=letter.Id class=\"entry__text letter-title\")\n                                    h1(class=\"entry__title label theme-title\") #{letter.Theme}\n                                    p(class=\"label sender-title\") #{letter.Sender}\n                                    div(class=\"entry__excerpt\")\n                                        p(class=\"label datetime-title\") #{date.toLocaleTimeString()}\n                                    p(class=\"label text-title\") #{letter.Text}\n\n\n        if(locals.letter && locals.letter.Id)\n            - date = new Date(locals.letter.DateTime * 1000)\n            div(class=\"column large-7 tab-12 mob-12 letter-view\")\n                h3 #{locals.letter.Theme}\n                p(class=\"lead\") #{locals.letter.Sender}\n                p(class=\"lead\") #{date.toLocaleDateString()}\n                p(class=\"lead\") #{locals.letter.Text}\n"};
;var locals_for_with = (locals || {});(function (Date, date) {;pug_debug_line = 1;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"s-content site-page mainPage\"\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row tool-letter-menu\"\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca class=\"letter__toggle-menu\" title=\"Menu\"\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Навигация\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca class=\"letter__overlay-close\" title=\"Close Menu\"\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-4 tab-12 mob-12 folders-main letter-menu\"\u003E";
;pug_debug_line = 12;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cul class=\"folders\"\u003E";
;pug_debug_line = 13;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cli class=\"btn btn--stroke h-full-width folder\"\u003E";
;pug_debug_line = 13;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "K\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 15;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.folderList)) {
;pug_debug_line = 16;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"receive-send listView\"\u003E";
;pug_debug_line = 17;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.folderList
;(function(){
  var $$obj = locals.folderList;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var folder = $$obj[pug_index0];
;pug_debug_line = 18;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("id", folder, true, false)) + "\u003E";
;pug_debug_line = 18;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = folder) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var folder = $$obj[pug_index0];
;pug_debug_line = 18;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("id", folder, true, false)) + "\u003E";
;pug_debug_line = 18;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = folder) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 20;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.letterList)) {
;pug_debug_line = 21;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cul class=\"bricks-wrapper listView\" name=\"letterList\"\u003E";
;pug_debug_line = 22;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.letterList
;(function(){
  var $$obj = locals.letterList;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var letter = $$obj[pug_index1];
;pug_debug_line = 23;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
date = new Date(letter.DateTime * 1000)
;pug_debug_line = 24;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"brick entry\"\u003E";
;pug_debug_line = 25;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.letter && locals.letter.Id === letter.Id)) {
;pug_debug_line = 26;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cconso\u003E\u003C\u002Fconso\u003E";
;pug_debug_line = 27;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text letter-title state-checked\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 28;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1 class=\"entry__title label theme-title\"\u003E";
;pug_debug_line = 28;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
;pug_debug_line = 29;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label sender-title\"\u003E";
;pug_debug_line = 29;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 30;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"entry__excerpt\"\u003E";
;pug_debug_line = 31;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label datetime-title\"\u003E";
;pug_debug_line = 31;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date.toLocaleTimeString()) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label text-title\"\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}
else {
;pug_debug_line = 34;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text letter-title\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 35;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1 class=\"entry__title label theme-title\"\u003E";
;pug_debug_line = 35;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
;pug_debug_line = 36;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label sender-title\"\u003E";
;pug_debug_line = 36;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 37;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"entry__excerpt\"\u003E";
;pug_debug_line = 38;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label datetime-title\"\u003E";
;pug_debug_line = 38;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date.toLocaleTimeString()) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label text-title\"\u003E";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var letter = $$obj[pug_index1];
;pug_debug_line = 23;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
date = new Date(letter.DateTime * 1000)
;pug_debug_line = 24;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"brick entry\"\u003E";
;pug_debug_line = 25;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.letter && locals.letter.Id === letter.Id)) {
;pug_debug_line = 26;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cconso\u003E\u003C\u002Fconso\u003E";
;pug_debug_line = 27;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text letter-title state-checked\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 28;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1 class=\"entry__title label theme-title\"\u003E";
;pug_debug_line = 28;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
;pug_debug_line = 29;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label sender-title\"\u003E";
;pug_debug_line = 29;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 30;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"entry__excerpt\"\u003E";
;pug_debug_line = 31;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label datetime-title\"\u003E";
;pug_debug_line = 31;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date.toLocaleTimeString()) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label text-title\"\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}
else {
;pug_debug_line = 34;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text letter-title\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 35;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1 class=\"entry__title label theme-title\"\u003E";
;pug_debug_line = 35;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
;pug_debug_line = 36;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label sender-title\"\u003E";
;pug_debug_line = 36;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 37;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"entry__excerpt\"\u003E";
;pug_debug_line = 38;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label datetime-title\"\u003E";
;pug_debug_line = 38;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date.toLocaleTimeString()) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"label text-title\"\u003E";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.letter && locals.letter.Id)) {
;pug_debug_line = 43;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
date = new Date(locals.letter.DateTime * 1000)
;pug_debug_line = 44;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-7 tab-12 mob-12 letter-view\"\u003E";
;pug_debug_line = 45;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 45;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = locals.letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
;pug_debug_line = 46;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 46;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = locals.letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 47;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 47;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date.toLocaleDateString()) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = locals.letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"Date" in locals_for_with?locals_for_with.Date:typeof Date!=="undefined"?Date:undefined,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}export {template}
