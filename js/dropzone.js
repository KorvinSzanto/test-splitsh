!function(){function a(b,c,d){var e=a.resolve(b);if(null==e){d=d||b,c=c||"root";var f=new Error('Failed to require "'+d+'" from "'+c+'"');throw f.path=d,f.parent=c,f.require=!0,f}var g=a.modules[e];return g.exports||(g.exports={},g.client=g.component=!0,g.call(this,g.exports,a.relative(e),g)),g.exports}var b=Object.prototype.hasOwnProperty;a.modules={},a.aliases={},a.resolve=function(c){"/"===c.charAt(0)&&(c=c.slice(1));for(var d=c+"/index.js",e=[c,c+".js",c+".json",c+"/index.js",c+"/index.json"],f=0;f<e.length;f++){var c=e[f];if(b.call(a.modules,c))return c}if(b.call(a.aliases,d))return a.aliases[d]},a.normalize=function(a,b){var c=[];if("."!=b.charAt(0))return b;a=a.split("/"),b=b.split("/");for(var d=0;d<b.length;++d)".."==b[d]?a.pop():"."!=b[d]&&""!=b[d]&&c.push(b[d]);return a.concat(c).join("/")},a.register=function(b,c){a.modules[b]=c},a.alias=function(c,d){if(!b.call(a.modules,c))throw new Error('Failed to alias "'+c+'", it does not exist');a.aliases[d]=c},a.relative=function(c){function d(a,b){for(var c=a.length;c--;)if(a[c]===b)return c;return-1}function e(b){var d=e.resolve(b);return a(d,c,b)}var f=a.normalize(c,"..");return e.resolve=function(b){var e=b.charAt(0);if("/"==e)return b.slice(1);if("."==e)return a.normalize(f,b);var g=c.split("/"),h=d(g,"deps")+1;return h||(h=0),b=g.slice(0,h+1).join("/")+"/deps/"+b},e.exists=function(c){return b.call(a.modules,e.resolve(c))},e},a.register("component-emitter/index.js",function(a,b,c){function d(a){if(a)return e(a)}function e(a){for(var b in d.prototype)a[b]=d.prototype[b];return a}c.exports=d,d.prototype.on=function(a,b){return this._callbacks=this._callbacks||{},(this._callbacks[a]=this._callbacks[a]||[]).push(b),this},d.prototype.once=function(a,b){function c(){d.off(a,c),b.apply(this,arguments)}var d=this;return this._callbacks=this._callbacks||{},b._off=c,this.on(a,c),this},d.prototype.off=d.prototype.removeListener=d.prototype.removeAllListeners=function(a,b){this._callbacks=this._callbacks||{};var c=this._callbacks[a];if(!c)return this;if(1==arguments.length)return delete this._callbacks[a],this;var d=c.indexOf(b._off||b);return~d&&c.splice(d,1),this},d.prototype.emit=function(a){this._callbacks=this._callbacks||{};var b=[].slice.call(arguments,1),c=this._callbacks[a];if(c){c=c.slice(0);for(var d=0,e=c.length;d<e;++d)c[d].apply(this,b)}return this},d.prototype.listeners=function(a){return this._callbacks=this._callbacks||{},this._callbacks[a]||[]},d.prototype.hasListeners=function(a){return!!this.listeners(a).length}}),a.register("dropzone/index.js",function(a,b,c){c.exports=b("./lib/dropzone.js")}),a.register("dropzone/lib/dropzone.js",function(a,b,c){(function(){var a,d,e,f,g,h,i,j={}.hasOwnProperty,k=function(a,b){function c(){this.constructor=a}for(var d in b)j.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},l=[].slice;d="undefined"!=typeof Emitter&&null!==Emitter?Emitter:b("emitter"),h=function(){},a=function(a){function b(a,c){var d,f,h,i,j;if(this.element=a,this.version=b.version,this.defaultOptions.previewTemplate=this.defaultOptions.previewTemplate.replace(/\n*/g,""),"string"==typeof this.element&&(this.element=document.querySelector(this.element)),!this.element||null==this.element.nodeType)throw new Error("Invalid dropzone element.");if(b.forElement(this.element))throw new Error("Dropzone already attached.");if(b.instances.push(this),d=this.element.id,f=null!=(j=d?b.options[e(d)]:void 0)?j:{},h=function(){var a,b,c,d,e,f,g;for(d=arguments[0],c=2<=arguments.length?l.call(arguments,1):[],f=0,g=c.length;f<g;f++){b=c[f];for(a in b)e=b[a],d[a]=e}return d},this.options=h({},this.defaultOptions,f,null!=c?c:{}),null==this.options.url&&(this.options.url=this.element.action),!this.options.url)throw new Error("No URL provided.");return b.isBrowserSupported()?((i=this.getExistingFallback())&&i.parentNode&&i.parentNode.removeChild(i),this.previewsContainer=this.options.previewsContainer?g(this.options.previewsContainer):this.element,void this.init()):this.options.fallback.call(this)}return k(b,a),b.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","selectedfiles","addedfile","removedfile","thumbnail","error","processingfile","uploadprogress","sending","success","complete","reset"],b.prototype.defaultOptions={url:null,parallelUploads:2,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:2,thumbnailWidth:100,thumbnailHeight:100,params:{},clickable:!0,enqueueForUpload:!0,previewsContainer:null,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",accept:function(a,b){return b()},init:function(){return h},fallback:function(){var a,b,c,d,e,f;for(this.element.className=""+this.element.className+" browser-not-supported",f=this.element.getElementsByTagName("div"),d=0,e=f.length;d<e;d++)a=f[d],/(^| )message($| )/.test(a.className)&&(b=a,a.className="message");return b||(b=g('<div class="message"></div>'),this.element.appendChild(b)),c=b.getElementsByTagName("span")[0],c&&(c.textContent=this.options.dictFallbackMessage),this.element.appendChild(this.getFallbackForm())},drop:function(a){return this.element.classList.remove("drag-hover")},dragstart:h,dragend:function(a){return this.element.classList.remove("drag-hover")},dragenter:function(a){return this.element.classList.add("drag-hover")},dragover:function(a){return this.element.classList.add("drag-hover")},dragleave:function(a){return this.element.classList.remove("drag-hover")},selectedfiles:function(a){if(this.element===this.previewsContainer)return this.element.classList.add("started")},reset:function(){return this.element.classList.remove("started")},addedfile:function(a){return a.previewTemplate=g(this.options.previewTemplate),this.previewsContainer.appendChild(a.previewTemplate),a.previewTemplate.querySelector(".filename span").textContent=a.name,a.previewTemplate.querySelector(".details").appendChild(g('<div class="size">'+this.filesize(a.size)+"</div>"))},removedfile:function(a){return a.previewTemplate.parentNode.removeChild(a.previewTemplate)},thumbnail:function(a,b){return a.previewTemplate.classList.remove("file-preview"),a.previewTemplate.classList.add("image-preview"),a.previewTemplate.querySelector(".details").appendChild(g('<img alt="'+a.name+'" src="'+b+'"/>'))},error:function(a,b){return a.previewTemplate.classList.add("error"),a.previewTemplate.querySelector(".error-message span").textContent=b},processingfile:function(a){return a.previewTemplate.classList.add("processing")},uploadprogress:function(a,b){return a.previewTemplate.querySelector(".progress .upload").style.width=""+b+"%"},sending:h,success:function(a){return a.previewTemplate.classList.add("success")},complete:h,previewTemplate:'<div class="preview file-preview">\n  <div class="details">\n   <div class="filename"><span></span></div>\n  </div>\n  <div class="progress"><span class="upload"></span></div>\n  <div class="success-mark"><span>✔</span></div>\n  <div class="error-mark"><span>✘</span></div>\n  <div class="error-message"><span></span></div>\n</div>'},b.prototype.init=function(){var a,b,c,d,e,f,h=this;for("form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".message")&&this.element.appendChild(g('<div class="default message">'+this.options.dictDefaultMessage+"</div>")),this.options.clickable&&(this.hiddenFileInput=document.createElement("input"),this.hiddenFileInput.setAttribute("type","file"),this.hiddenFileInput.setAttribute("multiple","multiple"),this.hiddenFileInput.style.display="none",document.body.appendChild(this.hiddenFileInput),this.hiddenFileInput.addEventListener("change",function(){var a;if(a=h.hiddenFileInput.files,a.length)return h.emit("selectedfiles",a),h.handleFiles(a)})),this.files=[],this.filesQueue=[],this.filesProcessing=[],this.URL=null!=(e=window.URL)?e:window.webkitURL,f=this.events,c=0,d=f.length;c<d;c++)a=f[c],this.on(a,this.options[a]);return b=function(a){return a.stopPropagation(),a.preventDefault?a.preventDefault():a.returnValue=!1},this.listeners={dragstart:function(a){return h.emit("dragstart",a)},dragenter:function(a){return b(a),h.emit("dragenter",a)},dragover:function(a){return b(a),h.emit("dragover",a)},dragleave:function(a){return h.emit("dragleave",a)},drop:function(a){return b(a),h.drop(a),h.emit("drop",a)},dragend:function(a){return h.emit("dragend",a)},click:function(a){if(h.options.clickable)return a.target===h.element||a.target===h.element.querySelector(".message")?h.hiddenFileInput.click():void 0}},this.enable(),this.options.init.call(this)},b.prototype.getFallbackForm=function(){var a,b,c,d;return(a=this.getExistingFallback())?a:(c='<div class="fallback">',this.options.dictFallbackText&&(c+="<p>"+this.options.dictFallbackText+"</p>"),c+='<input type="file" name="'+this.options.paramName+'" multiple="multiple" /><button type="submit">Upload!</button></div>',b=g(c),"FORM"!==this.element.tagName?(d=g('<form action="'+this.options.url+'" enctype="multipart/form-data" method="post"></form>'),d.appendChild(b)):(this.element.setAttribute("enctype","multipart/form-data"),this.element.setAttribute("method","post")),null!=d?d:b)},b.prototype.getExistingFallback=function(){var a,b,c,d,e,f;for(b=function(a){var b,c,d;for(c=0,d=a.length;c<d;c++)if(b=a[c],/(^| )fallback($| )/.test(b.className))return b},f=["div","form"],d=0,e=f.length;d<e;d++)if(c=f[d],a=b(this.element.getElementsByTagName("div")))return a},b.prototype.setupEventListeners=function(){var a,b,c,d;c=this.listeners,d=[];for(a in c)b=c[a],d.push(this.element.addEventListener(a,b,!1));return d},b.prototype.removeEventListeners=function(){var a,b,c,d;c=this.listeners,d=[];for(a in c)b=c[a],d.push(this.element.removeEventListener(a,b,!1));return d},b.prototype.disable=function(){return this.options.clickable&&this.element.classList.remove("clickable"),this.removeEventListeners(),this.filesProcessing=[],this.filesQueue=[]},b.prototype.enable=function(){return this.options.clickable&&this.element.classList.add("clickable"),this.setupEventListeners()},b.prototype.filesize=function(a){var b;return a>=1e11?(a/=1e11,b="TB"):a>=1e8?(a/=1e8,b="GB"):a>=1e5?(a/=1e5,b="MB"):a>=100?(a/=100,b="KB"):(a*=10,b="b"),"<strong>"+Math.round(a)/10+"</strong> "+b},b.prototype.drop=function(a){var b;if(a.dataTransfer)return b=a.dataTransfer.files,this.emit("selectedfiles",b),b.length?this.handleFiles(b):void 0},b.prototype.handleFiles=function(a){var b,c,d,e;for(e=[],c=0,d=a.length;c<d;c++)b=a[c],e.push(this.addFile(b));return e},b.prototype.accept=function(a,b){return a.size>1024*this.options.maxFilesize*1024?b("File is too big ("+Math.round(a.size/1024/10.24)/100+"MB). Max filesize: "+this.options.maxFilesize+"MB"):this.options.accept.call(this,a,b)},b.prototype.addFile=function(a){var b=this;return this.files.push(a),this.emit("addedfile",a),this.options.createImageThumbnails&&a.type.match(/image.*/)&&a.size<=1024*this.options.maxThumbnailFilesize*1024&&this.createThumbnail(a),this.accept(a,function(c){return c?b.errorProcessing(a,c):b.options.enqueueForUpload?(b.filesQueue.push(a),b.processQueue()):void 0})},b.prototype.removeFile=function(a){if(a.processing)throw new Error("Can't remove file currently processing");if(this.files=i(this.files,a),this.filesQueue=i(this.filesQueue,a),this.emit("removedfile",a),0===this.files.length)return this.emit("reset")},b.prototype.createThumbnail=function(a){var b,c=this;return b=new FileReader,b.onload=function(){var d;return d=new Image,d.onload=function(){var b,e,f,g,h,i,j,k,l,m,n,o,p;return b=document.createElement("canvas"),e=b.getContext("2d"),i=0,j=0,h=d.width,f=d.height,b.width=c.options.thumbnailWidth,b.height=c.options.thumbnailHeight,o=0,p=0,n=b.width,l=b.height,g=d.width/d.height,m=b.width/b.height,d.height<b.height||d.width<b.width?(l=f,n=h):g>m?(f=d.height,h=f*m):(h=d.width,f=h/m),i=(d.width-h)/2,j=(d.height-f)/2,p=(b.height-l)/2,o=(b.width-n)/2,e.drawImage(d,i,j,h,f,o,p,n,l),k=b.toDataURL("image/png"),c.emit("thumbnail",a,k)},d.src=b.result},b.readAsDataURL(a)},b.prototype.processQueue=function(){var a,b,c;for(b=this.options.parallelUploads,c=this.filesProcessing.length,a=c;a<b;){if(!this.filesQueue.length)return;this.processFile(this.filesQueue.shift()),a++}},b.prototype.processFile=function(a){return this.filesProcessing.push(a),a.processing=!0,this.emit("processingfile",a),this.uploadFile(a)},b.prototype.uploadFile=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p=this;if(j=new XMLHttpRequest,j.open("POST",this.options.url,!0),c=function(){return p.errorProcessing(a,j.responseText||"Server responded with "+j.status+" code.")},j.onload=function(b){var d,e;return 200<=(e=j.status)&&e<300?(p.emit("uploadprogress",a,100),d=j.responseText,j.getResponseHeader("content-type")&&~j.getResponseHeader("content-type").indexOf("application/json")&&(d=JSON.parse(d)),p.finished(a,d,b)):c()},j.onerror=function(){return c()},h=null!=(m=j.upload)?m:j,h.onprogress=function(b){return p.emit("uploadprogress",a,Math.max(0,Math.min(100,b.loaded/b.total*100)))},j.setRequestHeader("Accept","application/json"),j.setRequestHeader("Cache-Control","no-cache"),j.setRequestHeader("X-Requested-With","XMLHttpRequest"),j.setRequestHeader("X-File-Name",a.name),b=new FormData,this.options.params){n=this.options.params;for(g in n)i=n[g],b.append(g,i)}if(this.element.tagName="FORM")for(o=this.element.querySelectorAll("input, textarea, select, button"),k=0,l=o.length;k<l;k++)d=o[k],e=d.getAttribute("name"),f=d.getAttribute("type"),f&&"checkbox"===f.toLowerCase()&&!d.checked||b.append(e,d.value);return this.emit("sending",a,j,b),b.append(this.options.paramName,a),j.send(b)},b.prototype.finished=function(a,b,c){return this.filesProcessing=i(this.filesProcessing,a),a.processing=!1,this.processQueue(),this.emit("success",a,b,c),this.emit("finished",a,b,c),this.emit("complete",a)},b.prototype.errorProcessing=function(a,b){return this.filesProcessing=i(this.filesProcessing,a),a.processing=!1,this.processQueue(),this.emit("error",a,b),this.emit("complete",a)},b}(d),a.version="2.0.3",a.options={},a.instances=[],a.forElement=function(b){var c,d,e,f;for("string"==typeof b&&(b=document.querySelector(b)),f=a.instances,d=0,e=f.length;d<e;d++)if(c=f[d],c.element===b)return c;return null},a.blacklistedBrowsers=[/opera.*Macintosh.*version\/12/i],a.isBrowserSupported=function(){var b,c,d,e,f;if(b=!0,window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData)if("classList"in document.createElement("a"))for(f=a.blacklistedBrowsers,d=0,e=f.length;d<e;d++)c=f[d],c.test(navigator.userAgent)&&(b=!1);else b=!1;else b=!1;return b},i=function(a,b){var c,d,e,f;for(f=[],d=0,e=a.length;d<e;d++)c=a[d],c!==b&&f.push(c);return f},e=function(a){return a.replace(/[\-_](\w)/g,function(a){return a[1].toUpperCase()})},g=function(a){var b;return b=document.createElement("div"),b.innerHTML=a,b.childNodes[0]},"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.fn.dropzone=function(b){return this.each(function(){return new a(this,b)})}),"undefined"!=typeof c&&null!==c?c.exports=a:window.Dropzone=a,(f=function(a,b){var c,d,e,f,g,h,i,j,k;if(e=!1,k=!0,d=a.document,j=d.documentElement,c=d.addEventListener?"addEventListener":"attachEvent",i=d.addEventListener?"removeEventListener":"detachEvent",h=d.addEventListener?"":"on",f=function(c){if("readystatechange"!==c.type||"complete"===d.readyState)return("load"===c.type?a:d)[i](h+c.type,f,!1),!e&&(e=!0)?b.call(a,c.type||c):void 0},g=function(){try{j.doScroll("left")}catch(a){return void setTimeout(g,50)}return f("poll")},"complete"!==d.readyState){if(d.createEventObject&&j.doScroll){try{k=!a.frameElement}catch(a){}k&&g()}return d[c](h+"DOMContentLoaded",f,!1),d[c](h+"readystatechange",f,!1),a[c](h+"load",f,!1)}})(window,function(){var b,c,d,e,f,g;for(d=[],b=function(a){var b,c,e,f;for(f=[],c=0,e=a.length;c<e;c++)b=a[c],/(^| )dropzone($| )/.test(b.className)?f.push(d.push(b)):f.push(void 0);return f},b(document.getElementsByTagName("div")),b(document.getElementsByTagName("form")),g=[],e=0,f=d.length;e<f;e++)c=d[e],g.push(new a(c));return g})}).call(this)}),a.alias("component-emitter/index.js","dropzone/deps/emitter/index.js"),"object"==typeof exports?module.exports=a("dropzone"):"function"==typeof define&&define.amd?define(function(){return a("dropzone")}):window.Dropzone=a("dropzone")}();