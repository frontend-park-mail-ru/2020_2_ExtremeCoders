function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug":"if(locals.screenWidth \u003E 800)\n    div(class=\"main-page mainPage\")\n        div(class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\")\n\n            div(class=\"column large-2 tab-12 mob-12 main-container\")\n                div(class=\"main-columns project_scroll\")\n                    div(id=\"add-folder-recived\" class=\"block plus radius\")\n\n                    if(locals.recivedFolderRecived)\n                        div(id=\"summary-recived\" class=\"triangle-down\")\n                    else\n                        div(id=\"summary-recived\" class=\"triangle-right\")\n                    a(id=\"recivedUn\" class=\"titles-category\") Входящие\n\n                    if(locals.recivedFolderRecived)\n                        div(id=\"recived\")\n                            if(locals.recivedFolder)\n                                each folder in locals.recivedFolder\n                                    div(class=\"input-group\")\n                                        div\n                                            input(class=\"folder-names\" readonly value=folder.Name id=folder.Name)\n                                        div(class=\"icon-group\" id=\"icon-group\")\n                                            div(class=\"edit-button radius\" id=folder.Name name=\"edit-folder\")\n                                                svg(id=folder.Name name=\"edit-folder\" class=\"block\" xmlns=\"http:\u002F\u002Fwww.w3.org\u002F2000\u002Fsvg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\")\n                                                    g(id=folder.Name name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\")\n                                                        path(id=folder.Name name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\")\n                                                        g(id=folder.Name name=\"edit-folder\" fill=\"#ffffff\")\n                                                            path(id=folder.Name name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\")\n\n                                            div(class=\"small-plus radius cross\" id=folder.Name name=\"delete-folder\")\n\n                    div(class=\"horizontal\")\n\n                    a(id=\"sendedUn\" class=\"block titles-category\") Исходящие\n\n            div(class=\"column large-4 tab-12 mob-12 main-container\")\n                div(class=\"bricks-wrapper h-group main-columns project_scroll\" name=\"letters\")\n                    if(locals.selectFolder)\n                      each letter in locals.selectFolder\n                        article(id=letter.Id class=\"brick entry format-standard\")\n                            div(id=letter.Id class=\"entry__text\")\n                                div(id=letter.Id class=\"entry__header\")\n                                    h1(id=letter.Id class=\"entry__title max-ch\") #{letter.Theme}\n\n                                if(!letter.IsWatched)\n                                    div(id=letter.Id class=\"h-full-width not-watched\")\n                                div(id=letter.Id class=\"entry__excerpt\")\n                                    p(id=letter.Id class=\"max-ch\") Получатель: #{letter.Receiver}\n                                div(id=letter.Id class=\"entry__excerpt\")\n                                    p(id=letter.Id class=\"max-ch\") Отправитель: #{letter.Sender}\n                                div(id=letter.Id class=\"entry__excerpt\")\n                                    p(id=letter.Id class=\"max-ch\") #{letter.Text}\n\n\n            div(class=\"column large-6 tab-12 mob-12 main-container\")\n                div(class=\"main-columns project_scroll\")\n                    if(locals.buttonPlus && letter.Id !== undefined)\n                        div(class=\"letter-board\")\n                            div(id=\"button-remove-letter\" class=\"delete-letter-button radius\")\n                                img(class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image\u002Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA\u002FwD\u002FAP+gvaeTAAAAmklEQVRIie2VMQoCMRBF\u002F1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT\u002Fi5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\")\n                            div(id=\"button-form-add-letter-folder\" class=\"small-plus radius\")\n                            div(id=\"delete-folder\" class=\"small-plus radius cross letter-board-last-element\")\n\n                    div(class=\"letter-container\")\n                        h3(id=letter.Id name=\"title-of-current\") #{letter.Theme}\n                        p(class=\"lead\") #{letter.Receiver}\n                        p(class=\"lead\") #{letter.Sender}\n                        p(class=\"lead\") #{letter.Text}\n\n\n    \u002F\u002Fформа добавления\n    div(class=\"form-add-folder-up hide\")\n        div(id=\"remove-folder-recived\" class=\"plus radius cross cross-modal\")\n        form(name=\"button-of-recived-folder\")\n            div(class=\"row\")\n                input(name=\"folderName\" type=\"text\" class=\"h-full-width\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\" required)\n                button(type=\"submit\" class=\"btn btn--medium btn--primary h-full-width\") Добавить\n\n    \u002F\u002Fформа добавления в папку\n    div(class=\"hide form-add-folder-up\")\n        div(id=\"remove-form-add-folder-up\" class=\"plus radius cross cross-modal\")\n        form(id=\"choose-folder\")\n            div(class=\"row\")\n                select(name=\"inFolderName\" class=\"h-full-width\")\n                    if(locals.recivedFolder)\n                        each folder in locals.recivedFolder\n                            option(value=folder.Name) #{folder.Name}\n\n\n            div(class=\"row\")\n                button(type=\"submit\" class=\"btn h-full-width\") Добавить\n\n\nelse\n    div(class=\"main-page mainPage\")\n        div(class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\")\n\n            if(locals.folderColumn)\n                div(class=\"column large-2 tab-12 mob-12 main-container\")\n                    div(class=\"main-columns project_scroll\")\n                        div(id=\"add-folder-recived\" class=\"block plus radius\")\n\n                        if(locals.recivedFolderRecived)\n                            div(id=\"summary-recived\" class=\"triangle-down\")\n                        else\n                            div(id=\"summary-recived\" class=\"triangle-right\")\n                        a(id=\"recivedUn\" class=\"titles-category\") Входящие\n\n                        if(locals.recivedFolderRecived)\n                            div(id=\"recived\")\n                                if(locals.recivedFolder)\n                                  each folder in locals.recivedFolder\n                                      div(class=\"input-group\")\n                                          div\n                                              input(class=\"folder-names\" readonly value=folder.Name id=folder.Name)\n                                          div(class=\"icon-group\" id=\"icon-group\")\n                                              div(class=\"edit-button radius\" id=folder.Name name=\"edit-folder\")\n                                                  svg(id=folder.Name name=\"edit-folder\" class=\"block\" xmlns=\"http:\u002F\u002Fwww.w3.org\u002F2000\u002Fsvg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\")\n                                                      g(id=folder.Name name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\")\n                                                          path(id=folder.Name name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\")\n                                                          g(id=folder.Name name=\"edit-folder\" fill=\"#ffffff\")\n                                                              path(id=folder.Name name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\")\n\n                                              div(class=\"small-plus radius cross\" id=folder.Name name=\"delete-folder\")\n\n                        div(class=\"horizontal\")\n\n                        a(id=\"sendedUn\" class=\"block titles-category\") Исходящие\n\n            if(locals.letterColumn)\n                div(class=\"column large-4 tab-12 mob-12 main-container\")\n\n                    a(id=\"back-to-folders\") \u003C Папки\n\n                    div(class=\"bricks-wrapper h-group main-columns project_scroll\" name=\"letters\")\n                        if(locals.selectFolder)\n                          each letter in locals.selectFolder\n                              article(id=letter.Id class=\"brick entry format-standard\")\n                                  div(id=letter.Id class=\"entry__text\")\n                                      div(id=letter.Id class=\"entry__header\")\n                                          h1(id=letter.Id class=\"entry__title max-ch\") #{letter.Theme}\n\n                                      if(!letter.IsWatched)\n                                          div(id=letter.Id class=\"h-full-width not-watched\")\n                                      div(id=letter.Id class=\"entry__excerpt\")\n                                          p(id=letter.Id class=\"max-ch\") Получатель: #{letter.Receiver}\n                                      div(id=letter.Id class=\"entry__excerpt\")\n                                          p(id=letter.Id class=\"max-ch\") Отправитель: #{letter.Sender}\n                                      div(id=letter.Id class=\"entry__excerpt\")\n                                          p(id=letter.Id class=\"max-ch\") #{letter.Text}\n\n            if(locals.oneLetterColumn)\n                div(class=\"column large-6 tab-12 mob-12 main-container\")\n                    div(class=\"main-columns project_scroll\")\n                        if(locals.buttonPlus && letter.Id !== undefined)\n                            div(class=\"letter-board\")\n                                a(id=\"back-to-letters\") \u003C К папкам\n                                div(class=\"letter-board-small\")\n                                    div(id=\"button-remove-letter\" class=\"delete-letter-button radius\")\n                                        img(class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image\u002Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA\u002FwD\u002FAP+gvaeTAAAAmklEQVRIie2VMQoCMRBF\u002F1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT\u002Fi5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\")\n                                    div(id=\"button-form-add-letter-folder\" class=\"small-plus radius\")\n                                    div(id=\"delete-folder\" class=\"small-plus radius cross letter-board-last-element\")\n\n                        div(class=\"letter-container\")\n                            h3(id=letter.Id name=\"title-of-current\") #{letter.Theme}\n                            p(class=\"lead\") #{letter.Receiver}\n                            p(class=\"lead\") #{letter.Sender}\n                            p(class=\"lead\") #{letter.Text}\n\n\n    \u002F\u002Fформа добавления\n    div(class=\"form-add-folder-up hide\")\n        div(id=\"remove-folder-recived\" class=\"plus radius cross cross-modal\")\n        form(name=\"button-of-recived-folder\")\n            div(class=\"row\")\n                input(name=\"folderName\" type=\"text\" class=\"h-full-width\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\" required)\n                button(type=\"submit\" class=\"btn btn--medium btn--primary h-full-width\") Добавить\n\n    \u002F\u002Fформа добавления в папку\n    div(class=\"hide form-add-folder-up\")\n        div(id=\"remove-form-add-folder-up\" class=\"plus radius cross cross-modal\")\n        form(id=\"choose-folder\")\n            div(class=\"row\")\n                select(name=\"inFolderName\" class=\"h-full-width\")\n                    if(locals.recivedFolder)\n                      each folder in locals.recivedFolder\n                          option(value=folder.Name) #{folder.Name}\n\n\n            div(class=\"row\")\n                button(type=\"submit\" class=\"btn h-full-width\") Добавить\n"};
;var locals_for_with = (locals || {});(function (letter) {;pug_debug_line = 1;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.screenWidth > 800)) {
;pug_debug_line = 2;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"main-page mainPage\"\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\"\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-2 tab-12 mob-12 main-container\"\u003E";
;pug_debug_line = 6;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"main-columns project_scroll\"\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"block plus radius\" id=\"add-folder-recived\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.recivedFolderRecived)) {
;pug_debug_line = 10;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"triangle-down\" id=\"summary-recived\"\u003E\u003C\u002Fdiv\u003E";
}
else {
;pug_debug_line = 12;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"triangle-right\" id=\"summary-recived\"\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 13;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca class=\"titles-category\" id=\"recivedUn\"\u003E";
;pug_debug_line = 13;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Входящие\u003C\u002Fa\u003E";
;pug_debug_line = 15;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.recivedFolderRecived)) {
;pug_debug_line = 16;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv id=\"recived\"\u003E";
;pug_debug_line = 17;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.recivedFolder)) {
;pug_debug_line = 18;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.recivedFolder
;(function(){
  var $$obj = locals.recivedFolder;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var folder = $$obj[pug_index0];
;pug_debug_line = 19;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 20;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"folder-names\""+pug_attr("readonly", true, true, false)+pug_attr("value", folder.Name, true, false)+pug_attr("id", folder.Name, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon-group\" id=\"icon-group\"\u003E";
;pug_debug_line = 23;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"edit-button radius\""+pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\"") + "\u003E";
;pug_debug_line = 24;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Csvg" + (" class=\"block\""+pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" xmlns=\"http:\u002F\u002Fwww.w3.org\u002F2000\u002Fsvg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\"") + "\u003E";
;pug_debug_line = 25;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cg" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"") + "\u003E";
;pug_debug_line = 26;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cpath" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\"") + "\u003E\u003C\u002Fpath\u003E";
;pug_debug_line = 27;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cg" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" fill=\"#ffffff\"") + "\u003E";
;pug_debug_line = 28;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cpath" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\"") + "\u003E\u003C\u002Fpath\u003E\u003C\u002Fg\u003E\u003C\u002Fg\u003E\u003C\u002Fsvg\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"small-plus radius cross\""+pug_attr("id", folder.Name, true, false)+" name=\"delete-folder\"") + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var folder = $$obj[pug_index0];
;pug_debug_line = 19;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 20;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"folder-names\""+pug_attr("readonly", true, true, false)+pug_attr("value", folder.Name, true, false)+pug_attr("id", folder.Name, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon-group\" id=\"icon-group\"\u003E";
;pug_debug_line = 23;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"edit-button radius\""+pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\"") + "\u003E";
;pug_debug_line = 24;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Csvg" + (" class=\"block\""+pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" xmlns=\"http:\u002F\u002Fwww.w3.org\u002F2000\u002Fsvg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\"") + "\u003E";
;pug_debug_line = 25;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cg" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"") + "\u003E";
;pug_debug_line = 26;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cpath" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\"") + "\u003E\u003C\u002Fpath\u003E";
;pug_debug_line = 27;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cg" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" fill=\"#ffffff\"") + "\u003E";
;pug_debug_line = 28;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cpath" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\"") + "\u003E\u003C\u002Fpath\u003E\u003C\u002Fg\u003E\u003C\u002Fg\u003E\u003C\u002Fsvg\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"small-plus radius cross\""+pug_attr("id", folder.Name, true, false)+" name=\"delete-folder\"") + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 32;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"horizontal\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca class=\"block titles-category\" id=\"sendedUn\"\u003E";
;pug_debug_line = 34;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Исходящие\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-4 tab-12 mob-12 main-container\"\u003E";
;pug_debug_line = 37;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"bricks-wrapper h-group main-columns project_scroll\" name=\"letters\"\u003E";
;pug_debug_line = 38;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.selectFolder)) {
;pug_debug_line = 39;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.selectFolder
;(function(){
  var $$obj = locals.selectFolder;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var letter = $$obj[pug_index1];
;pug_debug_line = 40;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Carticle" + (" class=\"brick entry format-standard\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 41;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 42;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__header\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 43;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1" + (" class=\"entry__title max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 43;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 45;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((!letter.IsWatched)) {
;pug_debug_line = 46;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"h-full-width not-watched\""+pug_attr("id", letter.Id, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 47;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Получатель: ";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 49;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 50;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 50;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Отправитель: ";
;pug_debug_line = 50;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 51;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 52;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 52;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var letter = $$obj[pug_index1];
;pug_debug_line = 40;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Carticle" + (" class=\"brick entry format-standard\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 41;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 42;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__header\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 43;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1" + (" class=\"entry__title max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 43;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 45;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((!letter.IsWatched)) {
;pug_debug_line = 46;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"h-full-width not-watched\""+pug_attr("id", letter.Id, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 47;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Получатель: ";
;pug_debug_line = 48;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 49;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 50;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 50;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Отправитель: ";
;pug_debug_line = 50;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 51;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 52;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 52;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-6 tab-12 mob-12 main-container\"\u003E";
;pug_debug_line = 56;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"main-columns project_scroll\"\u003E";
;pug_debug_line = 57;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.buttonPlus && letter.Id !== undefined)) {
;pug_debug_line = 58;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"letter-board\"\u003E";
;pug_debug_line = 59;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"delete-letter-button radius\" id=\"button-remove-letter\"\u003E";
;pug_debug_line = 60;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cimg class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image\u002Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA\u002FwD\u002FAP+gvaeTAAAAmklEQVRIie2VMQoCMRBF\u002F1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT\u002Fi5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 61;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"small-plus radius\" id=\"button-form-add-letter-folder\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"small-plus radius cross letter-board-last-element\" id=\"delete-folder\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 64;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"letter-container\"\u003E";
;pug_debug_line = 65;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch3" + (pug_attr("id", letter.Id, true, false)+" name=\"title-of-current\"") + "\u003E";
;pug_debug_line = 65;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
;pug_debug_line = 66;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 66;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 67;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 67;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 68;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 68;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 71;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003C!--форма добавления--\u003E";
;pug_debug_line = 72;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-add-folder-up hide\"\u003E";
;pug_debug_line = 73;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"plus radius cross cross-modal\" id=\"remove-folder-recived\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 74;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cform name=\"button-of-recived-folder\"\u003E";
;pug_debug_line = 75;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 76;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" name=\"folderName\" type=\"text\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\""+pug_attr("required", true, true, false)) + "\u002F\u003E";
;pug_debug_line = 77;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn btn--medium btn--primary h-full-width\" type=\"submit\"\u003E";
;pug_debug_line = 77;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Добавить\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 79;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003C!--форма добавления в папку--\u003E";
;pug_debug_line = 80;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"hide form-add-folder-up\"\u003E";
;pug_debug_line = 81;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"plus radius cross cross-modal\" id=\"remove-form-add-folder-up\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 82;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cform id=\"choose-folder\"\u003E";
;pug_debug_line = 83;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 84;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cselect class=\"h-full-width\" name=\"inFolderName\"\u003E";
;pug_debug_line = 85;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.recivedFolder)) {
;pug_debug_line = 86;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.recivedFolder
;(function(){
  var $$obj = locals.recivedFolder;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var folder = $$obj[pug_index2];
;pug_debug_line = 87;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Coption" + (pug_attr("value", folder.Name, true, false)) + "\u003E";
;pug_debug_line = 87;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var folder = $$obj[pug_index2];
;pug_debug_line = 87;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Coption" + (pug_attr("value", folder.Name, true, false)) + "\u003E";
;pug_debug_line = 87;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 90;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 91;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn h-full-width\" type=\"submit\"\u003E";
;pug_debug_line = 91;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Добавить\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
}
else {
;pug_debug_line = 95;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"main-page mainPage\"\u003E";
;pug_debug_line = 96;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\"\u003E";
;pug_debug_line = 98;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.folderColumn)) {
;pug_debug_line = 99;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-2 tab-12 mob-12 main-container\"\u003E";
;pug_debug_line = 100;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"main-columns project_scroll\"\u003E";
;pug_debug_line = 101;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"block plus radius\" id=\"add-folder-recived\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 103;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.recivedFolderRecived)) {
;pug_debug_line = 104;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"triangle-down\" id=\"summary-recived\"\u003E\u003C\u002Fdiv\u003E";
}
else {
;pug_debug_line = 106;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"triangle-right\" id=\"summary-recived\"\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 107;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca class=\"titles-category\" id=\"recivedUn\"\u003E";
;pug_debug_line = 107;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Входящие\u003C\u002Fa\u003E";
;pug_debug_line = 109;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.recivedFolderRecived)) {
;pug_debug_line = 110;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv id=\"recived\"\u003E";
;pug_debug_line = 111;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.recivedFolder)) {
;pug_debug_line = 112;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.recivedFolder
;(function(){
  var $$obj = locals.recivedFolder;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var folder = $$obj[pug_index3];
;pug_debug_line = 113;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 114;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 115;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"folder-names\""+pug_attr("readonly", true, true, false)+pug_attr("value", folder.Name, true, false)+pug_attr("id", folder.Name, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 116;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon-group\" id=\"icon-group\"\u003E";
;pug_debug_line = 117;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"edit-button radius\""+pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\"") + "\u003E";
;pug_debug_line = 118;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Csvg" + (" class=\"block\""+pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" xmlns=\"http:\u002F\u002Fwww.w3.org\u002F2000\u002Fsvg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\"") + "\u003E";
;pug_debug_line = 119;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cg" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"") + "\u003E";
;pug_debug_line = 120;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cpath" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\"") + "\u003E\u003C\u002Fpath\u003E";
;pug_debug_line = 121;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cg" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" fill=\"#ffffff\"") + "\u003E";
;pug_debug_line = 122;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cpath" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\"") + "\u003E\u003C\u002Fpath\u003E\u003C\u002Fg\u003E\u003C\u002Fg\u003E\u003C\u002Fsvg\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 124;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"small-plus radius cross\""+pug_attr("id", folder.Name, true, false)+" name=\"delete-folder\"") + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var folder = $$obj[pug_index3];
;pug_debug_line = 113;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 114;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 115;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"folder-names\""+pug_attr("readonly", true, true, false)+pug_attr("value", folder.Name, true, false)+pug_attr("id", folder.Name, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 116;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon-group\" id=\"icon-group\"\u003E";
;pug_debug_line = 117;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"edit-button radius\""+pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\"") + "\u003E";
;pug_debug_line = 118;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Csvg" + (" class=\"block\""+pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" xmlns=\"http:\u002F\u002Fwww.w3.org\u002F2000\u002Fsvg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\"") + "\u003E";
;pug_debug_line = 119;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cg" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"") + "\u003E";
;pug_debug_line = 120;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cpath" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\"") + "\u003E\u003C\u002Fpath\u003E";
;pug_debug_line = 121;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cg" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" fill=\"#ffffff\"") + "\u003E";
;pug_debug_line = 122;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cpath" + (pug_attr("id", folder.Name, true, false)+" name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\"") + "\u003E\u003C\u002Fpath\u003E\u003C\u002Fg\u003E\u003C\u002Fg\u003E\u003C\u002Fsvg\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 124;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"small-plus radius cross\""+pug_attr("id", folder.Name, true, false)+" name=\"delete-folder\"") + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 126;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"horizontal\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 128;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca class=\"block titles-category\" id=\"sendedUn\"\u003E";
;pug_debug_line = 128;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Исходящие\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 130;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.letterColumn)) {
;pug_debug_line = 131;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-4 tab-12 mob-12 main-container\"\u003E";
;pug_debug_line = 133;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca id=\"back-to-folders\"\u003E";
;pug_debug_line = 133;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003C Папки\u003C\u002Fa\u003E";
;pug_debug_line = 135;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"bricks-wrapper h-group main-columns project_scroll\" name=\"letters\"\u003E";
;pug_debug_line = 136;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.selectFolder)) {
;pug_debug_line = 137;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.selectFolder
;(function(){
  var $$obj = locals.selectFolder;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var letter = $$obj[pug_index4];
;pug_debug_line = 138;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Carticle" + (" class=\"brick entry format-standard\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 139;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 140;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__header\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 141;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1" + (" class=\"entry__title max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 141;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 143;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((!letter.IsWatched)) {
;pug_debug_line = 144;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"h-full-width not-watched\""+pug_attr("id", letter.Id, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 145;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 146;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 146;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Получатель: ";
;pug_debug_line = 146;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 147;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 148;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 148;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Отправитель: ";
;pug_debug_line = 148;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 149;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 150;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 150;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var letter = $$obj[pug_index4];
;pug_debug_line = 138;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Carticle" + (" class=\"brick entry format-standard\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 139;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__text\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 140;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__header\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 141;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch1" + (" class=\"entry__title max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 141;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 143;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((!letter.IsWatched)) {
;pug_debug_line = 144;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"h-full-width not-watched\""+pug_attr("id", letter.Id, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 145;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 146;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 146;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Получатель: ";
;pug_debug_line = 146;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 147;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 148;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 148;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Отправитель: ";
;pug_debug_line = 148;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 149;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"entry__excerpt\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 150;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp" + (" class=\"max-ch\""+pug_attr("id", letter.Id, true, false)) + "\u003E";
;pug_debug_line = 150;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 152;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.oneLetterColumn)) {
;pug_debug_line = 153;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"column large-6 tab-12 mob-12 main-container\"\u003E";
;pug_debug_line = 154;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"main-columns project_scroll\"\u003E";
;pug_debug_line = 155;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.buttonPlus && letter.Id !== undefined)) {
;pug_debug_line = 156;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"letter-board\"\u003E";
;pug_debug_line = 157;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ca id=\"back-to-letters\"\u003E";
;pug_debug_line = 157;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003C К папкам\u003C\u002Fa\u003E";
;pug_debug_line = 158;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"letter-board-small\"\u003E";
;pug_debug_line = 159;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"delete-letter-button radius\" id=\"button-remove-letter\"\u003E";
;pug_debug_line = 160;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cimg class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image\u002Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA\u002FwD\u002FAP+gvaeTAAAAmklEQVRIie2VMQoCMRBF\u002F1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT\u002Fi5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 161;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"small-plus radius\" id=\"button-form-add-letter-folder\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 162;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"small-plus radius cross letter-board-last-element\" id=\"delete-folder\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 164;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"letter-container\"\u003E";
;pug_debug_line = 165;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Ch3" + (pug_attr("id", letter.Id, true, false)+" name=\"title-of-current\"") + "\u003E";
;pug_debug_line = 165;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
;pug_debug_line = 166;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 166;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 167;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 167;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 168;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cp class=\"lead\"\u003E";
;pug_debug_line = 168;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 171;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003C!--форма добавления--\u003E";
;pug_debug_line = 172;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-add-folder-up hide\"\u003E";
;pug_debug_line = 173;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"plus radius cross cross-modal\" id=\"remove-folder-recived\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 174;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cform name=\"button-of-recived-folder\"\u003E";
;pug_debug_line = 175;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 176;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"h-full-width\""+" name=\"folderName\" type=\"text\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\""+pug_attr("required", true, true, false)) + "\u002F\u003E";
;pug_debug_line = 177;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn btn--medium btn--primary h-full-width\" type=\"submit\"\u003E";
;pug_debug_line = 177;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Добавить\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 179;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003C!--форма добавления в папку--\u003E";
;pug_debug_line = 180;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"hide form-add-folder-up\"\u003E";
;pug_debug_line = 181;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"plus radius cross cross-modal\" id=\"remove-form-add-folder-up\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 182;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cform id=\"choose-folder\"\u003E";
;pug_debug_line = 183;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 184;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cselect class=\"h-full-width\" name=\"inFolderName\"\u003E";
;pug_debug_line = 185;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
if ((locals.recivedFolder)) {
;pug_debug_line = 186;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
// iterate locals.recivedFolder
;(function(){
  var $$obj = locals.recivedFolder;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var folder = $$obj[pug_index5];
;pug_debug_line = 187;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Coption" + (pug_attr("value", folder.Name, true, false)) + "\u003E";
;pug_debug_line = 187;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var folder = $$obj[pug_index5];
;pug_debug_line = 187;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Coption" + (pug_attr("value", folder.Name, true, false)) + "\u003E";
;pug_debug_line = 187;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 190;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 191;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn h-full-width\" type=\"submit\"\u003E";
;pug_debug_line = 191;pug_debug_filename = ".\u002Fsrc\u002FViews\u002FPugTemplates\u002FmainPage.pug";
pug_html = pug_html + "Добавить\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
}}.call(this,"letter" in locals_for_with?locals_for_with.letter:typeof letter!=="undefined"?letter:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}export {template}
