!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=465)}({465:function(e,t,n){e.exports=n(466)},466:function(e,t,n){"use strict";n.r(t);n(467),n(468),n(469),n(470),n(471),n(472),n(473)},467:function(e,t){!function(e){if(void 0===e)throw Error("jQuery should be loaded before CKEditor jQuery adapter.");if("undefined"==typeof CKEDITOR)throw Error("CKEditor should be loaded before CKEditor jQuery adapter.");CKEDITOR.config.jqueryOverrideVal=void 0===CKEDITOR.config.jqueryOverrideVal||CKEDITOR.config.jqueryOverrideVal,e.extend(e.fn,{ckeditorGet:function(){var e=this.eq(0).data("ckeditorInstance");if(!e)throw"CKEditor is not initialized yet, use ckeditor() with a callback.";return e},ckeditor:function(t,n){if(!CKEDITOR.env.isCompatible)throw Error("The environment is incompatible.");if(!e.isFunction(t)){var i=n;n=t,t=i}var o=[];n=n||{},this.each((function(){var i=e(this),a=i.data("ckeditorInstance"),r=i.data("_ckeditorInstanceLock"),l=this,s=new e.Deferred;o.push(s.promise()),a&&!r?(t&&t.apply(a,[this]),s.resolve()):r?a.once("instanceReady",(function(){setTimeout((function e(){a.element?(a.element.$==l&&t&&t.apply(a,[l]),s.resolve()):setTimeout(e,100)}),0)}),null,null,9999):((n.autoUpdateElement||void 0===n.autoUpdateElement&&CKEDITOR.config.autoUpdateElement)&&(n.autoUpdateElementJquery=!0),n.autoUpdateElement=!1,i.data("_ckeditorInstanceLock",!0),a=e(this).is("textarea")?CKEDITOR.replace(l,n):CKEDITOR.inline(l,n),i.data("ckeditorInstance",a),a.on("instanceReady",(function(n){var o=n.editor;setTimeout((function a(){if(o.element){if(n.removeListener(),o.on("dataReady",(function(){i.trigger("dataReady.ckeditor",[o])})),o.on("setData",(function(e){i.trigger("setData.ckeditor",[o,e.data])})),o.on("getData",(function(e){i.trigger("getData.ckeditor",[o,e.data])}),999),o.on("destroy",(function(){i.trigger("destroy.ckeditor",[o])})),o.on("save",(function(){return e(l.form).submit(),!1}),null,null,20),o.config.autoUpdateElementJquery&&i.is("textarea")&&e(l.form).length){var r=function(){i.ckeditor((function(){o.updateElement()}))};e(l.form).submit(r),e(l.form).bind("form-pre-serialize",r),i.bind("destroy.ckeditor",(function(){e(l.form).unbind("submit",r),e(l.form).unbind("form-pre-serialize",r)}))}o.on("destroy",(function(){i.removeData("ckeditorInstance")})),i.removeData("_ckeditorInstanceLock"),i.trigger("instanceReady.ckeditor",[o]),t&&t.apply(o,[l]),s.resolve()}else setTimeout(a,100)}),0)}),null,null,9999))}));var a=new e.Deferred;return this.promise=a.promise(),e.when.apply(this,o).then((function(){a.resolve()})),this.editor=this.eq(0).data("ckeditorInstance"),this}}),CKEDITOR.config.jqueryOverrideVal&&(e.fn.val=CKEDITOR.tools.override(e.fn.val,(function(t){return function(n){if(arguments.length){var i=this,o=[],a=this.each((function(){var i=e(this),a=i.data("ckeditorInstance");if(i.is("textarea")&&a){var r=new e.Deferred;return a.setData(n,(function(){r.resolve()})),o.push(r.promise()),!0}return t.call(i,n)}));if(o.length){var r=new e.Deferred;return e.when.apply(this,o).done((function(){r.resolveWith(i)})),r.promise()}return a}var l=(a=e(this).eq(0)).data("ckeditorInstance");return a.is("textarea")&&l?l.getData():t.call(a)}})))}(window.jQuery)},468:function(e,t){CKEDITOR.plugins.add("normalizeonchange",{init:function(e){CKEDITOR.on("instanceReady",(function(e){e.editor.on("change",(function(t){var n=e.editor.getSelection();if(n){var i=n.getStartElement();i&&i.$&&n.getStartElement().$.normalize()}}))}))}})},469:function(e,t){CKEDITOR.plugins.add("concrete5inline",{init:function(e){e.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&(e.addCommand("c5save",{exec:function(e){$("#"+e.element.$.id+"_content").val(e.getData()),ConcreteEvent.fire("EditModeBlockSaveInline"),e.destroy()}}),e.addCommand("c5cancel",{exec:function(e){ConcreteEvent.fire("EditModeExitInline"),e.destroy()}}),e.ui.addButton&&(e.ui.addButton("concrete_save",{label:e.lang.common.ok,command:"c5save",toolbar:"document,0"}),e.ui.addButton("concrete_cancel",{label:e.lang.common.cancel,command:"c5cancel",toolbar:"document,1"})))}})},470:function(e,t){CKEDITOR.plugins.add("concrete5link",{requires:"link",init:function(e){CKEDITOR.on("dialogDefinition",(function(t){var n=t.data.name,i=t.data.definition,o=e.lang.common,a=function(e,t){t[e]||(t[e]={}),t[e][this.id]=this.getValue()||""},r=function(e){return a.call(this,"target",e)},l=function(){return CKEDITOR.plugins.link.getSelectedLink(t.editor)};if("link"==n){var s=i.getContents("info");null===s.get("sitemapBrowse")&&t.editor.config.sitemap&&s.add({type:"button",id:"sitemapBrowse",label:"Sitemap",title:"Sitemap",onClick:function(){jQuery.fn.dialog.open({width:"90%",height:"70%",modal:!1,title:ccmi18n_sitemap.choosePage,href:CCM_DISPATCHER_FILENAME+"/ccm/system/dialogs/page/sitemap_selector"}),ConcreteEvent.unsubscribe("SitemapSelectPage"),ConcreteEvent.subscribe("SitemapSelectPage",(function(e,t){jQuery.fn.dialog.closeTop();var n=i.dialog.getContentElement("info","url");n&&n.setValue(CCM_APPLICATION_URL+"/index.php?cID="+t.cID)}))}},"browse");var c=i.getContents("target");if(null!==c.get("linkTargetType")){var d=c.get("linkTargetType");"lightbox"!=d.items[3][1]&&(d.items.splice(3,0,["<lightbox>","lightbox"]),d.items.join()),null===c.get("lightboxFeatures")&&c.elements.push({type:"vbox",width:"100%",align:"center",padding:2,id:"lightboxFeatures",children:[{type:"fieldset",label:"Lightbox Features",children:[{type:"hbox",children:[{type:"checkbox",id:"imageLightbox",label:"Linking to an image",setup:function(e){var t=l();null!==t&&void 0!==e.target&&("lightbox"==e.target.name&&"image"==t.data("concrete5-link-lightbox")?this.setValue(1):this.setValue(0))},commit:r,onChange:function(e){this.getValue()?this.getDialog().getContentElement("target","lightboxDimensions").getElement().hide():this.getDialog().getContentElement("target","lightboxDimensions").getElement().show()}}]},{type:"hbox",id:"lightboxDimensions",children:[{type:"text",widths:["50%","50%"],labelLayout:"horizontal",label:o.width,id:"lightboxWidth",setup:function(e){var t=l();null!==t&&void 0!==e.target&&("lightbox"==e.target.name&&t.hasAttribute("data-concrete5-link-lightbox-width")?this.setValue(t.data("concrete5-link-lightbox-width")):this.setValue(null))},commit:r},{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:o.height,id:"lightboxHeight",setup:function(e){var t=l();null!==t&&void 0!==e.target&&("lightbox"==e.target.name&&t.hasAttribute("data-concrete5-link-lightbox-height")?this.setValue(t.data("concrete5-link-lightbox-height")):this.setValue(null))},commit:r}],setup:function(){this.getDialog().getContentElement("target","imageLightbox").getValue()?this.getElement().hide():this.getElement().show()}}]}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().hide(),"lightbox"!=this.getDialog().getContentElement("target","linkTargetType").getValue()&&this.getElement().hide()}}),d.onChange=CKEDITOR.tools.override(d.onChange,(function(e){return function(){var t=this.getDialog().getContentElement("target","lightboxFeatures").getElement();"lightbox"!=this.getValue()||this._.selectedElement?t.hide():t.show(),e.call(this)}})),d.setup=function(e){e.target&&("lightbox"==e.target.name&&(e.target.type=e.target.name),this.setValue(e.target.type||"notSet")),this.onChange.call(this)},d.commit=function(e){e.target||(e.target={}),e.target.type=this.getValue()},i.onOk=CKEDITOR.tools.override(i.onOk,(function(e){return function(){var t={},n={};this.commitContent(t),e.call(this);var i=l();null!==i&&("lightbox"==t.target.type?t.target.imageLightbox?(i.data("concrete5-link-lightbox","image"),n={"data-concrete5-link-lightbox-width":1,"data-concrete5-link-lightbox-height":1}):(i.data("concrete5-link-lightbox","iframe"),t.target.lightboxWidth&&t.target.lightboxHeight?(i.data("concrete5-link-lightbox-width",t.target.lightboxWidth),i.data("concrete5-link-lightbox-height",t.target.lightboxHeight)):n={"data-concrete5-link-lightbox-width":1,"data-concrete5-link-lightbox-height":1}):n={"data-concrete5-link-lightbox":1,"data-concrete5-link-lightbox-width":1,"data-concrete5-link-lightbox-height":1},i.removeAttributes(n))}}))}}}))}})},471:function(e,t){CKEDITOR.plugins.add("concrete5filemanager",{requires:"filebrowser",init:function(){CKEDITOR.on("dialogDefinition",(function(e){for(var t=e.editor,n=e.data.definition,i=n.contents.length,o=0;o<i;o++){var a=n.contents[o].get("browse");null!==a&&(a.hidden=!1,a.onClick=function(){t._.filebrowserSe=this;var e=this.getDialog();ConcreteFileManager.launchDialog((function(n){jQuery.fn.dialog.showLoader(),ConcreteFileManager.getFileDetails(n.fID,(function(n){jQuery.fn.dialog.hideLoader();var i=n.files[0];"image"!=e.getName()&&"image2"!=e.getName()||"info"!=e._.currentTabId?CKEDITOR.tools.callFunction(t._.filebrowserFn,i.urlDownload):CKEDITOR.tools.callFunction(t._.filebrowserFn,i.urlInline,(function(){var t;e.dontResetSize=!0,(t=e.getContentElement("info","txtWidth"))&&t.setValue(""),(t=e.getContentElement("info","width"))&&t.setValue(""),(t=e.getContentElement("info","txtHeight"))&&t.setValue(""),(t=e.getContentElement("info","height"))&&t.setValue(""),(t=e.getContentElement("info","txtAlt"))&&t.setValue(i.title),(t=e.getContentElement("info","alt"))&&t.setValue(i.title)}))}))}))})}}))}})},472:function(e,t){CKEDITOR.plugins.add("concrete5styles",{requires:["widget","stylescombo","menubutton"],init:function(e){},afterInit:function(e){var t=this;function n(e){return{exec:function(t){var n=e.html,i=t.getSelection(),o=i&&i.getSelectedText();if(-1!=n.indexOf("> </")&&o){for(var a=["address","article","aside","audio","blockquote","canvas","dd","div","dl","fieldset","figcaption","figure","figcaption","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","noscript","ol","output","p","pre","section","span","table","tfoot","ul","video"],r=i.getRanges(),l=new CKEDITOR.dom.element("div"),s=0,c=r.length;s<c;++s){var d=r[s],u=d.createBookmark2();l.append(d.cloneContents()),d.moveToBookmark(u),d.select()}for(var g=l.getHtml(),h=0;h<a.length;h++){var f=new RegExp("(<"+a[h]+"[^>]*>|</"+a[h]+">)","gi");g=g.replace(f,"")}n=n.replace("> </",">"+g+"</")}t.insertHtml(n)}}}var i={name:"snippets",icon:"snippet.png",title:"Snippets",items:[]};if(e.config.snippets&&($.each(e.config.snippets,(function(t,n){e.widgets.add(n.scsHandle,{template:n.scsName});var o={};o.name=n.scsHandle,o.icon="snippet.png",o.title=n.scsName,o.html='<span class="ccm-content-editor-snippet" contenteditable="false" data-scsHandle="'+n.scsHandle+'">'+n.scsName+"</span>",i.items.push(o)})),function(i){for(var o=i.items,a={},r=0;r<o.length;r++){var l=o[r],s=l.name;e.addCommand(s,n(l)),a[s]={label:l.title,command:s,group:i.name,role:"menuitem"}}e.addMenuGroup(i.name,1),e.addMenuItems(a),e.ui.add(i.name,CKEDITOR.UI_MENUBUTTON,{label:i.title,icon:t.path+"/icons/"+i.icon,toolbar:i.toolbar||"insert",onMenu:function(){var e={};for(var t in a)e[t]=CKEDITOR.TRISTATE_OFF;return e}})}(i,i.name)),e.config.classes){var o=[];$.each(e.config.classes,(function(){var e={};e.name=this.title,void 0!==this.element?e.element=this.element:void 0!==this.forceBlock&&1==this.forceBlock?e.element=["h1","h2","h3","h4","h5","h6","p"]:e.element="span",void 0!==this.spanClass&&(e.attributes={class:this.spanClass}),void 0!==this.attributes&&(e.attributes=this.attributes),void 0!==this.styles&&(e.styles=this.styles),"widget"===this.type&&void 0!==this.widget&&(e.type="widget",e.widget=this.widget),o.push(e)})),e.fire("stylesSet",{styles:o})}}})},473:function(e,t){CKEDITOR.plugins.add("concrete5uploadimage",{requires:"uploadimage",init:function(e){e.on("fileUploadRequest",(function(e){var t=e.data.fileLoader,n=t.xhr,i=new FormData;i.append("ccm_token",CCM_SECURITY_TOKEN),i.append("files[]",t.file,t.fileName),n.send(i),e.stop()})),e.on("fileUploadResponse",(function(e){e.stop();var t=e.data,n=t.fileLoader.xhr;if(200==n.status){var i=jQuery.parseJSON(n.responseText);i.files.length>0&&(t.url=i.files[0].urlInline)}else t.message=n.responseText,e.cancel()}))}})}});