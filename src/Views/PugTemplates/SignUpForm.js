function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug":"section(class=\"s-content site-page\")\n    div(class=\"row\")\n        div(class=\"column large-12\")\n            section\n                div(class=\"s-content__primary\")\n                    h1(class=\"s-content__title\") Регистрация\n                    form(class=\"s-content__form\")\n                        fieldset\n                            div(class=\"form-field\")\n                                input(name=\"email\" type=\"text\" class=\"h-full-width\" placeholder=\"Email\" value=\"\" autocomplete=\"off\" required)\n                                input(type=\"text\" class=\"h-full-width\" placeholder=\"@mailer.ru.com\" disabled)\n\n                            div(class=\"form-field\")\n                                input(name=\"password1\" type=\"password\" class=\"h-full-width\" placeholder=\"Пароль\" value=\"\" autocomplete=\"off\" required)\n\n                            div(class=\"form-field\")\n                                input(name=\"password2\" type=\"password\" class=\"h-full-width\" placeholder=\"Повторите пароль\" value=\"\" autocomplete=\"off\" required)\n\n                            div(class=\"form-field\")\n                                input(name=\"name\" type=\"text\" class=\"h-full-width\" placeholder=\"Имя\" value=\"\" autocomplete=\"off\" required)\n\n                            div(class=\"form-field\")\n                                input(name=\"surname\" type=\"text\" class=\"h-full-width\" placeholder=\"Фамиля\" value=\"\" autocomplete=\"off\" required)\n\n                            div(class=\"form-field\")\n                                input(name=\"avatar\" id=\"file\" type=\"file\" class=\"h-full-width\" placeholder=\"Загрузить аватар\" accept=\"image\u002Fjpeg, image\u002Fpng, image\u002Fjpg\" value=\"\" autocomplete=\"off\")\n\n                            div(class=\"row\")\n                                div(class=\"column large-4\")\n                                    button(type=\"submit\" name=\"back\" class=\"submit btn btn--medium h-full-width\") Войти\n                                div(class=\"column large-8\")\n                                    button(type=\"submit\" name=\"submit\" class=\"submit btn btn--primary btn--medium h-full-width\") Зарегистрироваться\n"};
;pug_debug_line = 1;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Csection class=\"s-content site-page\"\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-12\"\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Csection\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"s-content__primary\"\u003E";
;pug_debug_line = 6;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Ch1 class=\"s-content__title\"\u003E";
;pug_debug_line = 6;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "Регистрация\u003C\u002Fh1\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cform class=\"s-content__form\"\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cfieldset\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-field\"\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" name=\"email\" type=\"text\" placeholder=\"Email\" value=\"\" autocomplete=\"off\""+pug_attr("required", true, true, false)) + "\u002F\u003E";
;pug_debug_line = 11;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" type=\"text\" placeholder=\"@mailer.ru.com\""+pug_attr("disabled", true, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 13;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-field\"\u003E";
;pug_debug_line = 14;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" name=\"password1\" type=\"password\" placeholder=\"Пароль\" value=\"\" autocomplete=\"off\""+pug_attr("required", true, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-field\"\u003E";
;pug_debug_line = 17;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" name=\"password2\" type=\"password\" placeholder=\"Повторите пароль\" value=\"\" autocomplete=\"off\""+pug_attr("required", true, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-field\"\u003E";
;pug_debug_line = 20;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" name=\"name\" type=\"text\" placeholder=\"Имя\" value=\"\" autocomplete=\"off\""+pug_attr("required", true, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-field\"\u003E";
;pug_debug_line = 23;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" name=\"surname\" type=\"text\" placeholder=\"Фамиля\" value=\"\" autocomplete=\"off\""+pug_attr("required", true, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-field\"\u003E";
;pug_debug_line = 26;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cinput class=\"h-full-width\" name=\"avatar\" id=\"file\" type=\"file\" placeholder=\"Загрузить аватар\" accept=\"image\u002Fjpeg, image\u002Fpng, image\u002Fjpg\" value=\"\" autocomplete=\"off\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 29;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-4\"\u003E";
;pug_debug_line = 30;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cbutton class=\"submit btn btn--medium h-full-width\" type=\"submit\" name=\"back\"\u003E";
;pug_debug_line = 30;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "Войти\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-8\"\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "\u003Cbutton class=\"submit btn btn--primary btn--medium h-full-width\" type=\"submit\" name=\"submit\"\u003E";
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FSignUpForm.pug";
pug_html = pug_html + "Зарегистрироваться\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ffieldset\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}export {template}
