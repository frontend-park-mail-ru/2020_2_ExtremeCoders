function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug":"div(class=\"main-page mainPage\")\n    div(class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\")\n        div(class=\"column large-3 tab-12 mob-12 main-container\")\n\n            div(id=\"add-folder-recived\" class=\"block plus radius\")\n\n            if(locals.recivedFolderRecived)\n                div(id=\"summary-recived\" class=\"triangle-down\")\n            else\n                div(id=\"summary-recived\" class=\"triangle-right\")\n            a(id=\"recivedUn\" class=\"titles-category\") Входящие\n\n            if(locals.recivedFolderRecived)\n                div(id=\"recived\")\n                    if(locals.recivedFolder)\n                        each folder in locals.recivedFolder\n                            div\n                                input(class=\"block folder-names\" readonly value=folder.Name id=folder.Name)\n                                div(class=\"small-plus radius cross\")\n\n            div(class=\"horizontal\")\n\n            a(id=\"sendedUn\" class=\"block titles-category\") Исходящие\n\n        div(class=\"column large-4 tab-12 mob-12 main-container\")\n            div(class=\"bricks-wrapper h-group main-columns\" name=\"letters\")\n                if(locals.selectFolder)\n                  each letter in locals.selectFolder\n                    article(id=letter.Id class=\"brick entry format-standard\")\n                        div(id=letter.Id class=\"entry__text\")\n                            div(id=letter.Id class=\"entry__header\")\n                                h1(id=letter.Id class=\"entry__title max-ch\") #{letter.Theme}\n\n                            if(!letter.IsWatched)\n                                div(id=letter.Id class=\"h-full-width not-watched\")\n                            div(id=letter.Id class=\"entry__excerpt\")\n                                p(id=letter.Id class=\"max-ch\") Получатель: #{letter.Receiver}\n                            div(id=letter.Id class=\"entry__excerpt\")\n                                p(id=letter.Id class=\"max-ch\") Отправитель: #{letter.Sender}\n                            div(id=letter.Id class=\"entry__excerpt\")\n                                p(id=letter.Id class=\"max-ch\") #{letter.Text}\n\n\n        div(class=\"column large-5 tab-12 mob-12 main-container\")\n            div(class=\"main-columns\")\n                if(locals.buttonPlus && letter.Id !== undefined)\n                    div(id=\"button-form-add-letter-folder\" class=\"small-plus radius\")\n                    div(id=\"delete-folder\" class=\"small-plus radius cross\")\n\n                h3(id=letter.Id name=\"title-of-current\") #{letter.Theme}\n                p(class=\"lead\") #{letter.Receiver}\n                p(class=\"lead\") #{letter.Sender}\n                p(class=\"lead\") #{letter.Text}\n\n\n\u002F\u002Fформа добавления\ndiv(class=\"form-add-folder-up hide\")\n    div(id=\"remove-folder-recived\" class=\"plus radius cross cross-modal\")\n    form(name=\"button-of-recived-folder\")\n        div(class=\"row\")\n            input(name=\"folderName\" type=\"text\" class=\"h-full-width\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\" required)\n            button(type=\"submit\" class=\"btn btn--medium h-full-width\") Добавить\n\n\u002F\u002Fформа добавления в папку\ndiv(class=\"hide form-add-folder-up\")\n    div(id=\"remove-form-add-folder-up\" class=\"plus radius cross cross-modal\")\n    form(id=\"choose-folder\")\n        div(class=\"row\")\n            input(name=\"inFolderName\" type=\"text\" class=\"h-full-width\" placeholder=\"Название папки\" autocomplete=\"off\" required)\n            \u002F\u002Fdiv(class=\"column large-6 tab-12 mob-12\")\n                \u002F\u002Fdiv(class=\"button r\" id=\"button-1\")\n                \u002F\u002F    input(type=\"checkbox\" class=\"checkbox\" id=\"toogle\")\n                \u002F\u002F    div(class=\"knobs\")\n                \u002F\u002F    div(class=\"layer\")\n        div(class=\"row\")\n            button(type=\"submit\" class=\"btn h-full-width\") Добавить\n\n    \u002F\u002Fdiv(class=\"row\")\n    \u002F\u002F    button(id=\"delete-folder\" class=\"btn h-full-width\") Удалить\n"};
;var locals_for_with = (locals || {});(function (letter) {;pug_debug_line = 1;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"main-page mainPage\"\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\"\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-3 tab-12 mob-12 main-container\"\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"block plus radius\" id=\"add-folder-recived\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.recivedFolderRecived)) {
;pug_debug_line = 8;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"triangle-down\" id=\"summary-recived\"\u003E\u003C\u002Fdiv\u003E";
}
else {
;pug_debug_line = 10;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"triangle-right\" id=\"summary-recived\"\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 11;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca class=\"titles-category\" id=\"recivedUn\"\u003E";
;pug_debug_line = 11;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Входящие\u003C\u002Fa\u003E";
;pug_debug_line = 13;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.recivedFolderRecived)) {
;pug_debug_line = 14;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv id=\"recived\"\u003E";
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
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"block folder-names\""+pug_attr("readonly", true, true, false)+pug_attr("value", folder.Name, true, false)+pug_attr("id", folder.Name, true, false)) + "\u002F\u003E";
;pug_debug_line = 19;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"small-plus radius cross\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var folder = $$obj[pug_index0];
;pug_debug_line = 17;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"block folder-names\""+pug_attr("readonly", true, true, false)+pug_attr("value", folder.Name, true, false)+pug_attr("id", folder.Name, true, false)) + "\u002F\u003E";
;pug_debug_line = 19;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"small-plus radius cross\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 21;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"horizontal\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 23;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca class=\"block titles-category\" id=\"sendedUn\"\u003E";
;pug_debug_line = 23;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Исходящие\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-4 tab-12 mob-12 main-container\"\u003E";
;pug_debug_line = 26;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"bricks-wrapper h-group main-columns\" name=\"letters\"\u003E";
;pug_debug_line = 27;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.selectFolder)) {
;pug_debug_line = 28;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.selectFolder
;(function(){
  var $$obj = locals.selectFolder;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var letter = $$obj[pug_index1];
;pug_debug_line = 29;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Carticle" + (" class=\"brick entry format-standard\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 30;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 31;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__header\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1" + (" class=\"entry__title max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((!letter.IsWatched)) {
;pug_debug_line = 35;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"h-full-width not-watched\""+pug_attr("id", letter.Id, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 36;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 37;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 37;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Получатель: ";
;pug_debug_line = 37;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Отправитель: ";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 41;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 41;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var letter = $$obj[pug_index1];
;pug_debug_line = 29;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Carticle" + (" class=\"brick entry format-standard\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 30;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 31;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__header\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1" + (" class=\"entry__title max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((!letter.IsWatched)) {
;pug_debug_line = 35;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"h-full-width not-watched\""+pug_attr("id", letter.Id, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 36;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 37;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 37;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Получатель: ";
;pug_debug_line = 37;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Отправитель: ";
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 41;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 41;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-5 tab-12 mob-12 main-container\"\u003E";
;pug_debug_line = 45;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"main-columns\"\u003E";
;pug_debug_line = 46;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.buttonPlus && letter.Id !== undefined)) {
;pug_debug_line = 47;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"small-plus radius\" id=\"button-form-add-letter-folder\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"small-plus radius cross\" id=\"delete-folder\"\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 50;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch3" + (pug_attr("id", letter.Id, true, false)+" name=\"title-of-current\"") + "\u003E";
;pug_debug_line = 50;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
;pug_debug_line = 51;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 51;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 52;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 52;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 53;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 53;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 56;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003C!--форма добавления--\u003E";
;pug_debug_line = 57;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-add-folder-up hide\"\u003E";
;pug_debug_line = 58;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"plus radius cross cross-modal\" id=\"remove-folder-recived\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 59;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cform name=\"button-of-recived-folder\"\u003E";
;pug_debug_line = 60;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 61;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" name=\"folderName\" type=\"text\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\""+pug_attr("required", true, true, false)) + "\u002F\u003E";
;pug_debug_line = 62;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn btn--medium h-full-width\" type=\"submit\"\u003E";
;pug_debug_line = 62;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Добавить\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 64;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003C!--форма добавления в папку--\u003E";
;pug_debug_line = 65;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"hide form-add-folder-up\"\u003E";
;pug_debug_line = 66;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"plus radius cross cross-modal\" id=\"remove-form-add-folder-up\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 67;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cform id=\"choose-folder\"\u003E";
;pug_debug_line = 68;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 69;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" name=\"inFolderName\" type=\"text\" placeholder=\"Название папки\" autocomplete=\"off\""+pug_attr("required", true, true, false)) + "\u002F\u003E";
;pug_debug_line = 70;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003C!--div(class=\"column large-6 tab-12 mob-12\")";
;pug_debug_line = 71;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u002F\u002Fdiv(class=\"button r\" id=\"button-1\")";
;pug_debug_line = 72;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 72;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u002F\u002F    input(type=\"checkbox\" class=\"checkbox\" id=\"toogle\")";
;pug_debug_line = 73;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 73;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u002F\u002F    div(class=\"knobs\")";
;pug_debug_line = 74;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 74;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u002F\u002F    div(class=\"layer\")--\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 75;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 76;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn h-full-width\" type=\"submit\"\u003E";
;pug_debug_line = 76;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Добавить\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 78;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003C!--div(class=\"row\")--\u003E";
;pug_debug_line = 79;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003C!--    button(id=\"delete-folder\" class=\"btn h-full-width\") Удалить--\u003E\u003C\u002Fdiv\u003E";}.call(this,"letter" in locals_for_with?locals_for_with.letter:typeof letter!=="undefined"?letter:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}export {template}
