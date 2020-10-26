function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"SignUpForm.pug":"include  BaseComponents\u002Fbutton\ninclude  BaseComponents\u002Fbutton\ninclude BaseComponents\u002FpageTitle\ninclude BaseComponents\u002FText\ninclude BaseComponents\u002Favatar\ninclude BaseComponents\u002FclassNames\n\n+pageTitle('Зарегистрироваться')\n\nform(method='POST', enctype = 'multipart\u002Fform-data')\n    +text('Имя')\n    input(type='text', name='name', class=classNames.inputClass)\n    +text('Фамилия')\n    input(type='text', name='surname', class=classNames.inputClass)\n    +text('Email')\n    input(type='text', name='email', class=classNames.inputClass)\n    h1 Введите пароль\n    input(type='password', name='password1', class=classNames.inputClass)\n    h1 Повторите пароль\n    input(type='password', name='password2', class=classNames.inputClass)\n    h1 Аватар\n    input(type='file', placeholder='Выберете аватар', name='avatar', class=classNames.inputClass)\n    input(type='submit', value='Зарегистироваться', class='submit', class=classNames.inputClass)\n    +button('Назад', 'back')\n\n\u002F\u002Fexport {template}","BaseComponents\u002Fbutton.pug":"mixin button(text, name)\n    button(class='', name=name) #{text}","BaseComponents\u002FpageTitle.pug":"mixin pageTitle(text)\n    h1(class='') #{text}","BaseComponents\u002FText.pug":"mixin text(text, name)\n    p(class='', name=name) #{text}","BaseComponents\u002Favatar.pug":"mixin avatar(src)\n    img(width=70, height=70, id='avatar', src=src)","BaseComponents\u002FclassNames.pug":"- var classNames= { inputClass:'input', formClass:'form' }"};
;pug_debug_line = 1;pug_debug_filename = "BaseComponents\u002Fbutton.pug";
pug_mixins["button"] = pug_interp = function(text, name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "BaseComponents\u002Fbutton.pug";
pug_html = pug_html + "\u003Cbutton" + (""+pug_attr("name", name, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "BaseComponents\u002Fbutton.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
};
;pug_debug_line = 1;pug_debug_filename = "BaseComponents\u002Fbutton.pug";
pug_mixins["button"] = pug_interp = function(text, name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "BaseComponents\u002Fbutton.pug";
pug_html = pug_html + "\u003Cbutton" + (""+pug_attr("name", name, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "BaseComponents\u002Fbutton.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
};
;pug_debug_line = 1;pug_debug_filename = "BaseComponents\u002FpageTitle.pug";
pug_mixins["pageTitle"] = pug_interp = function(text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "BaseComponents\u002FpageTitle.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "BaseComponents\u002FpageTitle.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
};
;pug_debug_line = 1;pug_debug_filename = "BaseComponents\u002FText.pug";
pug_mixins["text"] = pug_interp = function(text, name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "BaseComponents\u002FText.pug";
pug_html = pug_html + "\u003Cp" + (""+pug_attr("name", name, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "BaseComponents\u002FText.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
};
;pug_debug_line = 1;pug_debug_filename = "BaseComponents\u002Favatar.pug";





;pug_debug_line = 1;pug_debug_filename = "BaseComponents\u002FclassNames.pug";
var classNames= { inputClass:'input', formClass:'form' }
;pug_debug_line = 8;pug_debug_filename = "SignUpForm.pug";
pug_mixins["pageTitle"]('Зарегистрироваться');
;pug_debug_line = 10;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003Cform method=\"POST\" enctype=\"multipart\u002Fform-data\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "SignUpForm.pug";
pug_mixins["text"]('Имя');
;pug_debug_line = 12;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (pug_attr("class", pug_classes([classNames.inputClass], [true]), false, false)+" type=\"text\" name=\"name\"") + "\u002F\u003E";
;pug_debug_line = 13;pug_debug_filename = "SignUpForm.pug";
pug_mixins["text"]('Фамилия');
;pug_debug_line = 14;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (pug_attr("class", pug_classes([classNames.inputClass], [true]), false, false)+" type=\"text\" name=\"surname\"") + "\u002F\u003E";
;pug_debug_line = 15;pug_debug_filename = "SignUpForm.pug";
pug_mixins["text"]('Email');
;pug_debug_line = 16;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (pug_attr("class", pug_classes([classNames.inputClass], [true]), false, false)+" type=\"text\" name=\"email\"") + "\u002F\u003E";
;pug_debug_line = 17;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 17;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "Введите пароль\u003C\u002Fh1\u003E";
;pug_debug_line = 18;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (pug_attr("class", pug_classes([classNames.inputClass], [true]), false, false)+" type=\"password\" name=\"password1\"") + "\u002F\u003E";
;pug_debug_line = 19;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 19;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "Повторите пароль\u003C\u002Fh1\u003E";
;pug_debug_line = 20;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (pug_attr("class", pug_classes([classNames.inputClass], [true]), false, false)+" type=\"password\" name=\"password2\"") + "\u002F\u003E";
;pug_debug_line = 21;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 21;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "Аватар\u003C\u002Fh1\u003E";
;pug_debug_line = 22;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (pug_attr("class", pug_classes([classNames.inputClass], [true]), false, false)+" type=\"file\" placeholder=\"Выберете аватар\" name=\"avatar\"") + "\u002F\u003E";
;pug_debug_line = 23;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003Cinput" + (pug_attr("class", pug_classes(["submit",classNames.inputClass], [false,true]), false, false)+" type=\"submit\" value=\"Зарегистироваться\"") + "\u002F\u003E";
;pug_debug_line = 24;pug_debug_filename = "SignUpForm.pug";
pug_mixins["button"]('Назад', 'back');
pug_html = pug_html + "\u003C\u002Fform\u003E";
;pug_debug_line = 26;pug_debug_filename = "SignUpForm.pug";
pug_html = pug_html + "\u003C!--export {template}--\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}
export {template}