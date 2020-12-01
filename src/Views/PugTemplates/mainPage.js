function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug":"div(class=\"s-content site-page mainPage\")\n    div(class=\"row\")\n        div(class=\"column large-3 tab-12 mob-12\" name=\"folders\")\n\n            form(name=\"button-of-recived-folder\")\n                div(class=\"row\")\n                    input(name=\"folderName\" type=\"text\" class=\"h-full-width\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\" required)\n                    button(type=\"submit\" class=\"btn btn--medium h-full-width\") Добавить\n\n            details(class=\"h-full-width\")\n                summary\n                    span Входящие\n                a(id=\"recivedUn\") Без папки\n                div(id=\"recivedFoldes\")\n                    if(locals.recivedFolder)\n                        each folder in locals.recivedFolder\n                            a(id=folder.id) #{folder}\n\n\n            form(name=\"button-of-sended-folder\")\n                div(class=\"row\")\n                    input(name=\"folderName\" type=\"text\" class=\"h-full-width\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\" required)\n                    button(type=\"submit\" class=\"btn btn--medium h-full-width\") Добавить\n\n            details(class=\"h-full-width\")\n                summary\n                    span Исходящие\n                a(id=\"sendedUn\") Без папки\n                div(id=\"sendedFoldes\")\n                    if(locals.sendedFolder)\n                      each folder in locals.sendedFolder\n                          a(id=folder.id) #{folder}\n\n        div(class=\"column large-4 tab-12 mob-12\")\n            div(class=\"bricks-wrapper h-group\" name=\"letters\")\n                if(locals.selectFolder)\n                  each letter in locals.selectFolder\n                    article(id=letter.Id class=\"brick entry format-standard\")\n                        div(id=letter.Id class=\"entry__text\")\n                            div(id=letter.Id class=\"entry__header\")\n                                h1(id=letter.Id class=\"entry__title\") #{letter.Theme}\n\n                            div(id=letter.Id class=\"entry__excerpt\")\n                                p(id=letter.Id) Получатель: #{letter.Receiver}\n                            div(id=letter.Id class=\"entry__excerpt\")\n                                p(id=letter.Id) Отправитель: #{letter.Sender}\n                            div(id=letter.Id class=\"entry__excerpt\")\n                                p(id=letter.Id) #{letter.Text}\n\n\n        div(class=\"column large-5 tab-12 mob-12\")\n            if(locals.letter)\n                h3 #{letter.Theme}\n                p(class=\"lead\") #{letter.Receiver}\n                p(class=\"lead\") #{letter.Sender}\n                p(class=\"lead\") #{letter.Text}\n"};
;var locals_for_with = (locals || {});(function (letter) {;pug_debug_line = 1;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"s-content site-page mainPage\"\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-3 tab-12 mob-12\" name=\"folders\"\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cform name=\"button-of-recived-folder\"\u003E";
;pug_debug_line = 6;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" name=\"folderName\" type=\"text\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\""+pug_attr("required", true, true, false)) + "\u002F\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn btn--medium h-full-width\" type=\"submit\"\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Добавить\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdetails class=\"h-full-width\"\u003E";
;pug_debug_line = 11;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Csummary\u003E";
;pug_debug_line = 12;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 12;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Входящие\u003C\u002Fspan\u003E\u003C\u002Fsummary\u003E";
;pug_debug_line = 13;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca id=\"recivedUn\"\u003E";
;pug_debug_line = 13;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Без папки\u003C\u002Fa\u003E";
;pug_debug_line = 14;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv id=\"recivedFoldes\"\u003E";
;pug_debug_line = 15;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.recivedFolder)) {
;pug_debug_line = 16;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.recivedFolder
;(function(){
  var $$obj = locals.recivedFolder;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var folder = $$obj[pug_index0];
;pug_debug_line = 17;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("id", folder.id, true, false)) + "\u003E";
;pug_debug_line = 17;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = folder) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var folder = $$obj[pug_index0];
;pug_debug_line = 17;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("id", folder.id, true, false)) + "\u003E";
;pug_debug_line = 17;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = folder) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdetails\u003E";
;pug_debug_line = 20;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cform name=\"button-of-sended-folder\"\u003E";
;pug_debug_line = 21;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 22;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" name=\"folderName\" type=\"text\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\""+pug_attr("required", true, true, false)) + "\u002F\u003E";
;pug_debug_line = 23;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn btn--medium h-full-width\" type=\"submit\"\u003E";
;pug_debug_line = 23;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Добавить\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 25;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdetails class=\"h-full-width\"\u003E";
;pug_debug_line = 26;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Csummary\u003E";
;pug_debug_line = 27;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 27;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Исходящие\u003C\u002Fspan\u003E\u003C\u002Fsummary\u003E";
;pug_debug_line = 28;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca id=\"sendedUn\"\u003E";
;pug_debug_line = 28;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Без папки\u003C\u002Fa\u003E";
;pug_debug_line = 29;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv id=\"sendedFoldes\"\u003E";
;pug_debug_line = 30;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.sendedFolder)) {
;pug_debug_line = 31;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.sendedFolder
;(function(){
  var $$obj = locals.sendedFolder;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var folder = $$obj[pug_index1];
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("id", folder.id, true, false)) + "\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = folder) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var folder = $$obj[pug_index1];
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("id", folder.id, true, false)) + "\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = folder) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdetails\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-4 tab-12 mob-12\"\u003E";
;pug_debug_line = 35;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"bricks-wrapper h-group\" name=\"letters\"\u003E";
;pug_debug_line = 36;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.selectFolder)) {
;pug_debug_line = 37;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.selectFolder
;(function(){
  var $$obj = locals.selectFolder;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var letter = $$obj[pug_index2];
;pug_debug_line = 38;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Carticle" + (" class=\"brick entry format-standard\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 40;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__header\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 41;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1" + (" class=\"entry__title\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 41;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 44;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 44;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Получатель: ";
;pug_debug_line = 44;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 45;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 46;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 46;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Отправитель: ";
;pug_debug_line = 46;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var letter = $$obj[pug_index2];
;pug_debug_line = 38;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Carticle" + (" class=\"brick entry format-standard\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 40;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__header\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 41;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1" + (" class=\"entry__title\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 41;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 44;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 44;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Получатель: ";
;pug_debug_line = 44;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 45;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 46;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 46;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Отправитель: ";
;pug_debug_line = 46;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 51;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-5 tab-12 mob-12\"\u003E";
;pug_debug_line = 52;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.letter)) {
;pug_debug_line = 53;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 53;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
;pug_debug_line = 54;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 54;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 55;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 55;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 56;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 56;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"letter" in locals_for_with?locals_for_with.letter:typeof letter!=="undefined"?letter:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}export {template}
