!function(a){function b(c,d){return"string"!=typeof c||""===a.trim(c)?void d(c,[]):b.cache.hasOwnProperty(c)?void d(c,b.cache[c]):(d(c,[]),void a.ajax({cache:!0,data:{countryCode:c,activeLocale:window.CCM_ACTIVE_LOCALE},dataType:"json",method:"GET",url:window.CCM_DISPATCHER_FILENAME+"/ccm/system/country-stateprovince-link/get_stateprovinces"}).fail(function(a,d,e){window.console&&window.console.error&&window.console.error(a.responseJSON||e),b.cache[c]=[]}).success(function(a){b.cache[c]=a instanceof Array?a:[]}).always(function(){d(c,b.cache[c])}))}function c(b){var c=this;c.enabled=!1,c.$text=b,c.$select=a("<select />"),e?c.mutationObserver=new window.MutationObserver(function(a){c.updateSelectAttributes(),c.$text.hide(),c.$select.show()}):c.mutationObserver=null,c.originalFocus=c.$text[0].focus,c.$text[0].focus=function(){c.enabled?c.$select.focus():c.originalFocus.apply(c.$text[0])}}function d(a,b){var d=this;d.$country=a,d.$stateprovince=b,d.replacer=new c(d.$stateprovince),d.$stateprovinceSelect=d.replacer.$select,d.$country.on("change",function(){d.countryChanged()}).trigger("change"),d.$stateprovinceSelect.on("change",function(){d.$stateprovince.val(d.$stateprovinceSelect.val()).trigger("change")})}var e=!!(window.MutationObserver&&window.MutationObserver.prototype&&window.MutationObserver.prototype.observe);b.cache={},c.prototype={updateSelectAttributes:function(){var b=this;a.each(["class","style","required"],function(a,c){var d=b.$text.attr(c);"string"==typeof d&&b.$select.attr(c,d)})},setEnabled:function(a){var b=this;a=!!a,a!==b.enabled&&(a?(b.updateSelectAttributes(),b.$text.before(b.$select),b.$text.hide(),b.enabled=!0,null!==b.mutationObserver&&setTimeout(function(){b.enabled===!0&&(b.mutationObserver.disconnect(),b.mutationObserver.observe(b.$text[0],{attributes:!0}))},0)):(null!==b.mutationObserver&&b.mutationObserver.disconnect(),b.enabled=!1,b.$select.detach(),b.$text.show()))}},d.prototype={countryChanged:function(){var c=this;b(c.$country.val(),function(b,d){if(c.$country.val()===b){c.$stateprovinceSelect.empty();var e=d.length;if(0===e)c.replacer.setEnabled(!1);else{var f=a.trim(c.$stateprovince.val());c.$stateprovinceSelect.append(a('<option value="" selected="selected" />').text(""));for(var g,h=0;h<e;h++)g=a("<option />").val(d[h][0]).text(d[h][1]),d[h][0]===f&&g.attr("selected","selected"),c.$stateprovinceSelect.append(g);c.replacer.setEnabled(!0)}}})}},d.withCountryField=function(b){var c=b.closest("form");0===c.length&&(c=a(document.body));var e=[];switch(c.find('input[data-countryfield="'+b.attr("id")+'"]').each(function(){e.push(new d(b,a(this)))}),e.length){case 0:return null;case 1:return e[0];default:return e}},window.ccmCountryStateprovinceLink=d}(jQuery);