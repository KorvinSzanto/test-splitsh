/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@concretecms/bedrock/assets/cms/js/legacy-dialog.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@concretecms/bedrock/assets/cms/js/legacy-dialog.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-disable no-new, no-unused-vars, camelcase, no-eval, eqeqeq */

/* global NProgress, ccmi18n, ConcreteMenuManager, ConcreteAjaxRequest, ConcreteAlert, bootstrap */
;

(function (global, $) {
  'use strict';
  /* Concrete wrapper for jQuery UI */

  $.widget('concrete.dialog', $.ui.dialog, {
    _allowInteraction: function _allowInteraction(event) {
      return !!$(event.target).closest('.ccm-interaction-dialog').length || !!$(event.target).closest('.cke_dialog').length || this._super(event);
    }
  });

  function onDialogCreate($dialog) {// $dialog.parent().addClass('animated fadeIn')
  }

  function onDialogOpen($dialog) {
    /*
     * This code causes problems with dialogs that have long dropdowns in them like the files advanced
     * search. Commenting out for now.
     */

    /*
    var nd = $('.ui-dialog').length
    if (nd == 1) {
        $('body').attr('data-last-overflow', $('body').css('overflow'))
        $('body').css('overflow', 'hidden')
     */
    var overlays = $('.ui-widget-overlay').length;

    if (overlays == 1) {
      var overlayFunction = function overlayFunction() {
        var overlay = $('.ui-widget-overlay').get(0);
        overlay.classList.add('ui-widget-overlay-active');
      };

      requestAnimationFrame(overlayFunction);
    }

    var $close = $dialog.parent().find('.ui-dialog-titlebar-close');
    $close.addClass('btn-close btn-close-white');
    $.fn.dialog.activateDialogContents($dialog); // on some brother (eg: Chrome) the resizable get hidden because the button pane
    // in on top of it, here is a fix for this:

    if ($dialog.jqdialog('option', 'resizable')) {
      var $wrapper = $($dialog.parent());
      var z = parseInt($wrapper.find('.ui-dialog-buttonpane').css('z-index'));
      $wrapper.find('.ui-resizable-handle').css('z-index', z + 1000);
    }
  }

  function fixDialogButtons($dialog) {
    var $ccmButtons = $dialog.find('.dialog-buttons').eq(0);

    if ($ccmButtons.length === 0) {
      return;
    }

    if ($.trim($ccmButtons.html()).length === 0) {
      return;
    }

    var $dialogParent = $dialog.parent();

    if ($dialogParent.find('.ui-dialog-buttonset').length !== 0) {
      return;
    }

    $dialog.jqdialog('option', 'buttons', [{}]);
    $dialogParent.find('.ui-dialog-buttonset').remove();
    /*
     * This keeps our buttons left and right, but we're not sure we want that, so let's not do that yet.
     */
    // $ccmButtons.find('[data-dialog-action=cancel]').addClass('me-auto')

    $ccmButtons.children().appendTo($dialogParent.find('.ui-dialog-buttonpane').empty());
  }

  $.widget.bridge('jqdialog', $.concrete.dialog); // wrap our old dialog function in the new dialog() function.

  $.fn.dialog = function () {
    // Pass this over to jQuery UI Dialog in a few circumstances
    switch (arguments.length) {
      case 0:
        if ($(this).is('div')) {
          $(this).jqdialog();
          return;
        }

        break;

      case 1:
        var arg = arguments[0];

        if ($.isPlainObject(arg)) {
          var originalOpen = arg.open || null;
          var originalCreate = arg.create || null;

          arg.create = function (e) {
            onDialogCreate($(this));

            if (originalCreate) {
              originalCreate.call(this);
            }
          };

          arg.dialogClass = 'ccm-ui';

          arg.open = function (e, ui) {
            onDialogOpen($(this));

            if (originalOpen) {
              originalOpen.call(this, e, ui);
            }
          };
        }

        $.fn.jqdialog.call($(this), arg);
        return;

      default:
        $.fn.jqdialog.apply($(this), arguments);
        return;
    } // LEGACY SUPPORT


    return $(this).each(function () {
      $(this).unbind('click.make-dialog').bind('click.make-dialog', function (e) {
        e.preventDefault();

        if ($(this).hasClass('ccm-dialog-launching')) {
          return;
        }

        $(this).addClass('ccm-dialog-launching');
        var href = $(this).attr('href');
        var width = $(this).attr('dialog-width');
        var height = $(this).attr('dialog-height');
        var title = $(this).attr('dialog-title');
        var onOpen = $(this).attr('dialog-on-open');
        var dialogClass = $(this).attr('dialog-class');
        var onDestroy = $(this).attr('dialog-on-destroy');
        /*
         * no longer necessary. we auto detect
            var appendButtons = $(this).attr('dialog-append-buttons');
        */

        var onClose = $(this).attr('dialog-on-close');
        var onDirectClose = $(this).attr('dialog-on-direct-close');
        var obj = {
          modal: true,
          href: href,
          width: width,
          height: height,
          title: title,
          onOpen: onOpen,
          onDestroy: onDestroy,
          dialogClass: dialogClass,
          onClose: onClose,
          onDirectClose: onDirectClose,
          launcher: $(this)
        };
        $.fn.dialog.open(obj);
      });
    });
  };

  $.fn.dialog.close = function (num) {
    num++;
    $('#ccm-dialog-content' + num).jqdialog('close');
  };

  $.fn.dialog.open = function (options) {
    if (typeof ConcreteMenu !== 'undefined') {
      var activeMenu = ConcreteMenuManager.getActiveMenu();

      if (activeMenu) {
        activeMenu.hide();
      }
    }

    var w;

    if (typeof options.width === 'string') {
      if (options.width == 'auto') {
        w = 'auto';
      } else {
        if (options.width.indexOf('%', 0) > 0) {
          w = options.width.replace('%', '');
          w = $(window).width() * (w / 100);
          w = w + 50;
        } else {
          w = parseInt(options.width) + 50;
        }
      }
    } else if (options.width) {
      w = parseInt(options.width) + 50;
    } else {
      w = 550;
    }

    var h;

    if (typeof options.height === 'string') {
      if (options.height == 'auto') {
        h = 'auto';
      } else {
        if (options.height.indexOf('%', 0) > 0) {
          h = options.height.replace('%', '');
          h = $(window).height() * (h / 100);
          h = h + 100;
        } else {
          h = parseInt(options.height) + 100;
        }
      }
    } else if (options.height) {
      h = parseInt(options.height) + 100;
    } else {
      h = 400;
    }

    if (h !== 'auto' && h > $(window).height()) {
      h = $(window).height();
    }

    options.width = w;
    options.height = h;
    var defaults = {
      modal: true,
      escapeClose: true,
      width: w,
      height: h,
      type: 'GET',
      dialogClass: 'ccm-ui',
      resizable: true,
      create: function create() {
        onDialogCreate($(this));
      },
      open: function open() {
        // jshint -W061
        var $dialog = $(this);
        onDialogOpen($dialog);

        if (typeof options.onOpen !== 'undefined') {
          if (typeof options.onOpen === 'function') {
            options.onOpen($dialog);
          } else {
            eval(options.onOpen);
          }
        }

        if (options.launcher) {
          options.launcher.removeClass('ccm-dialog-launching');
        }
      },
      beforeClose: function beforeClose() {
        var nd = $('.ui-dialog:visible').length;

        if (nd == 1) {
          $('body').css('overflow', $('body').attr('data-last-overflow'));
        }
      },
      close: function close(ev, u) {
        // jshint -W061
        if (!options.element) {
          $(this).jqdialog('destroy').remove();
        }

        if (typeof options.onClose !== 'undefined') {
          if (typeof options.onClose === 'function') {
            options.onClose($(this));
          } else {
            eval(options.onClose);
          }
        }

        if (typeof options.onDirectClose !== 'undefined' && ev.handleObj && (ev.handleObj.type == 'keydown' || ev.handleObj.type == 'click')) {
          if (typeof options.onDirectClose === 'function') {
            options.onDirectClose();
          } else {
            eval(options.onDirectClose);
          }
        }

        if (typeof options.onDestroy !== 'undefined') {
          if (typeof options.onDestroy === 'function') {
            options.onDestroy();
          } else {
            eval(options.onDestroy);
          }
        }
      }
    };
    var finalSettings = {
      autoOpen: false,
      data: {}
    };
    $.extend(finalSettings, defaults, options);

    if (finalSettings.element) {
      $(finalSettings.element).jqdialog(finalSettings).jqdialog();
      $(finalSettings.element).jqdialog('open');
    } else {
      $.fn.dialog.showLoader();
      $.ajax({
        type: finalSettings.type,
        url: finalSettings.href,
        data: finalSettings.data,
        success: function success(r) {
          $.fn.dialog.hideLoader(); // note the order here is very important in order to actually run javascript in
          // the pages we load while having access to the jqdialog object.
          // Ensure that the dialog is open prior to evaluating javascript.

          $('<div />').jqdialog(finalSettings).html(r).jqdialog('open');
        },
        error: function error(xhr, status, _error) {
          $.fn.dialog.hideLoader();
          ConcreteAlert.dialog(ccmi18n.error, ConcreteAjaxRequest.renderErrorResponse(xhr, true));
        }
      });
    }
  };

  $.fn.dialog.activateDialogContents = function ($dialog) {
    setTimeout(function () {
      // handle buttons
      $dialog.find('button[data-dialog-action=cancel]').on('click', function () {
        $.fn.dialog.closeTop();
      });
      $dialog.find('[data-dialog-form]').each(function () {
        var $form = $(this);
        var options = {};

        if ($form.attr('data-dialog-form-processing') == 'progressive') {
          options.progressiveOperation = true;
          options.progressiveOperationElement = 'div[data-dialog-form-element=progress-bar]';
        }

        $form.concreteAjaxForm(options);
      });
      $dialog.find('button[data-dialog-action=submit]').on('click', function () {
        $dialog.find('[data-dialog-form]').submit();
      });
      fixDialogButtons($dialog); // make dialogs

      $dialog.find('.dialog-launch').dialog(); // automated close handling

      $dialog.find('.ccm-dialog-close').on('click', function () {
        $dialog.dialog('close');
      });
      var tooltipTriggerList = [].slice.call($dialog.find('.launch-tooltip'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
          container: '#ccm-tooltip-holder'
        });
      }); // help handling

      if ($dialog.find('.dialog-help').length > 0) {
        $dialog.find('.dialog-help').hide();
        var helpContent = $dialog.find('.dialog-help').html();
        var helpText;

        if (ccmi18n.helpPopup) {
          helpText = ccmi18n.helpPopup;
        } else {
          helpText = 'Help';
        }

        var button = $('<button class="btn-help"><svg><use xlink:href="#icon-dialog-help" /></svg></button>');
        var container = $('#ccm-tooltip-holder');
        button.insertBefore($dialog.parent().find('.ui-dialog-titlebar-close'));
        button.popover({
          content: function content() {
            return helpContent;
          },
          placement: 'bottom',
          html: true,
          container: container,
          trigger: 'click'
        });
        button.on('shown.bs.popover', function () {
          var _binding = function binding() {
            button.popover('hide', button);
            _binding = $.noop;
          };

          button.on('hide.bs.popover', function (event) {
            button.unbind(event);
            _binding = $.noop;
          });
          $('body').mousedown(function (e) {
            if ($(e.target).closest(container).length || $(e.target).closest(button).length) {
              return;
            }

            $(this).unbind(e);

            _binding();
          });
        });
      }
    }, 10);
  };

  $.fn.dialog.getTop = function () {
    var nd = $('.ui-dialog:visible').length;
    return $($('.ui-dialog:visible')[nd - 1]).find('.ui-dialog-content');
  };

  $.fn.dialog.replaceTop = function (html) {
    var $dialog = $.fn.dialog.getTop();
    $dialog.html(html);
    $.fn.dialog.activateDialogContents($dialog);
  };

  $.fn.dialog.showLoader = function (text) {
    NProgress.start();
  };

  $.fn.dialog.hideLoader = function () {
    NProgress.done();
  };

  $.fn.dialog.closeTop = function () {
    var $dialog = $.fn.dialog.getTop();
    $dialog.jqdialog('close');
  };

  $.fn.dialog.closeAll = function () {
    $($('.ui-dialog-content').get().reverse()).jqdialog('close');
  };

  $.ui.dialog.prototype._focusTabbable = $.noop;
})(window, jQuery); // eslint-disable-line semi

/***/ }),

/***/ "./node_modules/@concretecms/bedrock/assets/desktop/js/frontend.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@concretecms/bedrock/assets/desktop/js/frontend.js ***!
  \*************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery-form */ "./node_modules/jquery-form/dist/jquery.form.min.js");
/* harmony import */ var jquery_form__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery_form__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery_ui_ui_widgets_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery-ui/ui/widgets/dialog */ "./node_modules/jquery-ui/ui/widgets/dialog.js");
/* harmony import */ var jquery_ui_ui_widgets_dialog__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_dialog__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cms_js_legacy_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cms/js/legacy-dialog */ "./node_modules/@concretecms/bedrock/assets/cms/js/legacy-dialog.js");
/* harmony import */ var _cms_js_legacy_dialog__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_cms_js_legacy_dialog__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _frontend_draft_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./frontend/draft-list */ "./node_modules/@concretecms/bedrock/assets/desktop/js/frontend/draft-list.js");
/* harmony import */ var _frontend_draft_list__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_frontend_draft_list__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _frontend_notification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./frontend/notification */ "./node_modules/@concretecms/bedrock/assets/desktop/js/frontend/notification.js");
/* harmony import */ var _frontend_notification__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_frontend_notification__WEBPACK_IMPORTED_MODULE_4__);
// draft list and notification make use ajaxSubmit
 // draft list and notification make use of the CMS dialog.


 // Components




/***/ }),

/***/ "./node_modules/@concretecms/bedrock/assets/desktop/js/frontend/draft-list.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@concretecms/bedrock/assets/desktop/js/frontend/draft-list.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* eslint-disable no-new, no-unused-vars, camelcase */
;

(function (global, $) {
  'use strict';

  function ConcreteDraftList($element, options) {
    var my = this;
    options = $.extend({}, options);
    my.$element = $element;
    my.options = options;
    my.$element.on('click', 'div.ccm-pagination-wrapper a', function (e) {
      e.preventDefault();
      my.showLoader();
      window.scrollTo(0, 0);
      $.concreteAjax({
        loader: false,
        dataType: 'html',
        url: $(this).attr('href'),
        method: 'get',
        success: function success(r) {
          my.$element.replaceWith(r);
        },
        complete: function complete() {
          my.hideLoader();
        }
      });
    });
    my.$element.find('.dialog-launch').dialog();
  }

  ConcreteDraftList.prototype = {
    showLoader: function showLoader() {
      var my = this;
      my.$element.find('.ccm-block-desktop-draft-list-for-me-loader').removeClass('invisible');
    },
    hideLoader: function hideLoader() {
      var my = this;
      my.$element.find('.ccm-block-desktop-draft-list-for-me-loader').addClass('invisible');
    }
  }; // jQuery Plugin

  $.fn.concreteDraftList = function (options) {
    return $.each($(this), function (i, obj) {
      new ConcreteDraftList($(this), options);
    });
  };

  global.ConcreteDraftList = ConcreteDraftList;
})(global, jQuery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@concretecms/bedrock/assets/desktop/js/frontend/notification.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@concretecms/bedrock/assets/desktop/js/frontend/notification.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* eslint-disable no-new, no-unused-vars, camelcase */

/* global CCM_DISPATCHER_FILENAME */
;

(function (global, $) {
  'use strict';

  function ConcreteNotificationList($element, options) {
    var my = this;
    options = $.extend({}, options);
    my.$element = $element;
    my.options = options;
    my.$element.on('click', '[data-notification-action=archive]', function (e) {
      e.preventDefault();
      var $item = $(this).closest('div[data-notification-alert-id]');
      var alertID = $item.attr('data-notification-alert-id');
      var token = $item.attr('data-token');
      $.ajax({
        url: CCM_DISPATCHER_FILENAME + '/ccm/system/notification/alert/archive',
        dataType: 'json',
        data: {
          naID: alertID,
          ccm_token: token
        },
        type: 'post'
      });
      $item.queue(function () {
        $item.addClass('animated fadeOut');
        $item.dequeue();
      }).delay(500).queue(function () {
        $item.remove();
        $item.dequeue();
        my.handleEmpty();
      });
    });
    my.$element.on('change', 'div[data-form=notification] select', function (e) {
      var $form = $(this).closest('form');
      $form.ajaxSubmit({
        dataType: 'html',
        beforeSubmit: function beforeSubmit() {
          my.showLoader();
        },
        success: function success(r) {
          $('div[data-wrapper=desktop-waiting-for-me]').replaceWith(r);
        },
        complete: function complete() {
          my.hideLoader();
        }
      });
    });
    my.$element.on('click', 'div.ccm-pagination-wrapper a', function (e) {
      e.preventDefault();
      my.showLoader();
      window.scrollTo(0, 0);
      $.concreteAjax({
        loader: false,
        dataType: 'html',
        url: $(this).attr('href'),
        method: 'get',
        success: function success(r) {
          $('div[data-wrapper=desktop-waiting-for-me]').replaceWith(r);
        },
        complete: function complete() {
          my.hideLoader();
        }
      });
    });
    my.$element.on('click', 'a[data-workflow-task]', function (e) {
      var action = $(this).attr('data-workflow-task');
      var $form = $(this).closest('form');
      var $notification = $(this).closest('div[data-notification-alert-id]');
      e.preventDefault();
      $form.append('<input type="hidden" name="action_' + action + '" value="' + action + '">');
      $form.ajaxSubmit({
        dataType: 'json',
        beforeSubmit: function beforeSubmit() {
          my.showLoader();
        },
        success: function success(r) {
          $notification.addClass('animated fadeOut');
          setTimeout(function () {
            $notification.remove();
            my.handleEmpty();
          }, 500);
        },
        complete: function complete() {
          my.hideLoader();
        }
      });
    });
    my.$element.find('.dialog-launch').dialog();
  }

  ConcreteNotificationList.prototype = {
    handleEmpty: function handleEmpty() {
      var my = this;
      var $items = my.$element.find('div[data-notification-alert-id]');

      if ($items.length < 1) {
        my.$element.find('[data-notification-description=empty]').show();
      }
    },
    showLoader: function showLoader() {
      $('div[data-list=notification]').addClass('ccm-block-desktop-waiting-for-me-loading');
    },
    hideLoader: function hideLoader() {
      $('div[data-list=notification]').removeClass();
    }
  }; // jQuery Plugin

  $.fn.concreteNotificationList = function (options) {
    return $.each($(this), function (i, obj) {
      new ConcreteNotificationList($(this), options);
    });
  };

  global.ConcreteNotificationList = ConcreteNotificationList;
})(global, jQuery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/jquery-form/dist/jquery.form.min.js":
/*!**********************************************************!*\
  !*** ./node_modules/jquery-form/dist/jquery.form.min.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * jQuery Form Plugin
 * version: 4.3.0
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function (r) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (r),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (q) {
  "use strict";

  var m = /\r?\n/g,
      S = {};
  S.fileapi = void 0 !== q('<input type="file">').get(0).files, S.formdata = void 0 !== window.FormData;

  var _ = !!q.fn.prop;

  function o(e) {
    var t = e.data;
    e.isDefaultPrevented() || (e.preventDefault(), q(e.target).closest("form").ajaxSubmit(t));
  }

  function i(e) {
    var t = e.target,
        r = q(t);

    if (!r.is("[type=submit],[type=image]")) {
      var a = r.closest("[type=submit]");
      if (0 === a.length) return;
      t = a[0];
    }

    var n,
        o = t.form;
    "image" === (o.clk = t).type && (void 0 !== e.offsetX ? (o.clk_x = e.offsetX, o.clk_y = e.offsetY) : "function" == typeof q.fn.offset ? (n = r.offset(), o.clk_x = e.pageX - n.left, o.clk_y = e.pageY - n.top) : (o.clk_x = e.pageX - t.offsetLeft, o.clk_y = e.pageY - t.offsetTop)), setTimeout(function () {
      o.clk = o.clk_x = o.clk_y = null;
    }, 100);
  }

  function N() {
    var e;
    q.fn.ajaxSubmit.debug && (e = "[jquery.form] " + Array.prototype.join.call(arguments, ""), window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e));
  }

  q.fn.attr2 = function () {
    if (!_) return this.attr.apply(this, arguments);
    var e = this.prop.apply(this, arguments);
    return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments);
  }, q.fn.ajaxSubmit = function (M, e, t, r) {
    if (!this.length) return N("ajaxSubmit: skipping submit process - no element selected"), this;
    var O,
        a,
        n,
        o,
        X = this;
    "function" == typeof M ? M = {
      success: M
    } : "string" == typeof M || !1 === M && 0 < arguments.length ? (M = {
      url: M,
      data: e,
      dataType: t
    }, "function" == typeof r && (M.success = r)) : void 0 === M && (M = {}), O = M.method || M.type || this.attr2("method"), n = (n = (n = "string" == typeof (a = M.url || this.attr2("action")) ? q.trim(a) : "") || window.location.href || "") && (n.match(/^([^#]+)/) || [])[1], o = /(MSIE|Trident)/.test(navigator.userAgent || "") && /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank", M = q.extend(!0, {
      url: n,
      success: q.ajaxSettings.success,
      type: O || q.ajaxSettings.type,
      iframeSrc: o
    }, M);
    var i = {};
    if (this.trigger("form-pre-serialize", [this, M, i]), i.veto) return N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
    if (M.beforeSerialize && !1 === M.beforeSerialize(this, M)) return N("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
    var s = M.traditional;
    void 0 === s && (s = q.ajaxSettings.traditional);
    var u,
        c,
        C = [],
        l = this.formToArray(M.semantic, C, M.filtering);
    if (M.data && (c = q.isFunction(M.data) ? M.data(l) : M.data, M.extraData = c, u = q.param(c, s)), M.beforeSubmit && !1 === M.beforeSubmit(l, this, M)) return N("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
    if (this.trigger("form-submit-validate", [l, this, M, i]), i.veto) return N("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
    var f = q.param(l, s);
    u && (f = f ? f + "&" + u : u), "GET" === M.type.toUpperCase() ? (M.url += (0 <= M.url.indexOf("?") ? "&" : "?") + f, M.data = null) : M.data = f;
    var d,
        m,
        p,
        h = [];
    M.resetForm && h.push(function () {
      X.resetForm();
    }), M.clearForm && h.push(function () {
      X.clearForm(M.includeHidden);
    }), !M.dataType && M.target ? (d = M.success || function () {}, h.push(function (e, t, r) {
      var a = arguments,
          n = M.replaceTarget ? "replaceWith" : "html";
      q(M.target)[n](e).each(function () {
        d.apply(this, a);
      });
    })) : M.success && (q.isArray(M.success) ? q.merge(h, M.success) : h.push(M.success)), M.success = function (e, t, r) {
      for (var a = M.context || this, n = 0, o = h.length; n < o; n++) {
        h[n].apply(a, [e, t, r || X, X]);
      }
    }, M.error && (m = M.error, M.error = function (e, t, r) {
      var a = M.context || this;
      m.apply(a, [e, t, r, X]);
    }), M.complete && (p = M.complete, M.complete = function (e, t) {
      var r = M.context || this;
      p.apply(r, [e, t, X]);
    });
    var v = 0 < q("input[type=file]:enabled", this).filter(function () {
      return "" !== q(this).val();
    }).length,
        g = "multipart/form-data",
        x = X.attr("enctype") === g || X.attr("encoding") === g,
        y = S.fileapi && S.formdata;
    N("fileAPI :" + y);
    var b,
        T = (v || x) && !y;
    !1 !== M.iframe && (M.iframe || T) ? M.closeKeepAlive ? q.get(M.closeKeepAlive, function () {
      b = w(l);
    }) : b = w(l) : b = (v || x) && y ? function (e) {
      for (var r = new FormData(), t = 0; t < e.length; t++) {
        r.append(e[t].name, e[t].value);
      }

      if (M.extraData) {
        var a = function (e) {
          var t,
              r,
              a = q.param(e, M.traditional).split("&"),
              n = a.length,
              o = [];

          for (t = 0; t < n; t++) {
            a[t] = a[t].replace(/\+/g, " "), r = a[t].split("="), o.push([decodeURIComponent(r[0]), decodeURIComponent(r[1])]);
          }

          return o;
        }(M.extraData);

        for (t = 0; t < a.length; t++) {
          a[t] && r.append(a[t][0], a[t][1]);
        }
      }

      M.data = null;
      var n = q.extend(!0, {}, q.ajaxSettings, M, {
        contentType: !1,
        processData: !1,
        cache: !1,
        type: O || "POST"
      });
      M.uploadProgress && (n.xhr = function () {
        var e = q.ajaxSettings.xhr();
        return e.upload && e.upload.addEventListener("progress", function (e) {
          var t = 0,
              r = e.loaded || e.position,
              a = e.total;
          e.lengthComputable && (t = Math.ceil(r / a * 100)), M.uploadProgress(e, r, a, t);
        }, !1), e;
      });
      n.data = null;
      var o = n.beforeSend;
      return n.beforeSend = function (e, t) {
        M.formData ? t.data = M.formData : t.data = r, o && o.call(this, e, t);
      }, q.ajax(n);
    }(l) : q.ajax(M), X.removeData("jqxhr").data("jqxhr", b);

    for (var j = 0; j < C.length; j++) {
      C[j] = null;
    }

    return this.trigger("form-submit-notify", [this, M]), this;

    function w(e) {
      var t,
          r,
          l,
          f,
          o,
          d,
          m,
          p,
          a,
          n,
          h,
          v,
          i = X[0],
          g = q.Deferred();
      if (g.abort = function (e) {
        p.abort(e);
      }, e) for (r = 0; r < C.length; r++) {
        t = q(C[r]), _ ? t.prop("disabled", !1) : t.removeAttr("disabled");
      }
      (l = q.extend(!0, {}, q.ajaxSettings, M)).context = l.context || l, o = "jqFormIO" + new Date().getTime();
      var s = i.ownerDocument,
          u = X.closest("body");
      if (l.iframeTarget ? (n = (d = q(l.iframeTarget, s)).attr2("name")) ? o = n : d.attr2("name", o) : (d = q('<iframe name="' + o + '" src="' + l.iframeSrc + '" />', s)).css({
        position: "absolute",
        top: "-1000px",
        left: "-1000px"
      }), m = d[0], p = {
        aborted: 0,
        responseText: null,
        responseXML: null,
        status: 0,
        statusText: "n/a",
        getAllResponseHeaders: function getAllResponseHeaders() {},
        getResponseHeader: function getResponseHeader() {},
        setRequestHeader: function setRequestHeader() {},
        abort: function abort(e) {
          var t = "timeout" === e ? "timeout" : "aborted";
          N("aborting upload... " + t), this.aborted = 1;

          try {
            m.contentWindow.document.execCommand && m.contentWindow.document.execCommand("Stop");
          } catch (e) {}

          d.attr("src", l.iframeSrc), p.error = t, l.error && l.error.call(l.context, p, t, e), f && q.event.trigger("ajaxError", [p, l, t]), l.complete && l.complete.call(l.context, p, t);
        }
      }, (f = l.global) && 0 == q.active++ && q.event.trigger("ajaxStart"), f && q.event.trigger("ajaxSend", [p, l]), l.beforeSend && !1 === l.beforeSend.call(l.context, p, l)) return l.global && q.active--, g.reject(), g;
      if (p.aborted) return g.reject(), g;
      (a = i.clk) && (n = a.name) && !a.disabled && (l.extraData = l.extraData || {}, l.extraData[n] = a.value, "image" === a.type && (l.extraData[n + ".x"] = i.clk_x, l.extraData[n + ".y"] = i.clk_y));
      var x = 1,
          y = 2;

      function b(t) {
        var r = null;

        try {
          t.contentWindow && (r = t.contentWindow.document);
        } catch (e) {
          N("cannot get iframe.contentWindow document: " + e);
        }

        if (r) return r;

        try {
          r = t.contentDocument ? t.contentDocument : t.document;
        } catch (e) {
          N("cannot get iframe.contentDocument: " + e), r = t.document;
        }

        return r;
      }

      var c = q("meta[name=csrf-token]").attr("content"),
          T = q("meta[name=csrf-param]").attr("content");

      function j() {
        var e = X.attr2("target"),
            t = X.attr2("action"),
            r = X.attr("enctype") || X.attr("encoding") || "multipart/form-data";
        i.setAttribute("target", o), O && !/post/i.test(O) || i.setAttribute("method", "POST"), t !== l.url && i.setAttribute("action", l.url), l.skipEncodingOverride || O && !/post/i.test(O) || X.attr({
          encoding: "multipart/form-data",
          enctype: "multipart/form-data"
        }), l.timeout && (v = setTimeout(function () {
          h = !0, A(x);
        }, l.timeout));
        var a = [];

        try {
          if (l.extraData) for (var n in l.extraData) {
            l.extraData.hasOwnProperty(n) && (q.isPlainObject(l.extraData[n]) && l.extraData[n].hasOwnProperty("name") && l.extraData[n].hasOwnProperty("value") ? a.push(q('<input type="hidden" name="' + l.extraData[n].name + '">', s).val(l.extraData[n].value).appendTo(i)[0]) : a.push(q('<input type="hidden" name="' + n + '">', s).val(l.extraData[n]).appendTo(i)[0]));
          }
          l.iframeTarget || d.appendTo(u), m.attachEvent ? m.attachEvent("onload", A) : m.addEventListener("load", A, !1), setTimeout(function e() {
            try {
              var t = b(m).readyState;
              N("state = " + t), t && "uninitialized" === t.toLowerCase() && setTimeout(e, 50);
            } catch (e) {
              N("Server abort: ", e, " (", e.name, ")"), A(y), v && clearTimeout(v), v = void 0;
            }
          }, 15);

          try {
            i.submit();
          } catch (e) {
            document.createElement("form").submit.apply(i);
          }
        } finally {
          i.setAttribute("action", t), i.setAttribute("enctype", r), e ? i.setAttribute("target", e) : X.removeAttr("target"), q(a).remove();
        }
      }

      T && c && (l.extraData = l.extraData || {}, l.extraData[T] = c), l.forceSync ? j() : setTimeout(j, 10);
      var w,
          S,
          k,
          D = 50;

      function A(e) {
        if (!p.aborted && !k) {
          if ((S = b(m)) || (N("cannot access response document"), e = y), e === x && p) return p.abort("timeout"), void g.reject(p, "timeout");
          if (e === y && p) return p.abort("server abort"), void g.reject(p, "error", "server abort");

          if (S && S.location.href !== l.iframeSrc || h) {
            m.detachEvent ? m.detachEvent("onload", A) : m.removeEventListener("load", A, !1);
            var t,
                r = "success";

            try {
              if (h) throw "timeout";
              var a = "xml" === l.dataType || S.XMLDocument || q.isXMLDoc(S);
              if (N("isXml=" + a), !a && window.opera && (null === S.body || !S.body.innerHTML) && --D) return N("requeing onLoad callback, DOM not available"), void setTimeout(A, 250);
              var n = S.body ? S.body : S.documentElement;
              p.responseText = n ? n.innerHTML : null, p.responseXML = S.XMLDocument ? S.XMLDocument : S, a && (l.dataType = "xml"), p.getResponseHeader = function (e) {
                return {
                  "content-type": l.dataType
                }[e.toLowerCase()];
              }, n && (p.status = Number(n.getAttribute("status")) || p.status, p.statusText = n.getAttribute("statusText") || p.statusText);
              var o,
                  i,
                  s,
                  u = (l.dataType || "").toLowerCase(),
                  c = /(json|script|text)/.test(u);
              c || l.textarea ? (o = S.getElementsByTagName("textarea")[0]) ? (p.responseText = o.value, p.status = Number(o.getAttribute("status")) || p.status, p.statusText = o.getAttribute("statusText") || p.statusText) : c && (i = S.getElementsByTagName("pre")[0], s = S.getElementsByTagName("body")[0], i ? p.responseText = i.textContent ? i.textContent : i.innerText : s && (p.responseText = s.textContent ? s.textContent : s.innerText)) : "xml" === u && !p.responseXML && p.responseText && (p.responseXML = F(p.responseText));

              try {
                w = E(p, u, l);
              } catch (e) {
                r = "parsererror", p.error = t = e || r;
              }
            } catch (e) {
              N("error caught: ", e), r = "error", p.error = t = e || r;
            }

            p.aborted && (N("upload aborted"), r = null), p.status && (r = 200 <= p.status && p.status < 300 || 304 === p.status ? "success" : "error"), "success" === r ? (l.success && l.success.call(l.context, w, "success", p), g.resolve(p.responseText, "success", p), f && q.event.trigger("ajaxSuccess", [p, l])) : r && (void 0 === t && (t = p.statusText), l.error && l.error.call(l.context, p, r, t), g.reject(p, "error", t), f && q.event.trigger("ajaxError", [p, l, t])), f && q.event.trigger("ajaxComplete", [p, l]), f && ! --q.active && q.event.trigger("ajaxStop"), l.complete && l.complete.call(l.context, p, r), k = !0, l.timeout && clearTimeout(v), setTimeout(function () {
              l.iframeTarget ? d.attr("src", l.iframeSrc) : d.remove(), p.responseXML = null;
            }, 100);
          }
        }
      }

      var F = q.parseXML || function (e, t) {
        return window.ActiveXObject ? ((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e)) : t = new DOMParser().parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" !== t.documentElement.nodeName ? t : null;
      },
          L = q.parseJSON || function (e) {
        return window.eval("(" + e + ")");
      },
          E = function E(e, t, r) {
        var a = e.getResponseHeader("content-type") || "",
            n = ("xml" === t || !t) && 0 <= a.indexOf("xml"),
            o = n ? e.responseXML : e.responseText;
        return n && "parsererror" === o.documentElement.nodeName && q.error && q.error("parsererror"), r && r.dataFilter && (o = r.dataFilter(o, t)), "string" == typeof o && (("json" === t || !t) && 0 <= a.indexOf("json") ? o = L(o) : ("script" === t || !t) && 0 <= a.indexOf("javascript") && q.globalEval(o)), o;
      };

      return g;
    }
  }, q.fn.ajaxForm = function (e, t, r, a) {
    if (("string" == typeof e || !1 === e && 0 < arguments.length) && (e = {
      url: e,
      data: t,
      dataType: r
    }, "function" == typeof a && (e.success = a)), (e = e || {}).delegation = e.delegation && q.isFunction(q.fn.on), e.delegation || 0 !== this.length) return e.delegation ? (q(document).off("submit.form-plugin", this.selector, o).off("click.form-plugin", this.selector, i).on("submit.form-plugin", this.selector, e, o).on("click.form-plugin", this.selector, e, i), this) : (e.beforeFormUnbind && e.beforeFormUnbind(this, e), this.ajaxFormUnbind().on("submit.form-plugin", e, o).on("click.form-plugin", e, i));
    var n = {
      s: this.selector,
      c: this.context
    };
    return !q.isReady && n.s ? (N("DOM not ready, queuing ajaxForm"), q(function () {
      q(n.s, n.c).ajaxForm(e);
    })) : N("terminating; zero elements found by selector" + (q.isReady ? "" : " (DOM not ready)")), this;
  }, q.fn.ajaxFormUnbind = function () {
    return this.off("submit.form-plugin click.form-plugin");
  }, q.fn.formToArray = function (e, t, r) {
    var a = [];
    if (0 === this.length) return a;
    var n,
        o,
        i,
        s,
        u,
        c,
        l,
        f,
        d,
        m,
        p = this[0],
        h = this.attr("id"),
        v = (v = e || void 0 === p.elements ? p.getElementsByTagName("*") : p.elements) && q.makeArray(v);
    if (h && (e || /(Edge|Trident)\//.test(navigator.userAgent)) && (n = q(':input[form="' + h + '"]').get()).length && (v = (v || []).concat(n)), !v || !v.length) return a;

    for (q.isFunction(r) && (v = q.map(v, r)), o = 0, c = v.length; o < c; o++) {
      if ((m = (u = v[o]).name) && !u.disabled) if (e && p.clk && "image" === u.type) p.clk === u && (a.push({
        name: m,
        value: q(u).val(),
        type: u.type
      }), a.push({
        name: m + ".x",
        value: p.clk_x
      }, {
        name: m + ".y",
        value: p.clk_y
      }));else if ((s = q.fieldValue(u, !0)) && s.constructor === Array) for (t && t.push(u), i = 0, l = s.length; i < l; i++) {
        a.push({
          name: m,
          value: s[i]
        });
      } else if (S.fileapi && "file" === u.type) {
        t && t.push(u);
        var g = u.files;
        if (g.length) for (i = 0; i < g.length; i++) {
          a.push({
            name: m,
            value: g[i],
            type: u.type
          });
        } else a.push({
          name: m,
          value: "",
          type: u.type
        });
      } else null != s && (t && t.push(u), a.push({
        name: m,
        value: s,
        type: u.type,
        required: u.required
      }));
    }

    return e || !p.clk || (m = (d = (f = q(p.clk))[0]).name) && !d.disabled && "image" === d.type && (a.push({
      name: m,
      value: f.val()
    }), a.push({
      name: m + ".x",
      value: p.clk_x
    }, {
      name: m + ".y",
      value: p.clk_y
    })), a;
  }, q.fn.formSerialize = function (e) {
    return q.param(this.formToArray(e));
  }, q.fn.fieldSerialize = function (n) {
    var o = [];
    return this.each(function () {
      var e = this.name;

      if (e) {
        var t = q.fieldValue(this, n);
        if (t && t.constructor === Array) for (var r = 0, a = t.length; r < a; r++) {
          o.push({
            name: e,
            value: t[r]
          });
        } else null != t && o.push({
          name: this.name,
          value: t
        });
      }
    }), q.param(o);
  }, q.fn.fieldValue = function (e) {
    for (var t = [], r = 0, a = this.length; r < a; r++) {
      var n = this[r],
          o = q.fieldValue(n, e);
      null == o || o.constructor === Array && !o.length || (o.constructor === Array ? q.merge(t, o) : t.push(o));
    }

    return t;
  }, q.fieldValue = function (e, t) {
    var r = e.name,
        a = e.type,
        n = e.tagName.toLowerCase();
    if (void 0 === t && (t = !0), t && (!r || e.disabled || "reset" === a || "button" === a || ("checkbox" === a || "radio" === a) && !e.checked || ("submit" === a || "image" === a) && e.form && e.form.clk !== e || "select" === n && -1 === e.selectedIndex)) return null;
    if ("select" !== n) return q(e).val().replace(m, "\r\n");
    var o = e.selectedIndex;
    if (o < 0) return null;

    for (var i = [], s = e.options, u = "select-one" === a, c = u ? o + 1 : s.length, l = u ? o : 0; l < c; l++) {
      var f = s[l];

      if (f.selected && !f.disabled) {
        var d = (d = f.value) || (f.attributes && f.attributes.value && !f.attributes.value.specified ? f.text : f.value);
        if (u) return d;
        i.push(d);
      }
    }

    return i;
  }, q.fn.clearForm = function (e) {
    return this.each(function () {
      q("input,select,textarea", this).clearFields(e);
    });
  }, q.fn.clearFields = q.fn.clearInputs = function (r) {
    var a = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
    return this.each(function () {
      var e = this.type,
          t = this.tagName.toLowerCase();
      a.test(e) || "textarea" === t ? this.value = "" : "checkbox" === e || "radio" === e ? this.checked = !1 : "select" === t ? this.selectedIndex = -1 : "file" === e ? /MSIE/.test(navigator.userAgent) ? q(this).replaceWith(q(this).clone(!0)) : q(this).val("") : r && (!0 === r && /hidden/.test(e) || "string" == typeof r && q(this).is(r)) && (this.value = "");
    });
  }, q.fn.resetForm = function () {
    return this.each(function () {
      var t = q(this),
          e = this.tagName.toLowerCase();

      switch (e) {
        case "input":
          this.checked = this.defaultChecked;

        case "textarea":
          return this.value = this.defaultValue, !0;

        case "option":
        case "optgroup":
          var r = t.parents("select");
          return r.length && r[0].multiple ? "option" === e ? this.selected = this.defaultSelected : t.find("option").resetForm() : r.resetForm(), !0;

        case "select":
          return t.find("option").each(function (e) {
            if (this.selected = this.defaultSelected, this.defaultSelected && !t[0].multiple) return t[0].selectedIndex = e, !1;
          }), !0;

        case "label":
          var a = q(t.attr("for")),
              n = t.find("input,select,textarea");
          return a[0] && n.unshift(a[0]), n.resetForm(), !0;

        case "form":
          return "function" != typeof this.reset && ("object" != _typeof(this.reset) || this.reset.nodeType) || this.reset(), !0;

        default:
          return t.find("form,input,label,select,textarea").resetForm(), !0;
      }
    });
  }, q.fn.enable = function (e) {
    return void 0 === e && (e = !0), this.each(function () {
      this.disabled = !e;
    });
  }, q.fn.selected = function (r) {
    return void 0 === r && (r = !0), this.each(function () {
      var e,
          t = this.type;
      "checkbox" === t || "radio" === t ? this.checked = r : "option" === this.tagName.toLowerCase() && (e = q(this).parent("select"), r && e[0] && "select-one" === e[0].type && e.find("option").selected(!1), this.selected = r);
    });
  }, q.fn.ajaxSubmit.debug = !1;
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/data.js":
/*!*******************************************!*\
  !*** ./node_modules/jquery-ui/ui/data.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI :data 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: :data Selector
//>>group: Core
//>>description: Selects elements which have data stored under the specified key.
//>>docs: http://api.jqueryui.com/data-selector/
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  return $.extend($.expr.pseudos, {
    data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
      return function (elem) {
        return !!$.data(elem, dataName);
      };
    }) : // Support: jQuery <1.8
    function (elem, i, match) {
      return !!$.data(elem, match[3]);
    }
  });
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/disable-selection.js":
/*!********************************************************!*\
  !*** ./node_modules/jquery-ui/ui/disable-selection.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Disable Selection 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: disableSelection
//>>group: Core
//>>description: Disable selection of text content within the set of matched elements.
//>>docs: http://api.jqueryui.com/disableSelection/
// This file is deprecated
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  return $.fn.extend({
    disableSelection: function () {
      var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
      return function () {
        return this.on(eventType + ".ui-disableSelection", function (event) {
          event.preventDefault();
        });
      };
    }(),
    enableSelection: function enableSelection() {
      return this.off(".ui-disableSelection");
    }
  });
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/focusable.js":
/*!************************************************!*\
  !*** ./node_modules/jquery-ui/ui/focusable.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Focusable 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: :focusable Selector
//>>group: Core
//>>description: Selects elements which can be focused.
//>>docs: http://api.jqueryui.com/focusable-selector/
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict"; // Selectors

  $.ui.focusable = function (element, hasTabindex) {
    var map,
        mapName,
        img,
        focusableIfVisible,
        fieldset,
        nodeName = element.nodeName.toLowerCase();

    if ("area" === nodeName) {
      map = element.parentNode;
      mapName = map.name;

      if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
        return false;
      }

      img = $("img[usemap='#" + mapName + "']");
      return img.length > 0 && img.is(":visible");
    }

    if (/^(input|select|textarea|button|object)$/.test(nodeName)) {
      focusableIfVisible = !element.disabled;

      if (focusableIfVisible) {
        // Form controls within a disabled fieldset are disabled.
        // However, controls within the fieldset's legend do not get disabled.
        // Since controls generally aren't placed inside legends, we skip
        // this portion of the check.
        fieldset = $(element).closest("fieldset")[0];

        if (fieldset) {
          focusableIfVisible = !fieldset.disabled;
        }
      }
    } else if ("a" === nodeName) {
      focusableIfVisible = element.href || hasTabindex;
    } else {
      focusableIfVisible = hasTabindex;
    }

    return focusableIfVisible && $(element).is(":visible") && visible($(element));
  }; // Support: IE 8 only
  // IE 8 doesn't resolve inherit to visible/hidden for computed values


  function visible(element) {
    var visibility = element.css("visibility");

    while (visibility === "inherit") {
      element = element.parent();
      visibility = element.css("visibility");
    }

    return visibility === "visible";
  }

  $.extend($.expr.pseudos, {
    focusable: function focusable(element) {
      return $.ui.focusable(element, $.attr(element, "tabindex") != null);
    }
  });
  return $.ui.focusable;
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/form-reset-mixin.js":
/*!*******************************************************!*\
  !*** ./node_modules/jquery-ui/ui/form-reset-mixin.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Form Reset Mixin 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Form Reset Mixin
//>>group: Core
//>>description: Refresh input widgets when their form is reset
//>>docs: http://api.jqueryui.com/form-reset-mixin/
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./form */ "./node_modules/jquery-ui/ui/form.js"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  return $.ui.formResetMixin = {
    _formResetHandler: function _formResetHandler() {
      var form = $(this); // Wait for the form reset to actually happen before refreshing

      setTimeout(function () {
        var instances = form.data("ui-form-reset-instances");
        $.each(instances, function () {
          this.refresh();
        });
      });
    },
    _bindFormResetHandler: function _bindFormResetHandler() {
      this.form = this.element._form();

      if (!this.form.length) {
        return;
      }

      var instances = this.form.data("ui-form-reset-instances") || [];

      if (!instances.length) {
        // We don't use _on() here because we use a single event handler per form
        this.form.on("reset.ui-form-reset", this._formResetHandler);
      }

      instances.push(this);
      this.form.data("ui-form-reset-instances", instances);
    },
    _unbindFormResetHandler: function _unbindFormResetHandler() {
      if (!this.form.length) {
        return;
      }

      var instances = this.form.data("ui-form-reset-instances");
      instances.splice($.inArray(this, instances), 1);

      if (instances.length) {
        this.form.data("ui-form-reset-instances", instances);
      } else {
        this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset");
      }
    }
  };
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/form.js":
/*!*******************************************!*\
  !*** ./node_modules/jquery-ui/ui/form.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict"; // Support: IE8 Only
  // IE8 does not support the form attribute and when it is supplied. It overwrites the form prop
  // with a string, so we need to find the proper form.

  return $.fn._form = function () {
    return typeof this[0].form === "string" ? this.closest("form") : $(this[0].form);
  };
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/ie.js":
/*!*****************************************!*\
  !*** ./node_modules/jquery-ui/ui/ie.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict"; // This file is deprecated

  return $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/keycode.js":
/*!**********************************************!*\
  !*** ./node_modules/jquery-ui/ui/keycode.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Keycode 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Keycode
//>>group: Core
//>>description: Provide keycodes as keynames
//>>docs: http://api.jqueryui.com/jQuery.ui.keyCode/
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  return $.ui.keyCode = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38
  };
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/labels.js":
/*!*********************************************!*\
  !*** ./node_modules/jquery-ui/ui/labels.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Labels 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: labels
//>>group: Core
//>>description: Find all the labels associated with a given input
//>>docs: http://api.jqueryui.com/labels/
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  return $.fn.labels = function () {
    var ancestor, selector, id, labels, ancestors;

    if (!this.length) {
      return this.pushStack([]);
    } // Check control.labels first


    if (this[0].labels && this[0].labels.length) {
      return this.pushStack(this[0].labels);
    } // Support: IE <= 11, FF <= 37, Android <= 2.3 only
    // Above browsers do not support control.labels. Everything below is to support them
    // as well as document fragments. control.labels does not work on document fragments


    labels = this.eq(0).parents("label"); // Look for the label based on the id

    id = this.attr("id");

    if (id) {
      // We don't search against the document in case the element
      // is disconnected from the DOM
      ancestor = this.eq(0).parents().last(); // Get a full set of top level ancestors

      ancestors = ancestor.add(ancestor.length ? ancestor.siblings() : this.siblings()); // Create a selector for the label based on the id

      selector = "label[for='" + $.escapeSelector(id) + "']";
      labels = labels.add(ancestors.find(selector).addBack(selector));
    } // Return whatever we have found for labels


    return this.pushStack(labels);
  };
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/plugin.js":
/*!*********************************************!*\
  !*** ./node_modules/jquery-ui/ui/plugin.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict"; // $.ui.plugin is deprecated. Use $.widget() extensions instead.

  return $.ui.plugin = {
    add: function add(module, option, set) {
      var i,
          proto = $.ui[module].prototype;

      for (i in set) {
        proto.plugins[i] = proto.plugins[i] || [];
        proto.plugins[i].push([option, set[i]]);
      }
    },
    call: function call(instance, name, args, allowDisconnected) {
      var i,
          set = instance.plugins[name];

      if (!set) {
        return;
      }

      if (!allowDisconnected && (!instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11)) {
        return;
      }

      for (i = 0; i < set.length; i++) {
        if (instance.options[set[i][0]]) {
          set[i][1].apply(instance.element, args);
        }
      }
    }
  };
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/position.js":
/*!***********************************************!*\
  !*** ./node_modules/jquery-ui/ui/position.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Position 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
//>>label: Position
//>>group: Core
//>>description: Positions elements relative to other elements.
//>>docs: http://api.jqueryui.com/position/
//>>demos: http://jqueryui.com/position/
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  (function () {
    var cachedScrollbarWidth,
        max = Math.max,
        abs = Math.abs,
        rhorizontal = /left|center|right/,
        rvertical = /top|center|bottom/,
        roffset = /[\+\-]\d+(\.[\d]+)?%?/,
        rposition = /^\w+/,
        rpercent = /%$/,
        _position = $.fn.position;

    function getOffsets(offsets, width, height) {
      return [parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)];
    }

    function parseCss(element, property) {
      return parseInt($.css(element, property), 10) || 0;
    }

    function isWindow(obj) {
      return obj != null && obj === obj.window;
    }

    function getDimensions(elem) {
      var raw = elem[0];

      if (raw.nodeType === 9) {
        return {
          width: elem.width(),
          height: elem.height(),
          offset: {
            top: 0,
            left: 0
          }
        };
      }

      if (isWindow(raw)) {
        return {
          width: elem.width(),
          height: elem.height(),
          offset: {
            top: elem.scrollTop(),
            left: elem.scrollLeft()
          }
        };
      }

      if (raw.preventDefault) {
        return {
          width: 0,
          height: 0,
          offset: {
            top: raw.pageY,
            left: raw.pageX
          }
        };
      }

      return {
        width: elem.outerWidth(),
        height: elem.outerHeight(),
        offset: elem.offset()
      };
    }

    $.position = {
      scrollbarWidth: function scrollbarWidth() {
        if (cachedScrollbarWidth !== undefined) {
          return cachedScrollbarWidth;
        }

        var w1,
            w2,
            div = $("<div style=" + "'display:block;position:absolute;width:200px;height:200px;overflow:hidden;'>" + "<div style='height:300px;width:auto;'></div></div>"),
            innerDiv = div.children()[0];
        $("body").append(div);
        w1 = innerDiv.offsetWidth;
        div.css("overflow", "scroll");
        w2 = innerDiv.offsetWidth;

        if (w1 === w2) {
          w2 = div[0].clientWidth;
        }

        div.remove();
        return cachedScrollbarWidth = w1 - w2;
      },
      getScrollInfo: function getScrollInfo(within) {
        var overflowX = within.isWindow || within.isDocument ? "" : within.element.css("overflow-x"),
            overflowY = within.isWindow || within.isDocument ? "" : within.element.css("overflow-y"),
            hasOverflowX = overflowX === "scroll" || overflowX === "auto" && within.width < within.element[0].scrollWidth,
            hasOverflowY = overflowY === "scroll" || overflowY === "auto" && within.height < within.element[0].scrollHeight;
        return {
          width: hasOverflowY ? $.position.scrollbarWidth() : 0,
          height: hasOverflowX ? $.position.scrollbarWidth() : 0
        };
      },
      getWithinInfo: function getWithinInfo(element) {
        var withinElement = $(element || window),
            isElemWindow = isWindow(withinElement[0]),
            isDocument = !!withinElement[0] && withinElement[0].nodeType === 9,
            hasOffset = !isElemWindow && !isDocument;
        return {
          element: withinElement,
          isWindow: isElemWindow,
          isDocument: isDocument,
          offset: hasOffset ? $(element).offset() : {
            left: 0,
            top: 0
          },
          scrollLeft: withinElement.scrollLeft(),
          scrollTop: withinElement.scrollTop(),
          width: withinElement.outerWidth(),
          height: withinElement.outerHeight()
        };
      }
    };

    $.fn.position = function (options) {
      if (!options || !options.of) {
        return _position.apply(this, arguments);
      } // Make a copy, we don't want to modify arguments


      options = $.extend({}, options);
      var atOffset,
          targetWidth,
          targetHeight,
          targetOffset,
          basePosition,
          dimensions,
          // Make sure string options are treated as CSS selectors
      target = typeof options.of === "string" ? $(document).find(options.of) : $(options.of),
          within = $.position.getWithinInfo(options.within),
          scrollInfo = $.position.getScrollInfo(within),
          collision = (options.collision || "flip").split(" "),
          offsets = {};
      dimensions = getDimensions(target);

      if (target[0].preventDefault) {
        // Force left top to allow flipping
        options.at = "left top";
      }

      targetWidth = dimensions.width;
      targetHeight = dimensions.height;
      targetOffset = dimensions.offset; // Clone to reuse original targetOffset later

      basePosition = $.extend({}, targetOffset); // Force my and at to have valid horizontal and vertical positions
      // if a value is missing or invalid, it will be converted to center

      $.each(["my", "at"], function () {
        var pos = (options[this] || "").split(" "),
            horizontalOffset,
            verticalOffset;

        if (pos.length === 1) {
          pos = rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"];
        }

        pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
        pos[1] = rvertical.test(pos[1]) ? pos[1] : "center"; // Calculate offsets

        horizontalOffset = roffset.exec(pos[0]);
        verticalOffset = roffset.exec(pos[1]);
        offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0]; // Reduce to just the positions without the offsets

        options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
      }); // Normalize collision option

      if (collision.length === 1) {
        collision[1] = collision[0];
      }

      if (options.at[0] === "right") {
        basePosition.left += targetWidth;
      } else if (options.at[0] === "center") {
        basePosition.left += targetWidth / 2;
      }

      if (options.at[1] === "bottom") {
        basePosition.top += targetHeight;
      } else if (options.at[1] === "center") {
        basePosition.top += targetHeight / 2;
      }

      atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
      basePosition.left += atOffset[0];
      basePosition.top += atOffset[1];
      return this.each(function () {
        var collisionPosition,
            using,
            elem = $(this),
            elemWidth = elem.outerWidth(),
            elemHeight = elem.outerHeight(),
            marginLeft = parseCss(this, "marginLeft"),
            marginTop = parseCss(this, "marginTop"),
            collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width,
            collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height,
            position = $.extend({}, basePosition),
            myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());

        if (options.my[0] === "right") {
          position.left -= elemWidth;
        } else if (options.my[0] === "center") {
          position.left -= elemWidth / 2;
        }

        if (options.my[1] === "bottom") {
          position.top -= elemHeight;
        } else if (options.my[1] === "center") {
          position.top -= elemHeight / 2;
        }

        position.left += myOffset[0];
        position.top += myOffset[1];
        collisionPosition = {
          marginLeft: marginLeft,
          marginTop: marginTop
        };
        $.each(["left", "top"], function (i, dir) {
          if ($.ui.position[collision[i]]) {
            $.ui.position[collision[i]][dir](position, {
              targetWidth: targetWidth,
              targetHeight: targetHeight,
              elemWidth: elemWidth,
              elemHeight: elemHeight,
              collisionPosition: collisionPosition,
              collisionWidth: collisionWidth,
              collisionHeight: collisionHeight,
              offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
              my: options.my,
              at: options.at,
              within: within,
              elem: elem
            });
          }
        });

        if (options.using) {
          // Adds feedback as second argument to using callback, if present
          using = function using(props) {
            var left = targetOffset.left - position.left,
                right = left + targetWidth - elemWidth,
                top = targetOffset.top - position.top,
                bottom = top + targetHeight - elemHeight,
                feedback = {
              target: {
                element: target,
                left: targetOffset.left,
                top: targetOffset.top,
                width: targetWidth,
                height: targetHeight
              },
              element: {
                element: elem,
                left: position.left,
                top: position.top,
                width: elemWidth,
                height: elemHeight
              },
              horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
              vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
            };

            if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
              feedback.horizontal = "center";
            }

            if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
              feedback.vertical = "middle";
            }

            if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
              feedback.important = "horizontal";
            } else {
              feedback.important = "vertical";
            }

            options.using.call(this, props, feedback);
          };
        }

        elem.offset($.extend(position, {
          using: using
        }));
      });
    };

    $.ui.position = {
      fit: {
        left: function left(position, data) {
          var within = data.within,
              withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
              outerWidth = within.width,
              collisionPosLeft = position.left - data.collisionPosition.marginLeft,
              overLeft = withinOffset - collisionPosLeft,
              overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
              newOverRight; // Element is wider than within

          if (data.collisionWidth > outerWidth) {
            // Element is initially over the left side of within
            if (overLeft > 0 && overRight <= 0) {
              newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
              position.left += overLeft - newOverRight; // Element is initially over right side of within
            } else if (overRight > 0 && overLeft <= 0) {
              position.left = withinOffset; // Element is initially over both left and right sides of within
            } else {
              if (overLeft > overRight) {
                position.left = withinOffset + outerWidth - data.collisionWidth;
              } else {
                position.left = withinOffset;
              }
            } // Too far left -> align with left edge

          } else if (overLeft > 0) {
            position.left += overLeft; // Too far right -> align with right edge
          } else if (overRight > 0) {
            position.left -= overRight; // Adjust based on position and margin
          } else {
            position.left = max(position.left - collisionPosLeft, position.left);
          }
        },
        top: function top(position, data) {
          var within = data.within,
              withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
              outerHeight = data.within.height,
              collisionPosTop = position.top - data.collisionPosition.marginTop,
              overTop = withinOffset - collisionPosTop,
              overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
              newOverBottom; // Element is taller than within

          if (data.collisionHeight > outerHeight) {
            // Element is initially over the top of within
            if (overTop > 0 && overBottom <= 0) {
              newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
              position.top += overTop - newOverBottom; // Element is initially over bottom of within
            } else if (overBottom > 0 && overTop <= 0) {
              position.top = withinOffset; // Element is initially over both top and bottom of within
            } else {
              if (overTop > overBottom) {
                position.top = withinOffset + outerHeight - data.collisionHeight;
              } else {
                position.top = withinOffset;
              }
            } // Too far up -> align with top

          } else if (overTop > 0) {
            position.top += overTop; // Too far down -> align with bottom edge
          } else if (overBottom > 0) {
            position.top -= overBottom; // Adjust based on position and margin
          } else {
            position.top = max(position.top - collisionPosTop, position.top);
          }
        }
      },
      flip: {
        left: function left(position, data) {
          var within = data.within,
              withinOffset = within.offset.left + within.scrollLeft,
              outerWidth = within.width,
              offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
              collisionPosLeft = position.left - data.collisionPosition.marginLeft,
              overLeft = collisionPosLeft - offsetLeft,
              overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
              myOffset = data.my[0] === "left" ? -data.elemWidth : data.my[0] === "right" ? data.elemWidth : 0,
              atOffset = data.at[0] === "left" ? data.targetWidth : data.at[0] === "right" ? -data.targetWidth : 0,
              offset = -2 * data.offset[0],
              newOverRight,
              newOverLeft;

          if (overLeft < 0) {
            newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;

            if (newOverRight < 0 || newOverRight < abs(overLeft)) {
              position.left += myOffset + atOffset + offset;
            }
          } else if (overRight > 0) {
            newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;

            if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
              position.left += myOffset + atOffset + offset;
            }
          }
        },
        top: function top(position, data) {
          var within = data.within,
              withinOffset = within.offset.top + within.scrollTop,
              outerHeight = within.height,
              offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
              collisionPosTop = position.top - data.collisionPosition.marginTop,
              overTop = collisionPosTop - offsetTop,
              overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
              top = data.my[1] === "top",
              myOffset = top ? -data.elemHeight : data.my[1] === "bottom" ? data.elemHeight : 0,
              atOffset = data.at[1] === "top" ? data.targetHeight : data.at[1] === "bottom" ? -data.targetHeight : 0,
              offset = -2 * data.offset[1],
              newOverTop,
              newOverBottom;

          if (overTop < 0) {
            newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;

            if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
              position.top += myOffset + atOffset + offset;
            }
          } else if (overBottom > 0) {
            newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;

            if (newOverTop > 0 || abs(newOverTop) < overBottom) {
              position.top += myOffset + atOffset + offset;
            }
          }
        }
      },
      flipfit: {
        left: function left() {
          $.ui.position.flip.left.apply(this, arguments);
          $.ui.position.fit.left.apply(this, arguments);
        },
        top: function top() {
          $.ui.position.flip.top.apply(this, arguments);
          $.ui.position.fit.top.apply(this, arguments);
        }
      }
    };
  })();

  return $.ui.position;
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/safe-active-element.js":
/*!**********************************************************!*\
  !*** ./node_modules/jquery-ui/ui/safe-active-element.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  return $.ui.safeActiveElement = function (document) {
    var activeElement; // Support: IE 9 only
    // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>

    try {
      activeElement = document.activeElement;
    } catch (error) {
      activeElement = document.body;
    } // Support: IE 9 - 11 only
    // IE may return null instead of an element
    // Interestingly, this only seems to occur when NOT in an iframe


    if (!activeElement) {
      activeElement = document.body;
    } // Support: IE 11 only
    // IE11 returns a seemingly empty object in some cases when accessing
    // document.activeElement from an <iframe>


    if (!activeElement.nodeName) {
      activeElement = document.body;
    }

    return activeElement;
  };
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/safe-blur.js":
/*!************************************************!*\
  !*** ./node_modules/jquery-ui/ui/safe-blur.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  return $.ui.safeBlur = function (element) {
    // Support: IE9 - 10 only
    // If the <body> is blurred, IE will switch windows, see #9420
    if (element && element.nodeName.toLowerCase() !== "body") {
      $(element).trigger("blur");
    }
  };
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/scroll-parent.js":
/*!****************************************************!*\
  !*** ./node_modules/jquery-ui/ui/scroll-parent.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Scroll Parent 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: scrollParent
//>>group: Core
//>>description: Get the closest ancestor element that is scrollable.
//>>docs: http://api.jqueryui.com/scrollParent/
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  return $.fn.scrollParent = function (includeHidden) {
    var position = this.css("position"),
        excludeStaticParent = position === "absolute",
        overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        scrollParent = this.parents().filter(function () {
      var parent = $(this);

      if (excludeStaticParent && parent.css("position") === "static") {
        return false;
      }

      return overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
    }).eq(0);
    return position === "fixed" || !scrollParent.length ? $(this[0].ownerDocument || document) : scrollParent;
  };
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/tabbable.js":
/*!***********************************************!*\
  !*** ./node_modules/jquery-ui/ui/tabbable.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Tabbable 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: :tabbable Selector
//>>group: Core
//>>description: Selects elements which can be tabbed to.
//>>docs: http://api.jqueryui.com/tabbable-selector/
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js"), __webpack_require__(/*! ./focusable */ "./node_modules/jquery-ui/ui/focusable.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  return $.extend($.expr.pseudos, {
    tabbable: function tabbable(element) {
      var tabIndex = $.attr(element, "tabindex"),
          hasTabindex = tabIndex != null;
      return (!hasTabindex || tabIndex >= 0) && $.ui.focusable(element, hasTabindex);
    }
  });
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/unique-id.js":
/*!************************************************!*\
  !*** ./node_modules/jquery-ui/ui/unique-id.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Unique ID 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: uniqueId
//>>group: Core
//>>description: Functions to generate and remove uniqueId's
//>>docs: http://api.jqueryui.com/uniqueId/
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  return $.fn.extend({
    uniqueId: function () {
      var uuid = 0;
      return function () {
        return this.each(function () {
          if (!this.id) {
            this.id = "ui-id-" + ++uuid;
          }
        });
      };
    }(),
    removeUniqueId: function removeUniqueId() {
      return this.each(function () {
        if (/^ui-id-\d+$/.test(this.id)) {
          $(this).removeAttr("id");
        }
      });
    }
  });
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/version.js":
/*!**********************************************!*\
  !*** ./node_modules/jquery-ui/ui/version.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  $.ui = $.ui || {};
  return $.ui.version = "1.13.2";
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/widget.js":
/*!*********************************************!*\
  !*** ./node_modules/jquery-ui/ui/widget.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Widget 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Widget
//>>group: Core
//>>description: Provides a factory for creating stateful widgets with a common API.
//>>docs: http://api.jqueryui.com/jQuery.widget/
//>>demos: http://jqueryui.com/widget/
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./version */ "./node_modules/jquery-ui/ui/version.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  var widgetUuid = 0;
  var widgetHasOwnProperty = Array.prototype.hasOwnProperty;
  var widgetSlice = Array.prototype.slice;

  $.cleanData = function (orig) {
    return function (elems) {
      var events, elem, i;

      for (i = 0; (elem = elems[i]) != null; i++) {
        // Only trigger remove when necessary to save time
        events = $._data(elem, "events");

        if (events && events.remove) {
          $(elem).triggerHandler("remove");
        }
      }

      orig(elems);
    };
  }($.cleanData);

  $.widget = function (name, base, prototype) {
    var existingConstructor, constructor, basePrototype; // ProxiedPrototype allows the provided prototype to remain unmodified
    // so that it can be used as a mixin for multiple widgets (#8876)

    var proxiedPrototype = {};
    var namespace = name.split(".")[0];
    name = name.split(".")[1];
    var fullName = namespace + "-" + name;

    if (!prototype) {
      prototype = base;
      base = $.Widget;
    }

    if (Array.isArray(prototype)) {
      prototype = $.extend.apply(null, [{}].concat(prototype));
    } // Create selector for plugin


    $.expr.pseudos[fullName.toLowerCase()] = function (elem) {
      return !!$.data(elem, fullName);
    };

    $[namespace] = $[namespace] || {};
    existingConstructor = $[namespace][name];

    constructor = $[namespace][name] = function (options, element) {
      // Allow instantiation without "new" keyword
      if (!this || !this._createWidget) {
        return new constructor(options, element);
      } // Allow instantiation without initializing for simple inheritance
      // must use "new" keyword (the code above always passes args)


      if (arguments.length) {
        this._createWidget(options, element);
      }
    }; // Extend with the existing constructor to carry over any static properties


    $.extend(constructor, existingConstructor, {
      version: prototype.version,
      // Copy the object used to create the prototype in case we need to
      // redefine the widget later
      _proto: $.extend({}, prototype),
      // Track widgets that inherit from this widget in case this widget is
      // redefined after a widget inherits from it
      _childConstructors: []
    });
    basePrototype = new base(); // We need to make the options hash a property directly on the new instance
    // otherwise we'll modify the options hash on the prototype that we're
    // inheriting from

    basePrototype.options = $.widget.extend({}, basePrototype.options);
    $.each(prototype, function (prop, value) {
      if (typeof value !== "function") {
        proxiedPrototype[prop] = value;
        return;
      }

      proxiedPrototype[prop] = function () {
        function _super() {
          return base.prototype[prop].apply(this, arguments);
        }

        function _superApply(args) {
          return base.prototype[prop].apply(this, args);
        }

        return function () {
          var __super = this._super;
          var __superApply = this._superApply;
          var returnValue;
          this._super = _super;
          this._superApply = _superApply;
          returnValue = value.apply(this, arguments);
          this._super = __super;
          this._superApply = __superApply;
          return returnValue;
        };
      }();
    });
    constructor.prototype = $.widget.extend(basePrototype, {
      // TODO: remove support for widgetEventPrefix
      // always use the name + a colon as the prefix, e.g., draggable:start
      // don't prefix for widgets that aren't DOM-based
      widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
    }, proxiedPrototype, {
      constructor: constructor,
      namespace: namespace,
      widgetName: name,
      widgetFullName: fullName
    }); // If this widget is being redefined then we need to find all widgets that
    // are inheriting from it and redefine all of them so that they inherit from
    // the new version of this widget. We're essentially trying to replace one
    // level in the prototype chain.

    if (existingConstructor) {
      $.each(existingConstructor._childConstructors, function (i, child) {
        var childPrototype = child.prototype; // Redefine the child widget using the same prototype that was
        // originally used, but inherit from the new version of the base

        $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
      }); // Remove the list of existing child constructors from the old constructor
      // so the old child constructors can be garbage collected

      delete existingConstructor._childConstructors;
    } else {
      base._childConstructors.push(constructor);
    }

    $.widget.bridge(name, constructor);
    return constructor;
  };

  $.widget.extend = function (target) {
    var input = widgetSlice.call(arguments, 1);
    var inputIndex = 0;
    var inputLength = input.length;
    var key;
    var value;

    for (; inputIndex < inputLength; inputIndex++) {
      for (key in input[inputIndex]) {
        value = input[inputIndex][key];

        if (widgetHasOwnProperty.call(input[inputIndex], key) && value !== undefined) {
          // Clone objects
          if ($.isPlainObject(value)) {
            target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : // Don't extend strings, arrays, etc. with objects
            $.widget.extend({}, value); // Copy everything else by reference
          } else {
            target[key] = value;
          }
        }
      }
    }

    return target;
  };

  $.widget.bridge = function (name, object) {
    var fullName = object.prototype.widgetFullName || name;

    $.fn[name] = function (options) {
      var isMethodCall = typeof options === "string";
      var args = widgetSlice.call(arguments, 1);
      var returnValue = this;

      if (isMethodCall) {
        // If this is an empty collection, we need to have the instance method
        // return undefined instead of the jQuery instance
        if (!this.length && options === "instance") {
          returnValue = undefined;
        } else {
          this.each(function () {
            var methodValue;
            var instance = $.data(this, fullName);

            if (options === "instance") {
              returnValue = instance;
              return false;
            }

            if (!instance) {
              return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'");
            }

            if (typeof instance[options] !== "function" || options.charAt(0) === "_") {
              return $.error("no such method '" + options + "' for " + name + " widget instance");
            }

            methodValue = instance[options].apply(instance, args);

            if (methodValue !== instance && methodValue !== undefined) {
              returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
              return false;
            }
          });
        }
      } else {
        // Allow multiple hashes to be passed on init
        if (args.length) {
          options = $.widget.extend.apply(null, [options].concat(args));
        }

        this.each(function () {
          var instance = $.data(this, fullName);

          if (instance) {
            instance.option(options || {});

            if (instance._init) {
              instance._init();
            }
          } else {
            $.data(this, fullName, new object(options, this));
          }
        });
      }

      return returnValue;
    };
  };

  $.Widget = function () {};

  $.Widget._childConstructors = [];
  $.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {
      classes: {},
      disabled: false,
      // Callbacks
      create: null
    },
    _createWidget: function _createWidget(options, element) {
      element = $(element || this.defaultElement || this)[0];
      this.element = $(element);
      this.uuid = widgetUuid++;
      this.eventNamespace = "." + this.widgetName + this.uuid;
      this.bindings = $();
      this.hoverable = $();
      this.focusable = $();
      this.classesElementLookup = {};

      if (element !== this) {
        $.data(element, this.widgetFullName, this);

        this._on(true, this.element, {
          remove: function remove(event) {
            if (event.target === element) {
              this.destroy();
            }
          }
        });

        this.document = $(element.style ? // Element within the document
        element.ownerDocument : // Element is window or document
        element.document || element);
        this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
      }

      this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);

      this._create();

      if (this.options.disabled) {
        this._setOptionDisabled(this.options.disabled);
      }

      this._trigger("create", null, this._getCreateEventData());

      this._init();
    },
    _getCreateOptions: function _getCreateOptions() {
      return {};
    },
    _getCreateEventData: $.noop,
    _create: $.noop,
    _init: $.noop,
    destroy: function destroy() {
      var that = this;

      this._destroy();

      $.each(this.classesElementLookup, function (key, value) {
        that._removeClass(value, key);
      }); // We can probably remove the unbind calls in 2.0
      // all event bindings should go through this._on()

      this.element.off(this.eventNamespace).removeData(this.widgetFullName);
      this.widget().off(this.eventNamespace).removeAttr("aria-disabled"); // Clean up events and states

      this.bindings.off(this.eventNamespace);
    },
    _destroy: $.noop,
    widget: function widget() {
      return this.element;
    },
    option: function option(key, value) {
      var options = key;
      var parts;
      var curOption;
      var i;

      if (arguments.length === 0) {
        // Don't return a reference to the internal hash
        return $.widget.extend({}, this.options);
      }

      if (typeof key === "string") {
        // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
        options = {};
        parts = key.split(".");
        key = parts.shift();

        if (parts.length) {
          curOption = options[key] = $.widget.extend({}, this.options[key]);

          for (i = 0; i < parts.length - 1; i++) {
            curOption[parts[i]] = curOption[parts[i]] || {};
            curOption = curOption[parts[i]];
          }

          key = parts.pop();

          if (arguments.length === 1) {
            return curOption[key] === undefined ? null : curOption[key];
          }

          curOption[key] = value;
        } else {
          if (arguments.length === 1) {
            return this.options[key] === undefined ? null : this.options[key];
          }

          options[key] = value;
        }
      }

      this._setOptions(options);

      return this;
    },
    _setOptions: function _setOptions(options) {
      var key;

      for (key in options) {
        this._setOption(key, options[key]);
      }

      return this;
    },
    _setOption: function _setOption(key, value) {
      if (key === "classes") {
        this._setOptionClasses(value);
      }

      this.options[key] = value;

      if (key === "disabled") {
        this._setOptionDisabled(value);
      }

      return this;
    },
    _setOptionClasses: function _setOptionClasses(value) {
      var classKey, elements, currentElements;

      for (classKey in value) {
        currentElements = this.classesElementLookup[classKey];

        if (value[classKey] === this.options.classes[classKey] || !currentElements || !currentElements.length) {
          continue;
        } // We are doing this to create a new jQuery object because the _removeClass() call
        // on the next line is going to destroy the reference to the current elements being
        // tracked. We need to save a copy of this collection so that we can add the new classes
        // below.


        elements = $(currentElements.get());

        this._removeClass(currentElements, classKey); // We don't use _addClass() here, because that uses this.options.classes
        // for generating the string of classes. We want to use the value passed in from
        // _setOption(), this is the new value of the classes option which was passed to
        // _setOption(). We pass this value directly to _classes().


        elements.addClass(this._classes({
          element: elements,
          keys: classKey,
          classes: value,
          add: true
        }));
      }
    },
    _setOptionDisabled: function _setOptionDisabled(value) {
      this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!value); // If the widget is becoming disabled, then nothing is interactive


      if (value) {
        this._removeClass(this.hoverable, null, "ui-state-hover");

        this._removeClass(this.focusable, null, "ui-state-focus");
      }
    },
    enable: function enable() {
      return this._setOptions({
        disabled: false
      });
    },
    disable: function disable() {
      return this._setOptions({
        disabled: true
      });
    },
    _classes: function _classes(options) {
      var full = [];
      var that = this;
      options = $.extend({
        element: this.element,
        classes: this.options.classes || {}
      }, options);

      function bindRemoveEvent() {
        var nodesToBind = [];
        options.element.each(function (_, element) {
          var isTracked = $.map(that.classesElementLookup, function (elements) {
            return elements;
          }).some(function (elements) {
            return elements.is(element);
          });

          if (!isTracked) {
            nodesToBind.push(element);
          }
        });

        that._on($(nodesToBind), {
          remove: "_untrackClassesElement"
        });
      }

      function processClassString(classes, checkOption) {
        var current, i;

        for (i = 0; i < classes.length; i++) {
          current = that.classesElementLookup[classes[i]] || $();

          if (options.add) {
            bindRemoveEvent();
            current = $($.uniqueSort(current.get().concat(options.element.get())));
          } else {
            current = $(current.not(options.element).get());
          }

          that.classesElementLookup[classes[i]] = current;
          full.push(classes[i]);

          if (checkOption && options.classes[classes[i]]) {
            full.push(options.classes[classes[i]]);
          }
        }
      }

      if (options.keys) {
        processClassString(options.keys.match(/\S+/g) || [], true);
      }

      if (options.extra) {
        processClassString(options.extra.match(/\S+/g) || []);
      }

      return full.join(" ");
    },
    _untrackClassesElement: function _untrackClassesElement(event) {
      var that = this;
      $.each(that.classesElementLookup, function (key, value) {
        if ($.inArray(event.target, value) !== -1) {
          that.classesElementLookup[key] = $(value.not(event.target).get());
        }
      });

      this._off($(event.target));
    },
    _removeClass: function _removeClass(element, keys, extra) {
      return this._toggleClass(element, keys, extra, false);
    },
    _addClass: function _addClass(element, keys, extra) {
      return this._toggleClass(element, keys, extra, true);
    },
    _toggleClass: function _toggleClass(element, keys, extra, add) {
      add = typeof add === "boolean" ? add : extra;
      var shift = typeof element === "string" || element === null,
          options = {
        extra: shift ? keys : extra,
        keys: shift ? element : keys,
        element: shift ? this.element : element,
        add: add
      };
      options.element.toggleClass(this._classes(options), add);
      return this;
    },
    _on: function _on(suppressDisabledCheck, element, handlers) {
      var delegateElement;
      var instance = this; // No suppressDisabledCheck flag, shuffle arguments

      if (typeof suppressDisabledCheck !== "boolean") {
        handlers = element;
        element = suppressDisabledCheck;
        suppressDisabledCheck = false;
      } // No element argument, shuffle and use this.element


      if (!handlers) {
        handlers = element;
        element = this.element;
        delegateElement = this.widget();
      } else {
        element = delegateElement = $(element);
        this.bindings = this.bindings.add(element);
      }

      $.each(handlers, function (event, handler) {
        function handlerProxy() {
          // Allow widgets to customize the disabled handling
          // - disabled as an array instead of boolean
          // - disabled class as method for disabling individual parts
          if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
            return;
          }

          return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
        } // Copy the guid so direct unbinding works


        if (typeof handler !== "string") {
          handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
        }

        var match = event.match(/^([\w:-]*)\s*(.*)$/);
        var eventName = match[1] + instance.eventNamespace;
        var selector = match[2];

        if (selector) {
          delegateElement.on(eventName, selector, handlerProxy);
        } else {
          element.on(eventName, handlerProxy);
        }
      });
    },
    _off: function _off(element, eventName) {
      eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
      element.off(eventName); // Clear the stack to avoid memory leaks (#10056)

      this.bindings = $(this.bindings.not(element).get());
      this.focusable = $(this.focusable.not(element).get());
      this.hoverable = $(this.hoverable.not(element).get());
    },
    _delay: function _delay(handler, delay) {
      function handlerProxy() {
        return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
      }

      var instance = this;
      return setTimeout(handlerProxy, delay || 0);
    },
    _hoverable: function _hoverable(element) {
      this.hoverable = this.hoverable.add(element);

      this._on(element, {
        mouseenter: function mouseenter(event) {
          this._addClass($(event.currentTarget), null, "ui-state-hover");
        },
        mouseleave: function mouseleave(event) {
          this._removeClass($(event.currentTarget), null, "ui-state-hover");
        }
      });
    },
    _focusable: function _focusable(element) {
      this.focusable = this.focusable.add(element);

      this._on(element, {
        focusin: function focusin(event) {
          this._addClass($(event.currentTarget), null, "ui-state-focus");
        },
        focusout: function focusout(event) {
          this._removeClass($(event.currentTarget), null, "ui-state-focus");
        }
      });
    },
    _trigger: function _trigger(type, event, data) {
      var prop, orig;
      var callback = this.options[type];
      data = data || {};
      event = $.Event(event);
      event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(); // The original event may come from any element
      // so we need to reset the target on the new event

      event.target = this.element[0]; // Copy original event properties over to the new event

      orig = event.originalEvent;

      if (orig) {
        for (prop in orig) {
          if (!(prop in event)) {
            event[prop] = orig[prop];
          }
        }
      }

      this.element.trigger(event, data);
      return !(typeof callback === "function" && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
    }
  };
  $.each({
    show: "fadeIn",
    hide: "fadeOut"
  }, function (method, defaultEffect) {
    $.Widget.prototype["_" + method] = function (element, options, callback) {
      if (typeof options === "string") {
        options = {
          effect: options
        };
      }

      var hasOptions;
      var effectName = !options ? method : options === true || typeof options === "number" ? defaultEffect : options.effect || defaultEffect;
      options = options || {};

      if (typeof options === "number") {
        options = {
          duration: options
        };
      } else if (options === true) {
        options = {};
      }

      hasOptions = !$.isEmptyObject(options);
      options.complete = callback;

      if (options.delay) {
        element.delay(options.delay);
      }

      if (hasOptions && $.effects && $.effects.effect[effectName]) {
        element[method](options);
      } else if (effectName !== method && element[effectName]) {
        element[effectName](options.duration, options.easing, callback);
      } else {
        element.queue(function (next) {
          $(this)[method]();

          if (callback) {
            callback.call(element[0]);
          }

          next();
        });
      }
    };
  });
  return $.widget;
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/widgets/button.js":
/*!*****************************************************!*\
  !*** ./node_modules/jquery-ui/ui/widgets/button.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * jQuery UI Button 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Button
//>>group: Widgets
//>>description: Enhances a form with themeable buttons.
//>>docs: http://api.jqueryui.com/button/
//>>demos: http://jqueryui.com/button/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/button.css
//>>css.theme: ../../themes/base/theme.css
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), // These are only for backcompat
    // TODO: Remove after 1.12
    __webpack_require__(/*! ./controlgroup */ "./node_modules/jquery-ui/ui/widgets/controlgroup.js"), __webpack_require__(/*! ./checkboxradio */ "./node_modules/jquery-ui/ui/widgets/checkboxradio.js"), __webpack_require__(/*! ../keycode */ "./node_modules/jquery-ui/ui/keycode.js"), __webpack_require__(/*! ../widget */ "./node_modules/jquery-ui/ui/widget.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  $.widget("ui.button", {
    version: "1.13.2",
    defaultElement: "<button>",
    options: {
      classes: {
        "ui-button": "ui-corner-all"
      },
      disabled: null,
      icon: null,
      iconPosition: "beginning",
      label: null,
      showLabel: true
    },
    _getCreateOptions: function _getCreateOptions() {
      var disabled,
          // This is to support cases like in jQuery Mobile where the base widget does have
      // an implementation of _getCreateOptions
      options = this._super() || {};
      this.isInput = this.element.is("input");
      disabled = this.element[0].disabled;

      if (disabled != null) {
        options.disabled = disabled;
      }

      this.originalLabel = this.isInput ? this.element.val() : this.element.html();

      if (this.originalLabel) {
        options.label = this.originalLabel;
      }

      return options;
    },
    _create: function _create() {
      if (!this.option.showLabel & !this.options.icon) {
        this.options.showLabel = true;
      } // We have to check the option again here even though we did in _getCreateOptions,
      // because null may have been passed on init which would override what was set in
      // _getCreateOptions


      if (this.options.disabled == null) {
        this.options.disabled = this.element[0].disabled || false;
      }

      this.hasTitle = !!this.element.attr("title"); // Check to see if the label needs to be set or if its already correct

      if (this.options.label && this.options.label !== this.originalLabel) {
        if (this.isInput) {
          this.element.val(this.options.label);
        } else {
          this.element.html(this.options.label);
        }
      }

      this._addClass("ui-button", "ui-widget");

      this._setOption("disabled", this.options.disabled);

      this._enhance();

      if (this.element.is("a")) {
        this._on({
          "keyup": function keyup(event) {
            if (event.keyCode === $.ui.keyCode.SPACE) {
              event.preventDefault(); // Support: PhantomJS <= 1.9, IE 8 Only
              // If a native click is available use it so we actually cause navigation
              // otherwise just trigger a click event

              if (this.element[0].click) {
                this.element[0].click();
              } else {
                this.element.trigger("click");
              }
            }
          }
        });
      }
    },
    _enhance: function _enhance() {
      if (!this.element.is("button")) {
        this.element.attr("role", "button");
      }

      if (this.options.icon) {
        this._updateIcon("icon", this.options.icon);

        this._updateTooltip();
      }
    },
    _updateTooltip: function _updateTooltip() {
      this.title = this.element.attr("title");

      if (!this.options.showLabel && !this.title) {
        this.element.attr("title", this.options.label);
      }
    },
    _updateIcon: function _updateIcon(option, value) {
      var icon = option !== "iconPosition",
          position = icon ? this.options.iconPosition : value,
          displayBlock = position === "top" || position === "bottom"; // Create icon

      if (!this.icon) {
        this.icon = $("<span>");

        this._addClass(this.icon, "ui-button-icon", "ui-icon");

        if (!this.options.showLabel) {
          this._addClass("ui-button-icon-only");
        }
      } else if (icon) {
        // If we are updating the icon remove the old icon class
        this._removeClass(this.icon, null, this.options.icon);
      } // If we are updating the icon add the new icon class


      if (icon) {
        this._addClass(this.icon, null, value);
      }

      this._attachIcon(position); // If the icon is on top or bottom we need to add the ui-widget-icon-block class and remove
      // the iconSpace if there is one.


      if (displayBlock) {
        this._addClass(this.icon, null, "ui-widget-icon-block");

        if (this.iconSpace) {
          this.iconSpace.remove();
        }
      } else {
        // Position is beginning or end so remove the ui-widget-icon-block class and add the
        // space if it does not exist
        if (!this.iconSpace) {
          this.iconSpace = $("<span> </span>");

          this._addClass(this.iconSpace, "ui-button-icon-space");
        }

        this._removeClass(this.icon, null, "ui-wiget-icon-block");

        this._attachIconSpace(position);
      }
    },
    _destroy: function _destroy() {
      this.element.removeAttr("role");

      if (this.icon) {
        this.icon.remove();
      }

      if (this.iconSpace) {
        this.iconSpace.remove();
      }

      if (!this.hasTitle) {
        this.element.removeAttr("title");
      }
    },
    _attachIconSpace: function _attachIconSpace(iconPosition) {
      this.icon[/^(?:end|bottom)/.test(iconPosition) ? "before" : "after"](this.iconSpace);
    },
    _attachIcon: function _attachIcon(iconPosition) {
      this.element[/^(?:end|bottom)/.test(iconPosition) ? "append" : "prepend"](this.icon);
    },
    _setOptions: function _setOptions(options) {
      var newShowLabel = options.showLabel === undefined ? this.options.showLabel : options.showLabel,
          newIcon = options.icon === undefined ? this.options.icon : options.icon;

      if (!newShowLabel && !newIcon) {
        options.showLabel = true;
      }

      this._super(options);
    },
    _setOption: function _setOption(key, value) {
      if (key === "icon") {
        if (value) {
          this._updateIcon(key, value);
        } else if (this.icon) {
          this.icon.remove();

          if (this.iconSpace) {
            this.iconSpace.remove();
          }
        }
      }

      if (key === "iconPosition") {
        this._updateIcon(key, value);
      } // Make sure we can't end up with a button that has neither text nor icon


      if (key === "showLabel") {
        this._toggleClass("ui-button-icon-only", null, !value);

        this._updateTooltip();
      }

      if (key === "label") {
        if (this.isInput) {
          this.element.val(value);
        } else {
          // If there is an icon, append it, else nothing then append the value
          // this avoids removal of the icon when setting label text
          this.element.html(value);

          if (this.icon) {
            this._attachIcon(this.options.iconPosition);

            this._attachIconSpace(this.options.iconPosition);
          }
        }
      }

      this._super(key, value);

      if (key === "disabled") {
        this._toggleClass(null, "ui-state-disabled", value);

        this.element[0].disabled = value;

        if (value) {
          this.element.trigger("blur");
        }
      }
    },
    refresh: function refresh() {
      // Make sure to only check disabled if its an element that supports this otherwise
      // check for the disabled class to determine state
      var isDisabled = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");

      if (isDisabled !== this.options.disabled) {
        this._setOptions({
          disabled: isDisabled
        });
      }

      this._updateTooltip();
    }
  }); // DEPRECATED

  if ($.uiBackCompat !== false) {
    // Text and Icons options
    $.widget("ui.button", $.ui.button, {
      options: {
        text: true,
        icons: {
          primary: null,
          secondary: null
        }
      },
      _create: function _create() {
        if (this.options.showLabel && !this.options.text) {
          this.options.showLabel = this.options.text;
        }

        if (!this.options.showLabel && this.options.text) {
          this.options.text = this.options.showLabel;
        }

        if (!this.options.icon && (this.options.icons.primary || this.options.icons.secondary)) {
          if (this.options.icons.primary) {
            this.options.icon = this.options.icons.primary;
          } else {
            this.options.icon = this.options.icons.secondary;
            this.options.iconPosition = "end";
          }
        } else if (this.options.icon) {
          this.options.icons.primary = this.options.icon;
        }

        this._super();
      },
      _setOption: function _setOption(key, value) {
        if (key === "text") {
          this._super("showLabel", value);

          return;
        }

        if (key === "showLabel") {
          this.options.text = value;
        }

        if (key === "icon") {
          this.options.icons.primary = value;
        }

        if (key === "icons") {
          if (value.primary) {
            this._super("icon", value.primary);

            this._super("iconPosition", "beginning");
          } else if (value.secondary) {
            this._super("icon", value.secondary);

            this._super("iconPosition", "end");
          }
        }

        this._superApply(arguments);
      }
    });

    $.fn.button = function (orig) {
      return function (options) {
        var isMethodCall = typeof options === "string";
        var args = Array.prototype.slice.call(arguments, 1);
        var returnValue = this;

        if (isMethodCall) {
          // If this is an empty collection, we need to have the instance method
          // return undefined instead of the jQuery instance
          if (!this.length && options === "instance") {
            returnValue = undefined;
          } else {
            this.each(function () {
              var methodValue;
              var type = $(this).attr("type");
              var name = type !== "checkbox" && type !== "radio" ? "button" : "checkboxradio";
              var instance = $.data(this, "ui-" + name);

              if (options === "instance") {
                returnValue = instance;
                return false;
              }

              if (!instance) {
                return $.error("cannot call methods on button" + " prior to initialization; " + "attempted to call method '" + options + "'");
              }

              if (typeof instance[options] !== "function" || options.charAt(0) === "_") {
                return $.error("no such method '" + options + "' for button" + " widget instance");
              }

              methodValue = instance[options].apply(instance, args);

              if (methodValue !== instance && methodValue !== undefined) {
                returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
                return false;
              }
            });
          }
        } else {
          // Allow multiple hashes to be passed on init
          if (args.length) {
            options = $.widget.extend.apply(null, [options].concat(args));
          }

          this.each(function () {
            var type = $(this).attr("type");
            var name = type !== "checkbox" && type !== "radio" ? "button" : "checkboxradio";
            var instance = $.data(this, "ui-" + name);

            if (instance) {
              instance.option(options || {});

              if (instance._init) {
                instance._init();
              }
            } else {
              if (name === "button") {
                orig.call($(this), options);
                return;
              }

              $(this).checkboxradio($.extend({
                icon: false
              }, options));
            }
          });
        }

        return returnValue;
      };
    }($.fn.button);

    $.fn.buttonset = function () {
      if (!$.ui.controlgroup) {
        $.error("Controlgroup widget missing");
      }

      if (arguments[0] === "option" && arguments[1] === "items" && arguments[2]) {
        return this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]);
      }

      if (arguments[0] === "option" && arguments[1] === "items") {
        return this.controlgroup.apply(this, [arguments[0], "items.button"]);
      }

      if (_typeof(arguments[0]) === "object" && arguments[0].items) {
        arguments[0].items = {
          button: arguments[0].items
        };
      }

      return this.controlgroup.apply(this, arguments);
    };
  }

  return $.ui.button;
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/widgets/checkboxradio.js":
/*!************************************************************!*\
  !*** ./node_modules/jquery-ui/ui/widgets/checkboxradio.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Checkboxradio 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Checkboxradio
//>>group: Widgets
//>>description: Enhances a form with multiple themeable checkboxes or radio buttons.
//>>docs: http://api.jqueryui.com/checkboxradio/
//>>demos: http://jqueryui.com/checkboxradio/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/button.css
//>>css.structure: ../../themes/base/checkboxradio.css
//>>css.theme: ../../themes/base/theme.css
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ../form-reset-mixin */ "./node_modules/jquery-ui/ui/form-reset-mixin.js"), __webpack_require__(/*! ../labels */ "./node_modules/jquery-ui/ui/labels.js"), __webpack_require__(/*! ../widget */ "./node_modules/jquery-ui/ui/widget.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  $.widget("ui.checkboxradio", [$.ui.formResetMixin, {
    version: "1.13.2",
    options: {
      disabled: null,
      label: null,
      icon: true,
      classes: {
        "ui-checkboxradio-label": "ui-corner-all",
        "ui-checkboxradio-icon": "ui-corner-all"
      }
    },
    _getCreateOptions: function _getCreateOptions() {
      var disabled, labels, labelContents;
      var options = this._super() || {}; // We read the type here, because it makes more sense to throw a element type error first,
      // rather then the error for lack of a label. Often if its the wrong type, it
      // won't have a label (e.g. calling on a div, btn, etc)

      this._readType();

      labels = this.element.labels(); // If there are multiple labels, use the last one

      this.label = $(labels[labels.length - 1]);

      if (!this.label.length) {
        $.error("No label found for checkboxradio widget");
      }

      this.originalLabel = ""; // We need to get the label text but this may also need to make sure it does not contain the
      // input itself.
      // The label contents could be text, html, or a mix. We wrap all elements
      // and read the wrapper's `innerHTML` to get a string representation of
      // the label, without the input as part of it.

      labelContents = this.label.contents().not(this.element[0]);

      if (labelContents.length) {
        this.originalLabel += labelContents.clone().wrapAll("<div></div>").parent().html();
      } // Set the label option if we found label text


      if (this.originalLabel) {
        options.label = this.originalLabel;
      }

      disabled = this.element[0].disabled;

      if (disabled != null) {
        options.disabled = disabled;
      }

      return options;
    },
    _create: function _create() {
      var checked = this.element[0].checked;

      this._bindFormResetHandler();

      if (this.options.disabled == null) {
        this.options.disabled = this.element[0].disabled;
      }

      this._setOption("disabled", this.options.disabled);

      this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible");

      this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget");

      if (this.type === "radio") {
        this._addClass(this.label, "ui-checkboxradio-radio-label");
      }

      if (this.options.label && this.options.label !== this.originalLabel) {
        this._updateLabel();
      } else if (this.originalLabel) {
        this.options.label = this.originalLabel;
      }

      this._enhance();

      if (checked) {
        this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active");
      }

      this._on({
        change: "_toggleClasses",
        focus: function focus() {
          this._addClass(this.label, null, "ui-state-focus ui-visual-focus");
        },
        blur: function blur() {
          this._removeClass(this.label, null, "ui-state-focus ui-visual-focus");
        }
      });
    },
    _readType: function _readType() {
      var nodeName = this.element[0].nodeName.toLowerCase();
      this.type = this.element[0].type;

      if (nodeName !== "input" || !/radio|checkbox/.test(this.type)) {
        $.error("Can't create checkboxradio on element.nodeName=" + nodeName + " and element.type=" + this.type);
      }
    },
    // Support jQuery Mobile enhanced option
    _enhance: function _enhance() {
      this._updateIcon(this.element[0].checked);
    },
    widget: function widget() {
      return this.label;
    },
    _getRadioGroup: function _getRadioGroup() {
      var group;
      var name = this.element[0].name;
      var nameSelector = "input[name='" + $.escapeSelector(name) + "']";

      if (!name) {
        return $([]);
      }

      if (this.form.length) {
        group = $(this.form[0].elements).filter(nameSelector);
      } else {
        // Not inside a form, check all inputs that also are not inside a form
        group = $(nameSelector).filter(function () {
          return $(this)._form().length === 0;
        });
      }

      return group.not(this.element);
    },
    _toggleClasses: function _toggleClasses() {
      var checked = this.element[0].checked;

      this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", checked);

      if (this.options.icon && this.type === "checkbox") {
        this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", checked)._toggleClass(this.icon, null, "ui-icon-blank", !checked);
      }

      if (this.type === "radio") {
        this._getRadioGroup().each(function () {
          var instance = $(this).checkboxradio("instance");

          if (instance) {
            instance._removeClass(instance.label, "ui-checkboxradio-checked", "ui-state-active");
          }
        });
      }
    },
    _destroy: function _destroy() {
      this._unbindFormResetHandler();

      if (this.icon) {
        this.icon.remove();
        this.iconSpace.remove();
      }
    },
    _setOption: function _setOption(key, value) {
      // We don't allow the value to be set to nothing
      if (key === "label" && !value) {
        return;
      }

      this._super(key, value);

      if (key === "disabled") {
        this._toggleClass(this.label, null, "ui-state-disabled", value);

        this.element[0].disabled = value; // Don't refresh when setting disabled

        return;
      }

      this.refresh();
    },
    _updateIcon: function _updateIcon(checked) {
      var toAdd = "ui-icon ui-icon-background ";

      if (this.options.icon) {
        if (!this.icon) {
          this.icon = $("<span>");
          this.iconSpace = $("<span> </span>");

          this._addClass(this.iconSpace, "ui-checkboxradio-icon-space");
        }

        if (this.type === "checkbox") {
          toAdd += checked ? "ui-icon-check ui-state-checked" : "ui-icon-blank";

          this._removeClass(this.icon, null, checked ? "ui-icon-blank" : "ui-icon-check");
        } else {
          toAdd += "ui-icon-blank";
        }

        this._addClass(this.icon, "ui-checkboxradio-icon", toAdd);

        if (!checked) {
          this._removeClass(this.icon, null, "ui-icon-check ui-state-checked");
        }

        this.icon.prependTo(this.label).after(this.iconSpace);
      } else if (this.icon !== undefined) {
        this.icon.remove();
        this.iconSpace.remove();
        delete this.icon;
      }
    },
    _updateLabel: function _updateLabel() {
      // Remove the contents of the label ( minus the icon, icon space, and input )
      var contents = this.label.contents().not(this.element[0]);

      if (this.icon) {
        contents = contents.not(this.icon[0]);
      }

      if (this.iconSpace) {
        contents = contents.not(this.iconSpace[0]);
      }

      contents.remove();
      this.label.append(this.options.label);
    },
    refresh: function refresh() {
      var checked = this.element[0].checked,
          isDisabled = this.element[0].disabled;

      this._updateIcon(checked);

      this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", checked);

      if (this.options.label !== null) {
        this._updateLabel();
      }

      if (isDisabled !== this.options.disabled) {
        this._setOptions({
          "disabled": isDisabled
        });
      }
    }
  }]);
  return $.ui.checkboxradio;
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/widgets/controlgroup.js":
/*!***********************************************************!*\
  !*** ./node_modules/jquery-ui/ui/widgets/controlgroup.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Controlgroup 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Controlgroup
//>>group: Widgets
//>>description: Visually groups form control widgets
//>>docs: http://api.jqueryui.com/controlgroup/
//>>demos: http://jqueryui.com/controlgroup/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/controlgroup.css
//>>css.theme: ../../themes/base/theme.css
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ../widget */ "./node_modules/jquery-ui/ui/widget.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  var controlgroupCornerRegex = /ui-corner-([a-z]){2,6}/g;
  return $.widget("ui.controlgroup", {
    version: "1.13.2",
    defaultElement: "<div>",
    options: {
      direction: "horizontal",
      disabled: null,
      onlyVisible: true,
      items: {
        "button": "input[type=button], input[type=submit], input[type=reset], button, a",
        "controlgroupLabel": ".ui-controlgroup-label",
        "checkboxradio": "input[type='checkbox'], input[type='radio']",
        "selectmenu": "select",
        "spinner": ".ui-spinner-input"
      }
    },
    _create: function _create() {
      this._enhance();
    },
    // To support the enhanced option in jQuery Mobile, we isolate DOM manipulation
    _enhance: function _enhance() {
      this.element.attr("role", "toolbar");
      this.refresh();
    },
    _destroy: function _destroy() {
      this._callChildMethod("destroy");

      this.childWidgets.removeData("ui-controlgroup-data");
      this.element.removeAttr("role");

      if (this.options.items.controlgroupLabel) {
        this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap();
      }
    },
    _initWidgets: function _initWidgets() {
      var that = this,
          childWidgets = []; // First we iterate over each of the items options

      $.each(this.options.items, function (widget, selector) {
        var labels;
        var options = {}; // Make sure the widget has a selector set

        if (!selector) {
          return;
        }

        if (widget === "controlgroupLabel") {
          labels = that.element.find(selector);
          labels.each(function () {
            var element = $(this);

            if (element.children(".ui-controlgroup-label-contents").length) {
              return;
            }

            element.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>");
          });

          that._addClass(labels, null, "ui-widget ui-widget-content ui-state-default");

          childWidgets = childWidgets.concat(labels.get());
          return;
        } // Make sure the widget actually exists


        if (!$.fn[widget]) {
          return;
        } // We assume everything is in the middle to start because we can't determine
        // first / last elements until all enhancments are done.


        if (that["_" + widget + "Options"]) {
          options = that["_" + widget + "Options"]("middle");
        } else {
          options = {
            classes: {}
          };
        } // Find instances of this widget inside controlgroup and init them


        that.element.find(selector).each(function () {
          var element = $(this);
          var instance = element[widget]("instance"); // We need to clone the default options for this type of widget to avoid
          // polluting the variable options which has a wider scope than a single widget.

          var instanceOptions = $.widget.extend({}, options); // If the button is the child of a spinner ignore it
          // TODO: Find a more generic solution

          if (widget === "button" && element.parent(".ui-spinner").length) {
            return;
          } // Create the widget if it doesn't exist


          if (!instance) {
            instance = element[widget]()[widget]("instance");
          }

          if (instance) {
            instanceOptions.classes = that._resolveClassesValues(instanceOptions.classes, instance);
          }

          element[widget](instanceOptions); // Store an instance of the controlgroup to be able to reference
          // from the outermost element for changing options and refresh

          var widgetElement = element[widget]("widget");
          $.data(widgetElement[0], "ui-controlgroup-data", instance ? instance : element[widget]("instance"));
          childWidgets.push(widgetElement[0]);
        });
      });
      this.childWidgets = $($.uniqueSort(childWidgets));

      this._addClass(this.childWidgets, "ui-controlgroup-item");
    },
    _callChildMethod: function _callChildMethod(method) {
      this.childWidgets.each(function () {
        var element = $(this),
            data = element.data("ui-controlgroup-data");

        if (data && data[method]) {
          data[method]();
        }
      });
    },
    _updateCornerClass: function _updateCornerClass(element, position) {
      var remove = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all";

      var add = this._buildSimpleOptions(position, "label").classes.label;

      this._removeClass(element, null, remove);

      this._addClass(element, null, add);
    },
    _buildSimpleOptions: function _buildSimpleOptions(position, key) {
      var direction = this.options.direction === "vertical";
      var result = {
        classes: {}
      };
      result.classes[key] = {
        "middle": "",
        "first": "ui-corner-" + (direction ? "top" : "left"),
        "last": "ui-corner-" + (direction ? "bottom" : "right"),
        "only": "ui-corner-all"
      }[position];
      return result;
    },
    _spinnerOptions: function _spinnerOptions(position) {
      var options = this._buildSimpleOptions(position, "ui-spinner");

      options.classes["ui-spinner-up"] = "";
      options.classes["ui-spinner-down"] = "";
      return options;
    },
    _buttonOptions: function _buttonOptions(position) {
      return this._buildSimpleOptions(position, "ui-button");
    },
    _checkboxradioOptions: function _checkboxradioOptions(position) {
      return this._buildSimpleOptions(position, "ui-checkboxradio-label");
    },
    _selectmenuOptions: function _selectmenuOptions(position) {
      var direction = this.options.direction === "vertical";
      return {
        width: direction ? "auto" : false,
        classes: {
          middle: {
            "ui-selectmenu-button-open": "",
            "ui-selectmenu-button-closed": ""
          },
          first: {
            "ui-selectmenu-button-open": "ui-corner-" + (direction ? "top" : "tl"),
            "ui-selectmenu-button-closed": "ui-corner-" + (direction ? "top" : "left")
          },
          last: {
            "ui-selectmenu-button-open": direction ? "" : "ui-corner-tr",
            "ui-selectmenu-button-closed": "ui-corner-" + (direction ? "bottom" : "right")
          },
          only: {
            "ui-selectmenu-button-open": "ui-corner-top",
            "ui-selectmenu-button-closed": "ui-corner-all"
          }
        }[position]
      };
    },
    _resolveClassesValues: function _resolveClassesValues(classes, instance) {
      var result = {};
      $.each(classes, function (key) {
        var current = instance.options.classes[key] || "";
        current = String.prototype.trim.call(current.replace(controlgroupCornerRegex, ""));
        result[key] = (current + " " + classes[key]).replace(/\s+/g, " ");
      });
      return result;
    },
    _setOption: function _setOption(key, value) {
      if (key === "direction") {
        this._removeClass("ui-controlgroup-" + this.options.direction);
      }

      this._super(key, value);

      if (key === "disabled") {
        this._callChildMethod(value ? "disable" : "enable");

        return;
      }

      this.refresh();
    },
    refresh: function refresh() {
      var children,
          that = this;

      this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction);

      if (this.options.direction === "horizontal") {
        this._addClass(null, "ui-helper-clearfix");
      }

      this._initWidgets();

      children = this.childWidgets; // We filter here because we need to track all childWidgets not just the visible ones

      if (this.options.onlyVisible) {
        children = children.filter(":visible");
      }

      if (children.length) {
        // We do this last because we need to make sure all enhancment is done
        // before determining first and last
        $.each(["first", "last"], function (index, value) {
          var instance = children[value]().data("ui-controlgroup-data");

          if (instance && that["_" + instance.widgetName + "Options"]) {
            var options = that["_" + instance.widgetName + "Options"](children.length === 1 ? "only" : value);
            options.classes = that._resolveClassesValues(options.classes, instance);
            instance.element[instance.widgetName](options);
          } else {
            that._updateCornerClass(children[value](), value);
          }
        }); // Finally call the refresh method on each of the child widgets.

        this._callChildMethod("refresh");
      }
    }
  });
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/widgets/dialog.js":
/*!*****************************************************!*\
  !*** ./node_modules/jquery-ui/ui/widgets/dialog.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Dialog 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Dialog
//>>group: Widgets
//>>description: Displays customizable dialog windows.
//>>docs: http://api.jqueryui.com/dialog/
//>>demos: http://jqueryui.com/dialog/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/dialog.css
//>>css.theme: ../../themes/base/theme.css
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./button */ "./node_modules/jquery-ui/ui/widgets/button.js"), __webpack_require__(/*! ./draggable */ "./node_modules/jquery-ui/ui/widgets/draggable.js"), __webpack_require__(/*! ./mouse */ "./node_modules/jquery-ui/ui/widgets/mouse.js"), __webpack_require__(/*! ./resizable */ "./node_modules/jquery-ui/ui/widgets/resizable.js"), __webpack_require__(/*! ../focusable */ "./node_modules/jquery-ui/ui/focusable.js"), __webpack_require__(/*! ../keycode */ "./node_modules/jquery-ui/ui/keycode.js"), __webpack_require__(/*! ../position */ "./node_modules/jquery-ui/ui/position.js"), __webpack_require__(/*! ../safe-active-element */ "./node_modules/jquery-ui/ui/safe-active-element.js"), __webpack_require__(/*! ../safe-blur */ "./node_modules/jquery-ui/ui/safe-blur.js"), __webpack_require__(/*! ../tabbable */ "./node_modules/jquery-ui/ui/tabbable.js"), __webpack_require__(/*! ../unique-id */ "./node_modules/jquery-ui/ui/unique-id.js"), __webpack_require__(/*! ../version */ "./node_modules/jquery-ui/ui/version.js"), __webpack_require__(/*! ../widget */ "./node_modules/jquery-ui/ui/widget.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  $.widget("ui.dialog", {
    version: "1.13.2",
    options: {
      appendTo: "body",
      autoOpen: true,
      buttons: [],
      classes: {
        "ui-dialog": "ui-corner-all",
        "ui-dialog-titlebar": "ui-corner-all"
      },
      closeOnEscape: true,
      closeText: "Close",
      draggable: true,
      hide: null,
      height: "auto",
      maxHeight: null,
      maxWidth: null,
      minHeight: 150,
      minWidth: 150,
      modal: false,
      position: {
        my: "center",
        at: "center",
        of: window,
        collision: "fit",
        // Ensure the titlebar is always visible
        using: function using(pos) {
          var topOffset = $(this).css(pos).offset().top;

          if (topOffset < 0) {
            $(this).css("top", pos.top - topOffset);
          }
        }
      },
      resizable: true,
      show: null,
      title: null,
      width: 300,
      // Callbacks
      beforeClose: null,
      close: null,
      drag: null,
      dragStart: null,
      dragStop: null,
      focus: null,
      open: null,
      resize: null,
      resizeStart: null,
      resizeStop: null
    },
    sizeRelatedOptions: {
      buttons: true,
      height: true,
      maxHeight: true,
      maxWidth: true,
      minHeight: true,
      minWidth: true,
      width: true
    },
    resizableRelatedOptions: {
      maxHeight: true,
      maxWidth: true,
      minHeight: true,
      minWidth: true
    },
    _create: function _create() {
      this.originalCss = {
        display: this.element[0].style.display,
        width: this.element[0].style.width,
        minHeight: this.element[0].style.minHeight,
        maxHeight: this.element[0].style.maxHeight,
        height: this.element[0].style.height
      };
      this.originalPosition = {
        parent: this.element.parent(),
        index: this.element.parent().children().index(this.element)
      };
      this.originalTitle = this.element.attr("title");

      if (this.options.title == null && this.originalTitle != null) {
        this.options.title = this.originalTitle;
      } // Dialogs can't be disabled


      if (this.options.disabled) {
        this.options.disabled = false;
      }

      this._createWrapper();

      this.element.show().removeAttr("title").appendTo(this.uiDialog);

      this._addClass("ui-dialog-content", "ui-widget-content");

      this._createTitlebar();

      this._createButtonPane();

      if (this.options.draggable && $.fn.draggable) {
        this._makeDraggable();
      }

      if (this.options.resizable && $.fn.resizable) {
        this._makeResizable();
      }

      this._isOpen = false;

      this._trackFocus();
    },
    _init: function _init() {
      if (this.options.autoOpen) {
        this.open();
      }
    },
    _appendTo: function _appendTo() {
      var element = this.options.appendTo;

      if (element && (element.jquery || element.nodeType)) {
        return $(element);
      }

      return this.document.find(element || "body").eq(0);
    },
    _destroy: function _destroy() {
      var next,
          originalPosition = this.originalPosition;

      this._untrackInstance();

      this._destroyOverlay();

      this.element.removeUniqueId().css(this.originalCss) // Without detaching first, the following becomes really slow
      .detach();
      this.uiDialog.remove();

      if (this.originalTitle) {
        this.element.attr("title", this.originalTitle);
      }

      next = originalPosition.parent.children().eq(originalPosition.index); // Don't try to place the dialog next to itself (#8613)

      if (next.length && next[0] !== this.element[0]) {
        next.before(this.element);
      } else {
        originalPosition.parent.append(this.element);
      }
    },
    widget: function widget() {
      return this.uiDialog;
    },
    disable: $.noop,
    enable: $.noop,
    close: function close(event) {
      var that = this;

      if (!this._isOpen || this._trigger("beforeClose", event) === false) {
        return;
      }

      this._isOpen = false;
      this._focusedElement = null;

      this._destroyOverlay();

      this._untrackInstance();

      if (!this.opener.filter(":focusable").trigger("focus").length) {
        // Hiding a focused element doesn't trigger blur in WebKit
        // so in case we have nothing to focus on, explicitly blur the active element
        // https://bugs.webkit.org/show_bug.cgi?id=47182
        $.ui.safeBlur($.ui.safeActiveElement(this.document[0]));
      }

      this._hide(this.uiDialog, this.options.hide, function () {
        that._trigger("close", event);
      });
    },
    isOpen: function isOpen() {
      return this._isOpen;
    },
    moveToTop: function moveToTop() {
      this._moveToTop();
    },
    _moveToTop: function _moveToTop(event, silent) {
      var moved = false,
          zIndices = this.uiDialog.siblings(".ui-front:visible").map(function () {
        return +$(this).css("z-index");
      }).get(),
          zIndexMax = Math.max.apply(null, zIndices);

      if (zIndexMax >= +this.uiDialog.css("z-index")) {
        this.uiDialog.css("z-index", zIndexMax + 1);
        moved = true;
      }

      if (moved && !silent) {
        this._trigger("focus", event);
      }

      return moved;
    },
    open: function open() {
      var that = this;

      if (this._isOpen) {
        if (this._moveToTop()) {
          this._focusTabbable();
        }

        return;
      }

      this._isOpen = true;
      this.opener = $($.ui.safeActiveElement(this.document[0]));

      this._size();

      this._position();

      this._createOverlay();

      this._moveToTop(null, true); // Ensure the overlay is moved to the top with the dialog, but only when
      // opening. The overlay shouldn't move after the dialog is open so that
      // modeless dialogs opened after the modal dialog stack properly.


      if (this.overlay) {
        this.overlay.css("z-index", this.uiDialog.css("z-index") - 1);
      }

      this._show(this.uiDialog, this.options.show, function () {
        that._focusTabbable();

        that._trigger("focus");
      }); // Track the dialog immediately upon opening in case a focus event
      // somehow occurs outside of the dialog before an element inside the
      // dialog is focused (#10152)


      this._makeFocusTarget();

      this._trigger("open");
    },
    _focusTabbable: function _focusTabbable() {
      // Set focus to the first match:
      // 1. An element that was focused previously
      // 2. First element inside the dialog matching [autofocus]
      // 3. Tabbable element inside the content element
      // 4. Tabbable element inside the buttonpane
      // 5. The close button
      // 6. The dialog itself
      var hasFocus = this._focusedElement;

      if (!hasFocus) {
        hasFocus = this.element.find("[autofocus]");
      }

      if (!hasFocus.length) {
        hasFocus = this.element.find(":tabbable");
      }

      if (!hasFocus.length) {
        hasFocus = this.uiDialogButtonPane.find(":tabbable");
      }

      if (!hasFocus.length) {
        hasFocus = this.uiDialogTitlebarClose.filter(":tabbable");
      }

      if (!hasFocus.length) {
        hasFocus = this.uiDialog;
      }

      hasFocus.eq(0).trigger("focus");
    },
    _restoreTabbableFocus: function _restoreTabbableFocus() {
      var activeElement = $.ui.safeActiveElement(this.document[0]),
          isActive = this.uiDialog[0] === activeElement || $.contains(this.uiDialog[0], activeElement);

      if (!isActive) {
        this._focusTabbable();
      }
    },
    _keepFocus: function _keepFocus(event) {
      event.preventDefault();

      this._restoreTabbableFocus(); // support: IE
      // IE <= 8 doesn't prevent moving focus even with event.preventDefault()
      // so we check again later


      this._delay(this._restoreTabbableFocus);
    },
    _createWrapper: function _createWrapper() {
      this.uiDialog = $("<div>").hide().attr({
        // Setting tabIndex makes the div focusable
        tabIndex: -1,
        role: "dialog"
      }).appendTo(this._appendTo());

      this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front");

      this._on(this.uiDialog, {
        keydown: function keydown(event) {
          if (this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE) {
            event.preventDefault();
            this.close(event);
            return;
          } // Prevent tabbing out of dialogs


          if (event.keyCode !== $.ui.keyCode.TAB || event.isDefaultPrevented()) {
            return;
          }

          var tabbables = this.uiDialog.find(":tabbable"),
              first = tabbables.first(),
              last = tabbables.last();

          if ((event.target === last[0] || event.target === this.uiDialog[0]) && !event.shiftKey) {
            this._delay(function () {
              first.trigger("focus");
            });

            event.preventDefault();
          } else if ((event.target === first[0] || event.target === this.uiDialog[0]) && event.shiftKey) {
            this._delay(function () {
              last.trigger("focus");
            });

            event.preventDefault();
          }
        },
        mousedown: function mousedown(event) {
          if (this._moveToTop(event)) {
            this._focusTabbable();
          }
        }
      }); // We assume that any existing aria-describedby attribute means
      // that the dialog content is marked up properly
      // otherwise we brute force the content as the description


      if (!this.element.find("[aria-describedby]").length) {
        this.uiDialog.attr({
          "aria-describedby": this.element.uniqueId().attr("id")
        });
      }
    },
    _createTitlebar: function _createTitlebar() {
      var uiDialogTitle;
      this.uiDialogTitlebar = $("<div>");

      this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix");

      this._on(this.uiDialogTitlebar, {
        mousedown: function mousedown(event) {
          // Don't prevent click on close button (#8838)
          // Focusing a dialog that is partially scrolled out of view
          // causes the browser to scroll it into view, preventing the click event
          if (!$(event.target).closest(".ui-dialog-titlebar-close")) {
            // Dialog isn't getting focus when dragging (#8063)
            this.uiDialog.trigger("focus");
          }
        }
      }); // Support: IE
      // Use type="button" to prevent enter keypresses in textboxes from closing the
      // dialog in IE (#9312)


      this.uiDialogTitlebarClose = $("<button type='button'></button>").button({
        label: $("<a>").text(this.options.closeText).html(),
        icon: "ui-icon-closethick",
        showLabel: false
      }).appendTo(this.uiDialogTitlebar);

      this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close");

      this._on(this.uiDialogTitlebarClose, {
        click: function click(event) {
          event.preventDefault();
          this.close(event);
        }
      });

      uiDialogTitle = $("<span>").uniqueId().prependTo(this.uiDialogTitlebar);

      this._addClass(uiDialogTitle, "ui-dialog-title");

      this._title(uiDialogTitle);

      this.uiDialogTitlebar.prependTo(this.uiDialog);
      this.uiDialog.attr({
        "aria-labelledby": uiDialogTitle.attr("id")
      });
    },
    _title: function _title(title) {
      if (this.options.title) {
        title.text(this.options.title);
      } else {
        title.html("&#160;");
      }
    },
    _createButtonPane: function _createButtonPane() {
      this.uiDialogButtonPane = $("<div>");

      this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix");

      this.uiButtonSet = $("<div>").appendTo(this.uiDialogButtonPane);

      this._addClass(this.uiButtonSet, "ui-dialog-buttonset");

      this._createButtons();
    },
    _createButtons: function _createButtons() {
      var that = this,
          buttons = this.options.buttons; // If we already have a button pane, remove it

      this.uiDialogButtonPane.remove();
      this.uiButtonSet.empty();

      if ($.isEmptyObject(buttons) || Array.isArray(buttons) && !buttons.length) {
        this._removeClass(this.uiDialog, "ui-dialog-buttons");

        return;
      }

      $.each(buttons, function (name, props) {
        var click, buttonOptions;
        props = typeof props === "function" ? {
          click: props,
          text: name
        } : props; // Default to a non-submitting button

        props = $.extend({
          type: "button"
        }, props); // Change the context for the click callback to be the main element

        click = props.click;
        buttonOptions = {
          icon: props.icon,
          iconPosition: props.iconPosition,
          showLabel: props.showLabel,
          // Deprecated options
          icons: props.icons,
          text: props.text
        };
        delete props.click;
        delete props.icon;
        delete props.iconPosition;
        delete props.showLabel; // Deprecated options

        delete props.icons;

        if (typeof props.text === "boolean") {
          delete props.text;
        }

        $("<button></button>", props).button(buttonOptions).appendTo(that.uiButtonSet).on("click", function () {
          click.apply(that.element[0], arguments);
        });
      });

      this._addClass(this.uiDialog, "ui-dialog-buttons");

      this.uiDialogButtonPane.appendTo(this.uiDialog);
    },
    _makeDraggable: function _makeDraggable() {
      var that = this,
          options = this.options;

      function filteredUi(ui) {
        return {
          position: ui.position,
          offset: ui.offset
        };
      }

      this.uiDialog.draggable({
        cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
        handle: ".ui-dialog-titlebar",
        containment: "document",
        start: function start(event, ui) {
          that._addClass($(this), "ui-dialog-dragging");

          that._blockFrames();

          that._trigger("dragStart", event, filteredUi(ui));
        },
        drag: function drag(event, ui) {
          that._trigger("drag", event, filteredUi(ui));
        },
        stop: function stop(event, ui) {
          var left = ui.offset.left - that.document.scrollLeft(),
              top = ui.offset.top - that.document.scrollTop();
          options.position = {
            my: "left top",
            at: "left" + (left >= 0 ? "+" : "") + left + " " + "top" + (top >= 0 ? "+" : "") + top,
            of: that.window
          };

          that._removeClass($(this), "ui-dialog-dragging");

          that._unblockFrames();

          that._trigger("dragStop", event, filteredUi(ui));
        }
      });
    },
    _makeResizable: function _makeResizable() {
      var that = this,
          options = this.options,
          handles = options.resizable,
          // .ui-resizable has position: relative defined in the stylesheet
      // but dialogs have to use absolute or fixed positioning
      position = this.uiDialog.css("position"),
          resizeHandles = typeof handles === "string" ? handles : "n,e,s,w,se,sw,ne,nw";

      function filteredUi(ui) {
        return {
          originalPosition: ui.originalPosition,
          originalSize: ui.originalSize,
          position: ui.position,
          size: ui.size
        };
      }

      this.uiDialog.resizable({
        cancel: ".ui-dialog-content",
        containment: "document",
        alsoResize: this.element,
        maxWidth: options.maxWidth,
        maxHeight: options.maxHeight,
        minWidth: options.minWidth,
        minHeight: this._minHeight(),
        handles: resizeHandles,
        start: function start(event, ui) {
          that._addClass($(this), "ui-dialog-resizing");

          that._blockFrames();

          that._trigger("resizeStart", event, filteredUi(ui));
        },
        resize: function resize(event, ui) {
          that._trigger("resize", event, filteredUi(ui));
        },
        stop: function stop(event, ui) {
          var offset = that.uiDialog.offset(),
              left = offset.left - that.document.scrollLeft(),
              top = offset.top - that.document.scrollTop();
          options.height = that.uiDialog.height();
          options.width = that.uiDialog.width();
          options.position = {
            my: "left top",
            at: "left" + (left >= 0 ? "+" : "") + left + " " + "top" + (top >= 0 ? "+" : "") + top,
            of: that.window
          };

          that._removeClass($(this), "ui-dialog-resizing");

          that._unblockFrames();

          that._trigger("resizeStop", event, filteredUi(ui));
        }
      }).css("position", position);
    },
    _trackFocus: function _trackFocus() {
      this._on(this.widget(), {
        focusin: function focusin(event) {
          this._makeFocusTarget();

          this._focusedElement = $(event.target);
        }
      });
    },
    _makeFocusTarget: function _makeFocusTarget() {
      this._untrackInstance();

      this._trackingInstances().unshift(this);
    },
    _untrackInstance: function _untrackInstance() {
      var instances = this._trackingInstances(),
          exists = $.inArray(this, instances);

      if (exists !== -1) {
        instances.splice(exists, 1);
      }
    },
    _trackingInstances: function _trackingInstances() {
      var instances = this.document.data("ui-dialog-instances");

      if (!instances) {
        instances = [];
        this.document.data("ui-dialog-instances", instances);
      }

      return instances;
    },
    _minHeight: function _minHeight() {
      var options = this.options;
      return options.height === "auto" ? options.minHeight : Math.min(options.minHeight, options.height);
    },
    _position: function _position() {
      // Need to show the dialog to get the actual offset in the position plugin
      var isVisible = this.uiDialog.is(":visible");

      if (!isVisible) {
        this.uiDialog.show();
      }

      this.uiDialog.position(this.options.position);

      if (!isVisible) {
        this.uiDialog.hide();
      }
    },
    _setOptions: function _setOptions(options) {
      var that = this,
          resize = false,
          resizableOptions = {};
      $.each(options, function (key, value) {
        that._setOption(key, value);

        if (key in that.sizeRelatedOptions) {
          resize = true;
        }

        if (key in that.resizableRelatedOptions) {
          resizableOptions[key] = value;
        }
      });

      if (resize) {
        this._size();

        this._position();
      }

      if (this.uiDialog.is(":data(ui-resizable)")) {
        this.uiDialog.resizable("option", resizableOptions);
      }
    },
    _setOption: function _setOption(key, value) {
      var isDraggable,
          isResizable,
          uiDialog = this.uiDialog;

      if (key === "disabled") {
        return;
      }

      this._super(key, value);

      if (key === "appendTo") {
        this.uiDialog.appendTo(this._appendTo());
      }

      if (key === "buttons") {
        this._createButtons();
      }

      if (key === "closeText") {
        this.uiDialogTitlebarClose.button({
          // Ensure that we always pass a string
          label: $("<a>").text("" + this.options.closeText).html()
        });
      }

      if (key === "draggable") {
        isDraggable = uiDialog.is(":data(ui-draggable)");

        if (isDraggable && !value) {
          uiDialog.draggable("destroy");
        }

        if (!isDraggable && value) {
          this._makeDraggable();
        }
      }

      if (key === "position") {
        this._position();
      }

      if (key === "resizable") {
        // currently resizable, becoming non-resizable
        isResizable = uiDialog.is(":data(ui-resizable)");

        if (isResizable && !value) {
          uiDialog.resizable("destroy");
        } // Currently resizable, changing handles


        if (isResizable && typeof value === "string") {
          uiDialog.resizable("option", "handles", value);
        } // Currently non-resizable, becoming resizable


        if (!isResizable && value !== false) {
          this._makeResizable();
        }
      }

      if (key === "title") {
        this._title(this.uiDialogTitlebar.find(".ui-dialog-title"));
      }
    },
    _size: function _size() {
      // If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
      // divs will both have width and height set, so we need to reset them
      var nonContentHeight,
          minContentHeight,
          maxContentHeight,
          options = this.options; // Reset content sizing

      this.element.show().css({
        width: "auto",
        minHeight: 0,
        maxHeight: "none",
        height: 0
      });

      if (options.minWidth > options.width) {
        options.width = options.minWidth;
      } // Reset wrapper sizing
      // determine the height of all the non-content elements


      nonContentHeight = this.uiDialog.css({
        height: "auto",
        width: options.width
      }).outerHeight();
      minContentHeight = Math.max(0, options.minHeight - nonContentHeight);
      maxContentHeight = typeof options.maxHeight === "number" ? Math.max(0, options.maxHeight - nonContentHeight) : "none";

      if (options.height === "auto") {
        this.element.css({
          minHeight: minContentHeight,
          maxHeight: maxContentHeight,
          height: "auto"
        });
      } else {
        this.element.height(Math.max(0, options.height - nonContentHeight));
      }

      if (this.uiDialog.is(":data(ui-resizable)")) {
        this.uiDialog.resizable("option", "minHeight", this._minHeight());
      }
    },
    _blockFrames: function _blockFrames() {
      this.iframeBlocks = this.document.find("iframe").map(function () {
        var iframe = $(this);
        return $("<div>").css({
          position: "absolute",
          width: iframe.outerWidth(),
          height: iframe.outerHeight()
        }).appendTo(iframe.parent()).offset(iframe.offset())[0];
      });
    },
    _unblockFrames: function _unblockFrames() {
      if (this.iframeBlocks) {
        this.iframeBlocks.remove();
        delete this.iframeBlocks;
      }
    },
    _allowInteraction: function _allowInteraction(event) {
      if ($(event.target).closest(".ui-dialog").length) {
        return true;
      } // TODO: Remove hack when datepicker implements
      // the .ui-front logic (#8989)


      return !!$(event.target).closest(".ui-datepicker").length;
    },
    _createOverlay: function _createOverlay() {
      if (!this.options.modal) {
        return;
      }

      var jqMinor = $.fn.jquery.substring(0, 4); // We use a delay in case the overlay is created from an
      // event that we're going to be cancelling (#2804)

      var isOpening = true;

      this._delay(function () {
        isOpening = false;
      });

      if (!this.document.data("ui-dialog-overlays")) {
        // Prevent use of anchors and inputs
        // This doesn't use `_on()` because it is a shared event handler
        // across all open modal dialogs.
        this.document.on("focusin.ui-dialog", function (event) {
          if (isOpening) {
            return;
          }

          var instance = this._trackingInstances()[0];

          if (!instance._allowInteraction(event)) {
            event.preventDefault();

            instance._focusTabbable(); // Support: jQuery >=3.4 <3.6 only
            // Focus re-triggering in jQuery 3.4/3.5 makes the original element
            // have its focus event propagated last, breaking the re-targeting.
            // Trigger focus in a delay in addition if needed to avoid the issue
            // See https://github.com/jquery/jquery/issues/4382


            if (jqMinor === "3.4." || jqMinor === "3.5.") {
              instance._delay(instance._restoreTabbableFocus);
            }
          }
        }.bind(this));
      }

      this.overlay = $("<div>").appendTo(this._appendTo());

      this._addClass(this.overlay, null, "ui-widget-overlay ui-front");

      this._on(this.overlay, {
        mousedown: "_keepFocus"
      });

      this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1);
    },
    _destroyOverlay: function _destroyOverlay() {
      if (!this.options.modal) {
        return;
      }

      if (this.overlay) {
        var overlays = this.document.data("ui-dialog-overlays") - 1;

        if (!overlays) {
          this.document.off("focusin.ui-dialog");
          this.document.removeData("ui-dialog-overlays");
        } else {
          this.document.data("ui-dialog-overlays", overlays);
        }

        this.overlay.remove();
        this.overlay = null;
      }
    }
  }); // DEPRECATED
  // TODO: switch return back to widget declaration at top of file when this is removed

  if ($.uiBackCompat !== false) {
    // Backcompat for dialogClass option
    $.widget("ui.dialog", $.ui.dialog, {
      options: {
        dialogClass: ""
      },
      _createWrapper: function _createWrapper() {
        this._super();

        this.uiDialog.addClass(this.options.dialogClass);
      },
      _setOption: function _setOption(key, value) {
        if (key === "dialogClass") {
          this.uiDialog.removeClass(this.options.dialogClass).addClass(value);
        }

        this._superApply(arguments);
      }
    });
  }

  return $.ui.dialog;
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/widgets/draggable.js":
/*!********************************************************!*\
  !*** ./node_modules/jquery-ui/ui/widgets/draggable.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Draggable 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Draggable
//>>group: Interactions
//>>description: Enables dragging functionality for any element.
//>>docs: http://api.jqueryui.com/draggable/
//>>demos: http://jqueryui.com/draggable/
//>>css.structure: ../../themes/base/draggable.css
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./mouse */ "./node_modules/jquery-ui/ui/widgets/mouse.js"), __webpack_require__(/*! ../data */ "./node_modules/jquery-ui/ui/data.js"), __webpack_require__(/*! ../plugin */ "./node_modules/jquery-ui/ui/plugin.js"), __webpack_require__(/*! ../safe-active-element */ "./node_modules/jquery-ui/ui/safe-active-element.js"), __webpack_require__(/*! ../safe-blur */ "./node_modules/jquery-ui/ui/safe-blur.js"), __webpack_require__(/*! ../scroll-parent */ "./node_modules/jquery-ui/ui/scroll-parent.js"), __webpack_require__(/*! ../version */ "./node_modules/jquery-ui/ui/version.js"), __webpack_require__(/*! ../widget */ "./node_modules/jquery-ui/ui/widget.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  $.widget("ui.draggable", $.ui.mouse, {
    version: "1.13.2",
    widgetEventPrefix: "drag",
    options: {
      addClasses: true,
      appendTo: "parent",
      axis: false,
      connectToSortable: false,
      containment: false,
      cursor: "auto",
      cursorAt: false,
      grid: false,
      handle: false,
      helper: "original",
      iframeFix: false,
      opacity: false,
      refreshPositions: false,
      revert: false,
      revertDuration: 500,
      scope: "default",
      scroll: true,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: false,
      snapMode: "both",
      snapTolerance: 20,
      stack: false,
      zIndex: false,
      // Callbacks
      drag: null,
      start: null,
      stop: null
    },
    _create: function _create() {
      if (this.options.helper === "original") {
        this._setPositionRelative();
      }

      if (this.options.addClasses) {
        this._addClass("ui-draggable");
      }

      this._setHandleClassName();

      this._mouseInit();
    },
    _setOption: function _setOption(key, value) {
      this._super(key, value);

      if (key === "handle") {
        this._removeHandleClassName();

        this._setHandleClassName();
      }
    },
    _destroy: function _destroy() {
      if ((this.helper || this.element).is(".ui-draggable-dragging")) {
        this.destroyOnClear = true;
        return;
      }

      this._removeHandleClassName();

      this._mouseDestroy();
    },
    _mouseCapture: function _mouseCapture(event) {
      var o = this.options; // Among others, prevent a drag on a resizable-handle

      if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
        return false;
      } //Quit if we're not on a valid handle


      this.handle = this._getHandle(event);

      if (!this.handle) {
        return false;
      }

      this._blurActiveElement(event);

      this._blockFrames(o.iframeFix === true ? "iframe" : o.iframeFix);

      return true;
    },
    _blockFrames: function _blockFrames(selector) {
      this.iframeBlocks = this.document.find(selector).map(function () {
        var iframe = $(this);
        return $("<div>").css("position", "absolute").appendTo(iframe.parent()).outerWidth(iframe.outerWidth()).outerHeight(iframe.outerHeight()).offset(iframe.offset())[0];
      });
    },
    _unblockFrames: function _unblockFrames() {
      if (this.iframeBlocks) {
        this.iframeBlocks.remove();
        delete this.iframeBlocks;
      }
    },
    _blurActiveElement: function _blurActiveElement(event) {
      var activeElement = $.ui.safeActiveElement(this.document[0]),
          target = $(event.target); // Don't blur if the event occurred on an element that is within
      // the currently focused element
      // See #10527, #12472

      if (target.closest(activeElement).length) {
        return;
      } // Blur any element that currently has focus, see #4261


      $.ui.safeBlur(activeElement);
    },
    _mouseStart: function _mouseStart(event) {
      var o = this.options; //Create and append the visible helper

      this.helper = this._createHelper(event);

      this._addClass(this.helper, "ui-draggable-dragging"); //Cache the helper size


      this._cacheHelperProportions(); //If ddmanager is used for droppables, set the global draggable


      if ($.ui.ddmanager) {
        $.ui.ddmanager.current = this;
      }
      /*
       * - Position generation -
       * This block generates everything position related - it's the core of draggables.
       */
      //Cache the margins of the original element


      this._cacheMargins(); //Store the helper's css position


      this.cssPosition = this.helper.css("position");
      this.scrollParent = this.helper.scrollParent(true);
      this.offsetParent = this.helper.offsetParent();
      this.hasFixedAncestor = this.helper.parents().filter(function () {
        return $(this).css("position") === "fixed";
      }).length > 0; //The element's absolute position on the page minus margins

      this.positionAbs = this.element.offset();

      this._refreshOffsets(event); //Generate the original position


      this.originalPosition = this.position = this._generatePosition(event, false);
      this.originalPageX = event.pageX;
      this.originalPageY = event.pageY; //Adjust the mouse offset relative to the helper if "cursorAt" is supplied

      if (o.cursorAt) {
        this._adjustOffsetFromHelper(o.cursorAt);
      } //Set a containment if given in the options


      this._setContainment(); //Trigger event + callbacks


      if (this._trigger("start", event) === false) {
        this._clear();

        return false;
      } //Recache the helper size


      this._cacheHelperProportions(); //Prepare the droppable offsets


      if ($.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(this, event);
      } // Execute the drag once - this causes the helper not to be visible before getting its
      // correct position


      this._mouseDrag(event, true); // If the ddmanager is used for droppables, inform the manager that dragging has started
      // (see #5003)


      if ($.ui.ddmanager) {
        $.ui.ddmanager.dragStart(this, event);
      }

      return true;
    },
    _refreshOffsets: function _refreshOffsets(event) {
      this.offset = {
        top: this.positionAbs.top - this.margins.top,
        left: this.positionAbs.left - this.margins.left,
        scroll: false,
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      };
      this.offset.click = {
        left: event.pageX - this.offset.left,
        top: event.pageY - this.offset.top
      };
    },
    _mouseDrag: function _mouseDrag(event, noPropagation) {
      // reset any necessary cached properties (see #5009)
      if (this.hasFixedAncestor) {
        this.offset.parent = this._getParentOffset();
      } //Compute the helpers position


      this.position = this._generatePosition(event, true);
      this.positionAbs = this._convertPositionTo("absolute"); //Call plugins and callbacks and use the resulting position if something is returned

      if (!noPropagation) {
        var ui = this._uiHash();

        if (this._trigger("drag", event, ui) === false) {
          this._mouseUp(new $.Event("mouseup", event));

          return false;
        }

        this.position = ui.position;
      }

      this.helper[0].style.left = this.position.left + "px";
      this.helper[0].style.top = this.position.top + "px";

      if ($.ui.ddmanager) {
        $.ui.ddmanager.drag(this, event);
      }

      return false;
    },
    _mouseStop: function _mouseStop(event) {
      //If we are using droppables, inform the manager about the drop
      var that = this,
          dropped = false;

      if ($.ui.ddmanager && !this.options.dropBehaviour) {
        dropped = $.ui.ddmanager.drop(this, event);
      } //if a drop comes from outside (a sortable)


      if (this.dropped) {
        dropped = this.dropped;
        this.dropped = false;
      }

      if (this.options.revert === "invalid" && !dropped || this.options.revert === "valid" && dropped || this.options.revert === true || typeof this.options.revert === "function" && this.options.revert.call(this.element, dropped)) {
        $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
          if (that._trigger("stop", event) !== false) {
            that._clear();
          }
        });
      } else {
        if (this._trigger("stop", event) !== false) {
          this._clear();
        }
      }

      return false;
    },
    _mouseUp: function _mouseUp(event) {
      this._unblockFrames(); // If the ddmanager is used for droppables, inform the manager that dragging has stopped
      // (see #5003)


      if ($.ui.ddmanager) {
        $.ui.ddmanager.dragStop(this, event);
      } // Only need to focus if the event occurred on the draggable itself, see #10527


      if (this.handleElement.is(event.target)) {
        // The interaction is over; whether or not the click resulted in a drag,
        // focus the element
        this.element.trigger("focus");
      }

      return $.ui.mouse.prototype._mouseUp.call(this, event);
    },
    cancel: function cancel() {
      if (this.helper.is(".ui-draggable-dragging")) {
        this._mouseUp(new $.Event("mouseup", {
          target: this.element[0]
        }));
      } else {
        this._clear();
      }

      return this;
    },
    _getHandle: function _getHandle(event) {
      return this.options.handle ? !!$(event.target).closest(this.element.find(this.options.handle)).length : true;
    },
    _setHandleClassName: function _setHandleClassName() {
      this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;

      this._addClass(this.handleElement, "ui-draggable-handle");
    },
    _removeHandleClassName: function _removeHandleClassName() {
      this._removeClass(this.handleElement, "ui-draggable-handle");
    },
    _createHelper: function _createHelper(event) {
      var o = this.options,
          helperIsFunction = typeof o.helper === "function",
          helper = helperIsFunction ? $(o.helper.apply(this.element[0], [event])) : o.helper === "clone" ? this.element.clone().removeAttr("id") : this.element;

      if (!helper.parents("body").length) {
        helper.appendTo(o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo);
      } // Http://bugs.jqueryui.com/ticket/9446
      // a helper function can return the original element
      // which wouldn't have been set to relative in _create


      if (helperIsFunction && helper[0] === this.element[0]) {
        this._setPositionRelative();
      }

      if (helper[0] !== this.element[0] && !/(fixed|absolute)/.test(helper.css("position"))) {
        helper.css("position", "absolute");
      }

      return helper;
    },
    _setPositionRelative: function _setPositionRelative() {
      if (!/^(?:r|a|f)/.test(this.element.css("position"))) {
        this.element[0].style.position = "relative";
      }
    },
    _adjustOffsetFromHelper: function _adjustOffsetFromHelper(obj) {
      if (typeof obj === "string") {
        obj = obj.split(" ");
      }

      if (Array.isArray(obj)) {
        obj = {
          left: +obj[0],
          top: +obj[1] || 0
        };
      }

      if ("left" in obj) {
        this.offset.click.left = obj.left + this.margins.left;
      }

      if ("right" in obj) {
        this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
      }

      if ("top" in obj) {
        this.offset.click.top = obj.top + this.margins.top;
      }

      if ("bottom" in obj) {
        this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
      }
    },
    _isRootNode: function _isRootNode(element) {
      return /(html|body)/i.test(element.tagName) || element === this.document[0];
    },
    _getParentOffset: function _getParentOffset() {
      //Get the offsetParent and cache its position
      var po = this.offsetParent.offset(),
          document = this.document[0]; // This is a special case where we need to modify a offset calculated on start, since the
      // following happened:
      // 1. The position of the helper is absolute, so it's position is calculated based on the
      // next positioned parent
      // 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
      // the document, which means that the scroll is included in the initial calculation of the
      // offset of the parent, and never recalculated upon drag

      if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
        po.left += this.scrollParent.scrollLeft();
        po.top += this.scrollParent.scrollTop();
      }

      if (this._isRootNode(this.offsetParent[0])) {
        po = {
          top: 0,
          left: 0
        };
      }

      return {
        top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      };
    },
    _getRelativeOffset: function _getRelativeOffset() {
      if (this.cssPosition !== "relative") {
        return {
          top: 0,
          left: 0
        };
      }

      var p = this.element.position(),
          scrollIsRootNode = this._isRootNode(this.scrollParent[0]);

      return {
        top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + (!scrollIsRootNode ? this.scrollParent.scrollTop() : 0),
        left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + (!scrollIsRootNode ? this.scrollParent.scrollLeft() : 0)
      };
    },
    _cacheMargins: function _cacheMargins() {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
      };
    },
    _cacheHelperProportions: function _cacheHelperProportions() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function _setContainment() {
      var isUserScrollable,
          c,
          ce,
          o = this.options,
          document = this.document[0];
      this.relativeContainer = null;

      if (!o.containment) {
        this.containment = null;
        return;
      }

      if (o.containment === "window") {
        this.containment = [$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left, $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
        return;
      }

      if (o.containment === "document") {
        this.containment = [0, 0, $(document).width() - this.helperProportions.width - this.margins.left, ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
        return;
      }

      if (o.containment.constructor === Array) {
        this.containment = o.containment;
        return;
      }

      if (o.containment === "parent") {
        o.containment = this.helper[0].parentNode;
      }

      c = $(o.containment);
      ce = c[0];

      if (!ce) {
        return;
      }

      isUserScrollable = /(scroll|auto)/.test(c.css("overflow"));
      this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (isUserScrollable ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (isUserScrollable ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
      this.relativeContainer = c;
    },
    _convertPositionTo: function _convertPositionTo(d, pos) {
      if (!pos) {
        pos = this.position;
      }

      var mod = d === "absolute" ? 1 : -1,
          scrollIsRootNode = this._isRootNode(this.scrollParent[0]);

      return {
        top: // The absolute mouse position
        pos.top + // Only for relative positioned nodes: Relative offset from element to offset parent
        this.offset.relative.top * mod + // The offsetParent's offset without borders (offset + border)
        this.offset.parent.top * mod - (this.cssPosition === "fixed" ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top) * mod,
        left: // The absolute mouse position
        pos.left + // Only for relative positioned nodes: Relative offset from element to offset parent
        this.offset.relative.left * mod + // The offsetParent's offset without borders (offset + border)
        this.offset.parent.left * mod - (this.cssPosition === "fixed" ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left) * mod
      };
    },
    _generatePosition: function _generatePosition(event, constrainPosition) {
      var containment,
          co,
          top,
          left,
          o = this.options,
          scrollIsRootNode = this._isRootNode(this.scrollParent[0]),
          pageX = event.pageX,
          pageY = event.pageY; // Cache the scroll


      if (!scrollIsRootNode || !this.offset.scroll) {
        this.offset.scroll = {
          top: this.scrollParent.scrollTop(),
          left: this.scrollParent.scrollLeft()
        };
      }
      /*
       * - Position constraining -
       * Constrain the position to a mix of grid, containment.
       */
      // If we are not dragging yet, we won't check for options


      if (constrainPosition) {
        if (this.containment) {
          if (this.relativeContainer) {
            co = this.relativeContainer.offset();
            containment = [this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top];
          } else {
            containment = this.containment;
          }

          if (event.pageX - this.offset.click.left < containment[0]) {
            pageX = containment[0] + this.offset.click.left;
          }

          if (event.pageY - this.offset.click.top < containment[1]) {
            pageY = containment[1] + this.offset.click.top;
          }

          if (event.pageX - this.offset.click.left > containment[2]) {
            pageX = containment[2] + this.offset.click.left;
          }

          if (event.pageY - this.offset.click.top > containment[3]) {
            pageY = containment[3] + this.offset.click.top;
          }
        }

        if (o.grid) {
          //Check for grid elements set to 0 to prevent divide by 0 error causing invalid
          // argument errors in IE (see ticket #6950)
          top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
          pageY = containment ? top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3] ? top : top - this.offset.click.top >= containment[1] ? top - o.grid[1] : top + o.grid[1] : top;
          left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
          pageX = containment ? left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2] ? left : left - this.offset.click.left >= containment[0] ? left - o.grid[0] : left + o.grid[0] : left;
        }

        if (o.axis === "y") {
          pageX = this.originalPageX;
        }

        if (o.axis === "x") {
          pageY = this.originalPageY;
        }
      }

      return {
        top: // The absolute mouse position
        pageY - // Click offset (relative to the element)
        this.offset.click.top - // Only for relative positioned nodes: Relative offset from element to offset parent
        this.offset.relative.top - // The offsetParent's offset without borders (offset + border)
        this.offset.parent.top + (this.cssPosition === "fixed" ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top),
        left: // The absolute mouse position
        pageX - // Click offset (relative to the element)
        this.offset.click.left - // Only for relative positioned nodes: Relative offset from element to offset parent
        this.offset.relative.left - // The offsetParent's offset without borders (offset + border)
        this.offset.parent.left + (this.cssPosition === "fixed" ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left)
      };
    },
    _clear: function _clear() {
      this._removeClass(this.helper, "ui-draggable-dragging");

      if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
        this.helper.remove();
      }

      this.helper = null;
      this.cancelHelperRemoval = false;

      if (this.destroyOnClear) {
        this.destroy();
      }
    },
    // From now on bulk stuff - mainly helpers
    _trigger: function _trigger(type, event, ui) {
      ui = ui || this._uiHash();
      $.ui.plugin.call(this, type, [event, ui, this], true); // Absolute position and offset (see #6884 ) have to be recalculated after plugins

      if (/^(drag|start|stop)/.test(type)) {
        this.positionAbs = this._convertPositionTo("absolute");
        ui.offset = this.positionAbs;
      }

      return $.Widget.prototype._trigger.call(this, type, event, ui);
    },
    plugins: {},
    _uiHash: function _uiHash() {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      };
    }
  });
  $.ui.plugin.add("draggable", "connectToSortable", {
    start: function start(event, ui, draggable) {
      var uiSortable = $.extend({}, ui, {
        item: draggable.element
      });
      draggable.sortables = [];
      $(draggable.options.connectToSortable).each(function () {
        var sortable = $(this).sortable("instance");

        if (sortable && !sortable.options.disabled) {
          draggable.sortables.push(sortable); // RefreshPositions is called at drag start to refresh the containerCache
          // which is used in drag. This ensures it's initialized and synchronized
          // with any changes that might have happened on the page since initialization.

          sortable.refreshPositions();

          sortable._trigger("activate", event, uiSortable);
        }
      });
    },
    stop: function stop(event, ui, draggable) {
      var uiSortable = $.extend({}, ui, {
        item: draggable.element
      });
      draggable.cancelHelperRemoval = false;
      $.each(draggable.sortables, function () {
        var sortable = this;

        if (sortable.isOver) {
          sortable.isOver = 0; // Allow this sortable to handle removing the helper

          draggable.cancelHelperRemoval = true;
          sortable.cancelHelperRemoval = false; // Use _storedCSS To restore properties in the sortable,
          // as this also handles revert (#9675) since the draggable
          // may have modified them in unexpected ways (#8809)

          sortable._storedCSS = {
            position: sortable.placeholder.css("position"),
            top: sortable.placeholder.css("top"),
            left: sortable.placeholder.css("left")
          };

          sortable._mouseStop(event); // Once drag has ended, the sortable should return to using
          // its original helper, not the shared helper from draggable


          sortable.options.helper = sortable.options._helper;
        } else {
          // Prevent this Sortable from removing the helper.
          // However, don't set the draggable to remove the helper
          // either as another connected Sortable may yet handle the removal.
          sortable.cancelHelperRemoval = true;

          sortable._trigger("deactivate", event, uiSortable);
        }
      });
    },
    drag: function drag(event, ui, draggable) {
      $.each(draggable.sortables, function () {
        var innermostIntersecting = false,
            sortable = this; // Copy over variables that sortable's _intersectsWith uses

        sortable.positionAbs = draggable.positionAbs;
        sortable.helperProportions = draggable.helperProportions;
        sortable.offset.click = draggable.offset.click;

        if (sortable._intersectsWith(sortable.containerCache)) {
          innermostIntersecting = true;
          $.each(draggable.sortables, function () {
            // Copy over variables that sortable's _intersectsWith uses
            this.positionAbs = draggable.positionAbs;
            this.helperProportions = draggable.helperProportions;
            this.offset.click = draggable.offset.click;

            if (this !== sortable && this._intersectsWith(this.containerCache) && $.contains(sortable.element[0], this.element[0])) {
              innermostIntersecting = false;
            }

            return innermostIntersecting;
          });
        }

        if (innermostIntersecting) {
          // If it intersects, we use a little isOver variable and set it once,
          // so that the move-in stuff gets fired only once.
          if (!sortable.isOver) {
            sortable.isOver = 1; // Store draggable's parent in case we need to reappend to it later.

            draggable._parent = ui.helper.parent();
            sortable.currentItem = ui.helper.appendTo(sortable.element).data("ui-sortable-item", true); // Store helper option to later restore it

            sortable.options._helper = sortable.options.helper;

            sortable.options.helper = function () {
              return ui.helper[0];
            }; // Fire the start events of the sortable with our passed browser event,
            // and our own helper (so it doesn't create a new one)


            event.target = sortable.currentItem[0];

            sortable._mouseCapture(event, true);

            sortable._mouseStart(event, true, true); // Because the browser event is way off the new appended portlet,
            // modify necessary variables to reflect the changes


            sortable.offset.click.top = draggable.offset.click.top;
            sortable.offset.click.left = draggable.offset.click.left;
            sortable.offset.parent.left -= draggable.offset.parent.left - sortable.offset.parent.left;
            sortable.offset.parent.top -= draggable.offset.parent.top - sortable.offset.parent.top;

            draggable._trigger("toSortable", event); // Inform draggable that the helper is in a valid drop zone,
            // used solely in the revert option to handle "valid/invalid".


            draggable.dropped = sortable.element; // Need to refreshPositions of all sortables in the case that
            // adding to one sortable changes the location of the other sortables (#9675)

            $.each(draggable.sortables, function () {
              this.refreshPositions();
            }); // Hack so receive/update callbacks work (mostly)

            draggable.currentItem = draggable.element;
            sortable.fromOutside = draggable;
          }

          if (sortable.currentItem) {
            sortable._mouseDrag(event); // Copy the sortable's position because the draggable's can potentially reflect
            // a relative position, while sortable is always absolute, which the dragged
            // element has now become. (#8809)


            ui.position = sortable.position;
          }
        } else {
          // If it doesn't intersect with the sortable, and it intersected before,
          // we fake the drag stop of the sortable, but make sure it doesn't remove
          // the helper by using cancelHelperRemoval.
          if (sortable.isOver) {
            sortable.isOver = 0;
            sortable.cancelHelperRemoval = true; // Calling sortable's mouseStop would trigger a revert,
            // so revert must be temporarily false until after mouseStop is called.

            sortable.options._revert = sortable.options.revert;
            sortable.options.revert = false;

            sortable._trigger("out", event, sortable._uiHash(sortable));

            sortable._mouseStop(event, true); // Restore sortable behaviors that were modfied
            // when the draggable entered the sortable area (#9481)


            sortable.options.revert = sortable.options._revert;
            sortable.options.helper = sortable.options._helper;

            if (sortable.placeholder) {
              sortable.placeholder.remove();
            } // Restore and recalculate the draggable's offset considering the sortable
            // may have modified them in unexpected ways. (#8809, #10669)


            ui.helper.appendTo(draggable._parent);

            draggable._refreshOffsets(event);

            ui.position = draggable._generatePosition(event, true);

            draggable._trigger("fromSortable", event); // Inform draggable that the helper is no longer in a valid drop zone


            draggable.dropped = false; // Need to refreshPositions of all sortables just in case removing
            // from one sortable changes the location of other sortables (#9675)

            $.each(draggable.sortables, function () {
              this.refreshPositions();
            });
          }
        }
      });
    }
  });
  $.ui.plugin.add("draggable", "cursor", {
    start: function start(event, ui, instance) {
      var t = $("body"),
          o = instance.options;

      if (t.css("cursor")) {
        o._cursor = t.css("cursor");
      }

      t.css("cursor", o.cursor);
    },
    stop: function stop(event, ui, instance) {
      var o = instance.options;

      if (o._cursor) {
        $("body").css("cursor", o._cursor);
      }
    }
  });
  $.ui.plugin.add("draggable", "opacity", {
    start: function start(event, ui, instance) {
      var t = $(ui.helper),
          o = instance.options;

      if (t.css("opacity")) {
        o._opacity = t.css("opacity");
      }

      t.css("opacity", o.opacity);
    },
    stop: function stop(event, ui, instance) {
      var o = instance.options;

      if (o._opacity) {
        $(ui.helper).css("opacity", o._opacity);
      }
    }
  });
  $.ui.plugin.add("draggable", "scroll", {
    start: function start(event, ui, i) {
      if (!i.scrollParentNotHidden) {
        i.scrollParentNotHidden = i.helper.scrollParent(false);
      }

      if (i.scrollParentNotHidden[0] !== i.document[0] && i.scrollParentNotHidden[0].tagName !== "HTML") {
        i.overflowOffset = i.scrollParentNotHidden.offset();
      }
    },
    drag: function drag(event, ui, i) {
      var o = i.options,
          scrolled = false,
          scrollParent = i.scrollParentNotHidden[0],
          document = i.document[0];

      if (scrollParent !== document && scrollParent.tagName !== "HTML") {
        if (!o.axis || o.axis !== "x") {
          if (i.overflowOffset.top + scrollParent.offsetHeight - event.pageY < o.scrollSensitivity) {
            scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
          } else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
            scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
          }
        }

        if (!o.axis || o.axis !== "y") {
          if (i.overflowOffset.left + scrollParent.offsetWidth - event.pageX < o.scrollSensitivity) {
            scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
          } else if (event.pageX - i.overflowOffset.left < o.scrollSensitivity) {
            scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
          }
        }
      } else {
        if (!o.axis || o.axis !== "x") {
          if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
            scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
          } else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
            scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
          }
        }

        if (!o.axis || o.axis !== "y") {
          if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
            scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
          } else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
            scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
          }
        }
      }

      if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(i, event);
      }
    }
  });
  $.ui.plugin.add("draggable", "snap", {
    start: function start(event, ui, i) {
      var o = i.options;
      i.snapElements = [];
      $(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function () {
        var $t = $(this),
            $o = $t.offset();

        if (this !== i.element[0]) {
          i.snapElements.push({
            item: this,
            width: $t.outerWidth(),
            height: $t.outerHeight(),
            top: $o.top,
            left: $o.left
          });
        }
      });
    },
    drag: function drag(event, ui, inst) {
      var ts,
          bs,
          ls,
          rs,
          l,
          r,
          t,
          b,
          i,
          first,
          o = inst.options,
          d = o.snapTolerance,
          x1 = ui.offset.left,
          x2 = x1 + inst.helperProportions.width,
          y1 = ui.offset.top,
          y2 = y1 + inst.helperProportions.height;

      for (i = inst.snapElements.length - 1; i >= 0; i--) {
        l = inst.snapElements[i].left - inst.margins.left;
        r = l + inst.snapElements[i].width;
        t = inst.snapElements[i].top - inst.margins.top;
        b = t + inst.snapElements[i].height;

        if (x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item)) {
          if (inst.snapElements[i].snapping) {
            if (inst.options.snap.release) {
              inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
                snapItem: inst.snapElements[i].item
              }));
            }
          }

          inst.snapElements[i].snapping = false;
          continue;
        }

        if (o.snapMode !== "inner") {
          ts = Math.abs(t - y2) <= d;
          bs = Math.abs(b - y1) <= d;
          ls = Math.abs(l - x2) <= d;
          rs = Math.abs(r - x1) <= d;

          if (ts) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: t - inst.helperProportions.height,
              left: 0
            }).top;
          }

          if (bs) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: b,
              left: 0
            }).top;
          }

          if (ls) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: l - inst.helperProportions.width
            }).left;
          }

          if (rs) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: r
            }).left;
          }
        }

        first = ts || bs || ls || rs;

        if (o.snapMode !== "outer") {
          ts = Math.abs(t - y1) <= d;
          bs = Math.abs(b - y2) <= d;
          ls = Math.abs(l - x1) <= d;
          rs = Math.abs(r - x2) <= d;

          if (ts) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: t,
              left: 0
            }).top;
          }

          if (bs) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: b - inst.helperProportions.height,
              left: 0
            }).top;
          }

          if (ls) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: l
            }).left;
          }

          if (rs) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: r - inst.helperProportions.width
            }).left;
          }
        }

        if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
          if (inst.options.snap.snap) {
            inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
              snapItem: inst.snapElements[i].item
            }));
          }
        }

        inst.snapElements[i].snapping = ts || bs || ls || rs || first;
      }
    }
  });
  $.ui.plugin.add("draggable", "stack", {
    start: function start(event, ui, instance) {
      var min,
          o = instance.options,
          group = $.makeArray($(o.stack)).sort(function (a, b) {
        return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
      });

      if (!group.length) {
        return;
      }

      min = parseInt($(group[0]).css("zIndex"), 10) || 0;
      $(group).each(function (i) {
        $(this).css("zIndex", min + i);
      });
      this.css("zIndex", min + group.length);
    }
  });
  $.ui.plugin.add("draggable", "zIndex", {
    start: function start(event, ui, instance) {
      var t = $(ui.helper),
          o = instance.options;

      if (t.css("zIndex")) {
        o._zIndex = t.css("zIndex");
      }

      t.css("zIndex", o.zIndex);
    },
    stop: function stop(event, ui, instance) {
      var o = instance.options;

      if (o._zIndex) {
        $(ui.helper).css("zIndex", o._zIndex);
      }
    }
  });
  return $.ui.draggable;
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/widgets/mouse.js":
/*!****************************************************!*\
  !*** ./node_modules/jquery-ui/ui/widgets/mouse.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Mouse 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Mouse
//>>group: Widgets
//>>description: Abstracts mouse-based interactions to assist in creating certain widgets.
//>>docs: http://api.jqueryui.com/mouse/
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ../ie */ "./node_modules/jquery-ui/ui/ie.js"), __webpack_require__(/*! ../version */ "./node_modules/jquery-ui/ui/version.js"), __webpack_require__(/*! ../widget */ "./node_modules/jquery-ui/ui/widget.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  var mouseHandled = false;
  $(document).on("mouseup", function () {
    mouseHandled = false;
  });
  return $.widget("ui.mouse", {
    version: "1.13.2",
    options: {
      cancel: "input, textarea, button, select, option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function _mouseInit() {
      var that = this;
      this.element.on("mousedown." + this.widgetName, function (event) {
        return that._mouseDown(event);
      }).on("click." + this.widgetName, function (event) {
        if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
          $.removeData(event.target, that.widgetName + ".preventClickEvent");
          event.stopImmediatePropagation();
          return false;
        }
      });
      this.started = false;
    },
    // TODO: make sure destroying one instance of mouse doesn't mess with
    // other instances of mouse
    _mouseDestroy: function _mouseDestroy() {
      this.element.off("." + this.widgetName);

      if (this._mouseMoveDelegate) {
        this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
      }
    },
    _mouseDown: function _mouseDown(event) {
      // don't let more than one widget handle mouseStart
      if (mouseHandled) {
        return;
      }

      this._mouseMoved = false; // We may have missed mouseup (out of window)

      if (this._mouseStarted) {
        this._mouseUp(event);
      }

      this._mouseDownEvent = event;
      var that = this,
          btnIsLeft = event.which === 1,
          // event.target.nodeName works around a bug in IE 8 with
      // disabled inputs (#7620)
      elIsCancel = typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false;

      if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
        return true;
      }

      this.mouseDelayMet = !this.options.delay;

      if (!this.mouseDelayMet) {
        this._mouseDelayTimer = setTimeout(function () {
          that.mouseDelayMet = true;
        }, this.options.delay);
      }

      if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
        this._mouseStarted = this._mouseStart(event) !== false;

        if (!this._mouseStarted) {
          event.preventDefault();
          return true;
        }
      } // Click event may never have fired (Gecko & Opera)


      if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
        $.removeData(event.target, this.widgetName + ".preventClickEvent");
      } // These delegates are required to keep context


      this._mouseMoveDelegate = function (event) {
        return that._mouseMove(event);
      };

      this._mouseUpDelegate = function (event) {
        return that._mouseUp(event);
      };

      this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate);
      event.preventDefault();
      mouseHandled = true;
      return true;
    },
    _mouseMove: function _mouseMove(event) {
      // Only check for mouseups outside the document if you've moved inside the document
      // at least once. This prevents the firing of mouseup in the case of IE<9, which will
      // fire a mousemove event if content is placed under the cursor. See #7778
      // Support: IE <9
      if (this._mouseMoved) {
        // IE mouseup check - mouseup happened when mouse was out of window
        if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
          return this._mouseUp(event); // Iframe mouseup check - mouseup occurred in another document
        } else if (!event.which) {
          // Support: Safari <=8 - 9
          // Safari sets which to 0 if you press any of the following keys
          // during a drag (#14461)
          if (event.originalEvent.altKey || event.originalEvent.ctrlKey || event.originalEvent.metaKey || event.originalEvent.shiftKey) {
            this.ignoreMissingWhich = true;
          } else if (!this.ignoreMissingWhich) {
            return this._mouseUp(event);
          }
        }
      }

      if (event.which || event.button) {
        this._mouseMoved = true;
      }

      if (this._mouseStarted) {
        this._mouseDrag(event);

        return event.preventDefault();
      }

      if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
        this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== false;

        if (this._mouseStarted) {
          this._mouseDrag(event);
        } else {
          this._mouseUp(event);
        }
      }

      return !this._mouseStarted;
    },
    _mouseUp: function _mouseUp(event) {
      this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);

      if (this._mouseStarted) {
        this._mouseStarted = false;

        if (event.target === this._mouseDownEvent.target) {
          $.data(event.target, this.widgetName + ".preventClickEvent", true);
        }

        this._mouseStop(event);
      }

      if (this._mouseDelayTimer) {
        clearTimeout(this._mouseDelayTimer);
        delete this._mouseDelayTimer;
      }

      this.ignoreMissingWhich = false;
      mouseHandled = false;
      event.preventDefault();
    },
    _mouseDistanceMet: function _mouseDistanceMet(event) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
    },
    _mouseDelayMet: function _mouseDelayMet() {
      return this.mouseDelayMet;
    },
    // These are placeholder methods, to be overriden by extending plugin
    _mouseStart: function _mouseStart() {},
    _mouseDrag: function _mouseDrag() {},
    _mouseStop: function _mouseStop() {},
    _mouseCapture: function _mouseCapture() {
      return true;
    }
  });
});

/***/ }),

/***/ "./node_modules/jquery-ui/ui/widgets/resizable.js":
/*!********************************************************!*\
  !*** ./node_modules/jquery-ui/ui/widgets/resizable.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Resizable 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Resizable
//>>group: Interactions
//>>description: Enables resize functionality for any element.
//>>docs: http://api.jqueryui.com/resizable/
//>>demos: http://jqueryui.com/resizable/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/resizable.css
//>>css.theme: ../../themes/base/theme.css
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! ./mouse */ "./node_modules/jquery-ui/ui/widgets/mouse.js"), __webpack_require__(/*! ../disable-selection */ "./node_modules/jquery-ui/ui/disable-selection.js"), __webpack_require__(/*! ../plugin */ "./node_modules/jquery-ui/ui/plugin.js"), __webpack_require__(/*! ../version */ "./node_modules/jquery-ui/ui/version.js"), __webpack_require__(/*! ../widget */ "./node_modules/jquery-ui/ui/widget.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  $.widget("ui.resizable", $.ui.mouse, {
    version: "1.13.2",
    widgetEventPrefix: "resize",
    options: {
      alsoResize: false,
      animate: false,
      animateDuration: "slow",
      animateEasing: "swing",
      aspectRatio: false,
      autoHide: false,
      classes: {
        "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
      },
      containment: false,
      ghost: false,
      grid: false,
      handles: "e,s,se",
      helper: false,
      maxHeight: null,
      maxWidth: null,
      minHeight: 10,
      minWidth: 10,
      // See #7960
      zIndex: 90,
      // Callbacks
      resize: null,
      start: null,
      stop: null
    },
    _num: function _num(value) {
      return parseFloat(value) || 0;
    },
    _isNumber: function _isNumber(value) {
      return !isNaN(parseFloat(value));
    },
    _hasScroll: function _hasScroll(el, a) {
      if ($(el).css("overflow") === "hidden") {
        return false;
      }

      var scroll = a && a === "left" ? "scrollLeft" : "scrollTop",
          has = false;

      if (el[scroll] > 0) {
        return true;
      } // TODO: determine which cases actually cause this to happen
      // if the element doesn't have the scroll set, see if it's possible to
      // set the scroll


      try {
        el[scroll] = 1;
        has = el[scroll] > 0;
        el[scroll] = 0;
      } catch (e) {// `el` might be a string, then setting `scroll` will throw
        // an error in strict mode; ignore it.
      }

      return has;
    },
    _create: function _create() {
      var margins,
          o = this.options,
          that = this;

      this._addClass("ui-resizable");

      $.extend(this, {
        _aspectRatio: !!o.aspectRatio,
        aspectRatio: o.aspectRatio,
        originalElement: this.element,
        _proportionallyResizeElements: [],
        _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
      }); // Wrap the element if it cannot hold child nodes

      if (this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)) {
        this.element.wrap($("<div class='ui-wrapper'></div>").css({
          overflow: "hidden",
          position: this.element.css("position"),
          width: this.element.outerWidth(),
          height: this.element.outerHeight(),
          top: this.element.css("top"),
          left: this.element.css("left")
        }));
        this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance"));
        this.elementIsWrapper = true;
        margins = {
          marginTop: this.originalElement.css("marginTop"),
          marginRight: this.originalElement.css("marginRight"),
          marginBottom: this.originalElement.css("marginBottom"),
          marginLeft: this.originalElement.css("marginLeft")
        };
        this.element.css(margins);
        this.originalElement.css("margin", 0); // support: Safari
        // Prevent Safari textarea resize

        this.originalResizeStyle = this.originalElement.css("resize");
        this.originalElement.css("resize", "none");

        this._proportionallyResizeElements.push(this.originalElement.css({
          position: "static",
          zoom: 1,
          display: "block"
        })); // Support: IE9
        // avoid IE jump (hard set the margin)


        this.originalElement.css(margins);

        this._proportionallyResize();
      }

      this._setupHandles();

      if (o.autoHide) {
        $(this.element).on("mouseenter", function () {
          if (o.disabled) {
            return;
          }

          that._removeClass("ui-resizable-autohide");

          that._handles.show();
        }).on("mouseleave", function () {
          if (o.disabled) {
            return;
          }

          if (!that.resizing) {
            that._addClass("ui-resizable-autohide");

            that._handles.hide();
          }
        });
      }

      this._mouseInit();
    },
    _destroy: function _destroy() {
      this._mouseDestroy();

      this._addedHandles.remove();

      var wrapper,
          _destroy = function _destroy(exp) {
        $(exp).removeData("resizable").removeData("ui-resizable").off(".resizable");
      }; // TODO: Unwrap at same DOM position


      if (this.elementIsWrapper) {
        _destroy(this.element);

        wrapper = this.element;
        this.originalElement.css({
          position: wrapper.css("position"),
          width: wrapper.outerWidth(),
          height: wrapper.outerHeight(),
          top: wrapper.css("top"),
          left: wrapper.css("left")
        }).insertAfter(wrapper);
        wrapper.remove();
      }

      this.originalElement.css("resize", this.originalResizeStyle);

      _destroy(this.originalElement);

      return this;
    },
    _setOption: function _setOption(key, value) {
      this._super(key, value);

      switch (key) {
        case "handles":
          this._removeHandles();

          this._setupHandles();

          break;

        case "aspectRatio":
          this._aspectRatio = !!value;
          break;

        default:
          break;
      }
    },
    _setupHandles: function _setupHandles() {
      var o = this.options,
          handle,
          i,
          n,
          hname,
          axis,
          that = this;
      this.handles = o.handles || (!$(".ui-resizable-handle", this.element).length ? "e,s,se" : {
        n: ".ui-resizable-n",
        e: ".ui-resizable-e",
        s: ".ui-resizable-s",
        w: ".ui-resizable-w",
        se: ".ui-resizable-se",
        sw: ".ui-resizable-sw",
        ne: ".ui-resizable-ne",
        nw: ".ui-resizable-nw"
      });
      this._handles = $();
      this._addedHandles = $();

      if (this.handles.constructor === String) {
        if (this.handles === "all") {
          this.handles = "n,e,s,w,se,sw,ne,nw";
        }

        n = this.handles.split(",");
        this.handles = {};

        for (i = 0; i < n.length; i++) {
          handle = String.prototype.trim.call(n[i]);
          hname = "ui-resizable-" + handle;
          axis = $("<div>");

          this._addClass(axis, "ui-resizable-handle " + hname);

          axis.css({
            zIndex: o.zIndex
          });
          this.handles[handle] = ".ui-resizable-" + handle;

          if (!this.element.children(this.handles[handle]).length) {
            this.element.append(axis);
            this._addedHandles = this._addedHandles.add(axis);
          }
        }
      }

      this._renderAxis = function (target) {
        var i, axis, padPos, padWrapper;
        target = target || this.element;

        for (i in this.handles) {
          if (this.handles[i].constructor === String) {
            this.handles[i] = this.element.children(this.handles[i]).first().show();
          } else if (this.handles[i].jquery || this.handles[i].nodeType) {
            this.handles[i] = $(this.handles[i]);

            this._on(this.handles[i], {
              "mousedown": that._mouseDown
            });
          }

          if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)) {
            axis = $(this.handles[i], this.element);
            padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();
            padPos = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");
            target.css(padPos, padWrapper);

            this._proportionallyResize();
          }

          this._handles = this._handles.add(this.handles[i]);
        }
      }; // TODO: make renderAxis a prototype function


      this._renderAxis(this.element);

      this._handles = this._handles.add(this.element.find(".ui-resizable-handle"));

      this._handles.disableSelection();

      this._handles.on("mouseover", function () {
        if (!that.resizing) {
          if (this.className) {
            axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
          }

          that.axis = axis && axis[1] ? axis[1] : "se";
        }
      });

      if (o.autoHide) {
        this._handles.hide();

        this._addClass("ui-resizable-autohide");
      }
    },
    _removeHandles: function _removeHandles() {
      this._addedHandles.remove();
    },
    _mouseCapture: function _mouseCapture(event) {
      var i,
          handle,
          capture = false;

      for (i in this.handles) {
        handle = $(this.handles[i])[0];

        if (handle === event.target || $.contains(handle, event.target)) {
          capture = true;
        }
      }

      return !this.options.disabled && capture;
    },
    _mouseStart: function _mouseStart(event) {
      var curleft,
          curtop,
          cursor,
          o = this.options,
          el = this.element;
      this.resizing = true;

      this._renderProxy();

      curleft = this._num(this.helper.css("left"));
      curtop = this._num(this.helper.css("top"));

      if (o.containment) {
        curleft += $(o.containment).scrollLeft() || 0;
        curtop += $(o.containment).scrollTop() || 0;
      }

      this.offset = this.helper.offset();
      this.position = {
        left: curleft,
        top: curtop
      };
      this.size = this._helper ? {
        width: this.helper.width(),
        height: this.helper.height()
      } : {
        width: el.width(),
        height: el.height()
      };
      this.originalSize = this._helper ? {
        width: el.outerWidth(),
        height: el.outerHeight()
      } : {
        width: el.width(),
        height: el.height()
      };
      this.sizeDiff = {
        width: el.outerWidth() - el.width(),
        height: el.outerHeight() - el.height()
      };
      this.originalPosition = {
        left: curleft,
        top: curtop
      };
      this.originalMousePosition = {
        left: event.pageX,
        top: event.pageY
      };
      this.aspectRatio = typeof o.aspectRatio === "number" ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
      cursor = $(".ui-resizable-" + this.axis).css("cursor");
      $("body").css("cursor", cursor === "auto" ? this.axis + "-resize" : cursor);

      this._addClass("ui-resizable-resizing");

      this._propagate("start", event);

      return true;
    },
    _mouseDrag: function _mouseDrag(event) {
      var data,
          props,
          smp = this.originalMousePosition,
          a = this.axis,
          dx = event.pageX - smp.left || 0,
          dy = event.pageY - smp.top || 0,
          trigger = this._change[a];

      this._updatePrevProperties();

      if (!trigger) {
        return false;
      }

      data = trigger.apply(this, [event, dx, dy]);

      this._updateVirtualBoundaries(event.shiftKey);

      if (this._aspectRatio || event.shiftKey) {
        data = this._updateRatio(data, event);
      }

      data = this._respectSize(data, event);

      this._updateCache(data);

      this._propagate("resize", event);

      props = this._applyChanges();

      if (!this._helper && this._proportionallyResizeElements.length) {
        this._proportionallyResize();
      }

      if (!$.isEmptyObject(props)) {
        this._updatePrevProperties();

        this._trigger("resize", event, this.ui());

        this._applyChanges();
      }

      return false;
    },
    _mouseStop: function _mouseStop(event) {
      this.resizing = false;
      var pr,
          ista,
          soffseth,
          soffsetw,
          s,
          left,
          top,
          o = this.options,
          that = this;

      if (this._helper) {
        pr = this._proportionallyResizeElements;
        ista = pr.length && /textarea/i.test(pr[0].nodeName);
        soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
        soffsetw = ista ? 0 : that.sizeDiff.width;
        s = {
          width: that.helper.width() - soffsetw,
          height: that.helper.height() - soffseth
        };
        left = parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left) || null;
        top = parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top) || null;

        if (!o.animate) {
          this.element.css($.extend(s, {
            top: top,
            left: left
          }));
        }

        that.helper.height(that.size.height);
        that.helper.width(that.size.width);

        if (this._helper && !o.animate) {
          this._proportionallyResize();
        }
      }

      $("body").css("cursor", "auto");

      this._removeClass("ui-resizable-resizing");

      this._propagate("stop", event);

      if (this._helper) {
        this.helper.remove();
      }

      return false;
    },
    _updatePrevProperties: function _updatePrevProperties() {
      this.prevPosition = {
        top: this.position.top,
        left: this.position.left
      };
      this.prevSize = {
        width: this.size.width,
        height: this.size.height
      };
    },
    _applyChanges: function _applyChanges() {
      var props = {};

      if (this.position.top !== this.prevPosition.top) {
        props.top = this.position.top + "px";
      }

      if (this.position.left !== this.prevPosition.left) {
        props.left = this.position.left + "px";
      }

      if (this.size.width !== this.prevSize.width) {
        props.width = this.size.width + "px";
      }

      if (this.size.height !== this.prevSize.height) {
        props.height = this.size.height + "px";
      }

      this.helper.css(props);
      return props;
    },
    _updateVirtualBoundaries: function _updateVirtualBoundaries(forceAspectRatio) {
      var pMinWidth,
          pMaxWidth,
          pMinHeight,
          pMaxHeight,
          b,
          o = this.options;
      b = {
        minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
        maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : Infinity,
        minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
        maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : Infinity
      };

      if (this._aspectRatio || forceAspectRatio) {
        pMinWidth = b.minHeight * this.aspectRatio;
        pMinHeight = b.minWidth / this.aspectRatio;
        pMaxWidth = b.maxHeight * this.aspectRatio;
        pMaxHeight = b.maxWidth / this.aspectRatio;

        if (pMinWidth > b.minWidth) {
          b.minWidth = pMinWidth;
        }

        if (pMinHeight > b.minHeight) {
          b.minHeight = pMinHeight;
        }

        if (pMaxWidth < b.maxWidth) {
          b.maxWidth = pMaxWidth;
        }

        if (pMaxHeight < b.maxHeight) {
          b.maxHeight = pMaxHeight;
        }
      }

      this._vBoundaries = b;
    },
    _updateCache: function _updateCache(data) {
      this.offset = this.helper.offset();

      if (this._isNumber(data.left)) {
        this.position.left = data.left;
      }

      if (this._isNumber(data.top)) {
        this.position.top = data.top;
      }

      if (this._isNumber(data.height)) {
        this.size.height = data.height;
      }

      if (this._isNumber(data.width)) {
        this.size.width = data.width;
      }
    },
    _updateRatio: function _updateRatio(data) {
      var cpos = this.position,
          csize = this.size,
          a = this.axis;

      if (this._isNumber(data.height)) {
        data.width = data.height * this.aspectRatio;
      } else if (this._isNumber(data.width)) {
        data.height = data.width / this.aspectRatio;
      }

      if (a === "sw") {
        data.left = cpos.left + (csize.width - data.width);
        data.top = null;
      }

      if (a === "nw") {
        data.top = cpos.top + (csize.height - data.height);
        data.left = cpos.left + (csize.width - data.width);
      }

      return data;
    },
    _respectSize: function _respectSize(data) {
      var o = this._vBoundaries,
          a = this.axis,
          ismaxw = this._isNumber(data.width) && o.maxWidth && o.maxWidth < data.width,
          ismaxh = this._isNumber(data.height) && o.maxHeight && o.maxHeight < data.height,
          isminw = this._isNumber(data.width) && o.minWidth && o.minWidth > data.width,
          isminh = this._isNumber(data.height) && o.minHeight && o.minHeight > data.height,
          dw = this.originalPosition.left + this.originalSize.width,
          dh = this.originalPosition.top + this.originalSize.height,
          cw = /sw|nw|w/.test(a),
          ch = /nw|ne|n/.test(a);

      if (isminw) {
        data.width = o.minWidth;
      }

      if (isminh) {
        data.height = o.minHeight;
      }

      if (ismaxw) {
        data.width = o.maxWidth;
      }

      if (ismaxh) {
        data.height = o.maxHeight;
      }

      if (isminw && cw) {
        data.left = dw - o.minWidth;
      }

      if (ismaxw && cw) {
        data.left = dw - o.maxWidth;
      }

      if (isminh && ch) {
        data.top = dh - o.minHeight;
      }

      if (ismaxh && ch) {
        data.top = dh - o.maxHeight;
      } // Fixing jump error on top/left - bug #2330


      if (!data.width && !data.height && !data.left && data.top) {
        data.top = null;
      } else if (!data.width && !data.height && !data.top && data.left) {
        data.left = null;
      }

      return data;
    },
    _getPaddingPlusBorderDimensions: function _getPaddingPlusBorderDimensions(element) {
      var i = 0,
          widths = [],
          borders = [element.css("borderTopWidth"), element.css("borderRightWidth"), element.css("borderBottomWidth"), element.css("borderLeftWidth")],
          paddings = [element.css("paddingTop"), element.css("paddingRight"), element.css("paddingBottom"), element.css("paddingLeft")];

      for (; i < 4; i++) {
        widths[i] = parseFloat(borders[i]) || 0;
        widths[i] += parseFloat(paddings[i]) || 0;
      }

      return {
        height: widths[0] + widths[2],
        width: widths[1] + widths[3]
      };
    },
    _proportionallyResize: function _proportionallyResize() {
      if (!this._proportionallyResizeElements.length) {
        return;
      }

      var prel,
          i = 0,
          element = this.helper || this.element;

      for (; i < this._proportionallyResizeElements.length; i++) {
        prel = this._proportionallyResizeElements[i]; // TODO: Seems like a bug to cache this.outerDimensions
        // considering that we are in a loop.

        if (!this.outerDimensions) {
          this.outerDimensions = this._getPaddingPlusBorderDimensions(prel);
        }

        prel.css({
          height: element.height() - this.outerDimensions.height || 0,
          width: element.width() - this.outerDimensions.width || 0
        });
      }
    },
    _renderProxy: function _renderProxy() {
      var el = this.element,
          o = this.options;
      this.elementOffset = el.offset();

      if (this._helper) {
        this.helper = this.helper || $("<div></div>").css({
          overflow: "hidden"
        });

        this._addClass(this.helper, this._helper);

        this.helper.css({
          width: this.element.outerWidth(),
          height: this.element.outerHeight(),
          position: "absolute",
          left: this.elementOffset.left + "px",
          top: this.elementOffset.top + "px",
          zIndex: ++o.zIndex //TODO: Don't modify option

        });
        this.helper.appendTo("body").disableSelection();
      } else {
        this.helper = this.element;
      }
    },
    _change: {
      e: function e(event, dx) {
        return {
          width: this.originalSize.width + dx
        };
      },
      w: function w(event, dx) {
        var cs = this.originalSize,
            sp = this.originalPosition;
        return {
          left: sp.left + dx,
          width: cs.width - dx
        };
      },
      n: function n(event, dx, dy) {
        var cs = this.originalSize,
            sp = this.originalPosition;
        return {
          top: sp.top + dy,
          height: cs.height - dy
        };
      },
      s: function s(event, dx, dy) {
        return {
          height: this.originalSize.height + dy
        };
      },
      se: function se(event, dx, dy) {
        return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
      },
      sw: function sw(event, dx, dy) {
        return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
      },
      ne: function ne(event, dx, dy) {
        return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
      },
      nw: function nw(event, dx, dy) {
        return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
      }
    },
    _propagate: function _propagate(n, event) {
      $.ui.plugin.call(this, n, [event, this.ui()]);

      if (n !== "resize") {
        this._trigger(n, event, this.ui());
      }
    },
    plugins: {},
    ui: function ui() {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition
      };
    }
  });
  /*
   * Resizable Extensions
   */

  $.ui.plugin.add("resizable", "animate", {
    stop: function stop(event) {
      var that = $(this).resizable("instance"),
          o = that.options,
          pr = that._proportionallyResizeElements,
          ista = pr.length && /textarea/i.test(pr[0].nodeName),
          soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
          soffsetw = ista ? 0 : that.sizeDiff.width,
          style = {
        width: that.size.width - soffsetw,
        height: that.size.height - soffseth
      },
          left = parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left) || null,
          top = parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top) || null;
      that.element.animate($.extend(style, top && left ? {
        top: top,
        left: left
      } : {}), {
        duration: o.animateDuration,
        easing: o.animateEasing,
        step: function step() {
          var data = {
            width: parseFloat(that.element.css("width")),
            height: parseFloat(that.element.css("height")),
            top: parseFloat(that.element.css("top")),
            left: parseFloat(that.element.css("left"))
          };

          if (pr && pr.length) {
            $(pr[0]).css({
              width: data.width,
              height: data.height
            });
          } // Propagating resize, and updating values for each animation step


          that._updateCache(data);

          that._propagate("resize", event);
        }
      });
    }
  });
  $.ui.plugin.add("resizable", "containment", {
    start: function start() {
      var element,
          p,
          co,
          ch,
          cw,
          width,
          height,
          that = $(this).resizable("instance"),
          o = that.options,
          el = that.element,
          oc = o.containment,
          ce = oc instanceof $ ? oc.get(0) : /parent/.test(oc) ? el.parent().get(0) : oc;

      if (!ce) {
        return;
      }

      that.containerElement = $(ce);

      if (/document/.test(oc) || oc === document) {
        that.containerOffset = {
          left: 0,
          top: 0
        };
        that.containerPosition = {
          left: 0,
          top: 0
        };
        that.parentData = {
          element: $(document),
          left: 0,
          top: 0,
          width: $(document).width(),
          height: $(document).height() || document.body.parentNode.scrollHeight
        };
      } else {
        element = $(ce);
        p = [];
        $(["Top", "Right", "Left", "Bottom"]).each(function (i, name) {
          p[i] = that._num(element.css("padding" + name));
        });
        that.containerOffset = element.offset();
        that.containerPosition = element.position();
        that.containerSize = {
          height: element.innerHeight() - p[3],
          width: element.innerWidth() - p[1]
        };
        co = that.containerOffset;
        ch = that.containerSize.height;
        cw = that.containerSize.width;
        width = that._hasScroll(ce, "left") ? ce.scrollWidth : cw;
        height = that._hasScroll(ce) ? ce.scrollHeight : ch;
        that.parentData = {
          element: ce,
          left: co.left,
          top: co.top,
          width: width,
          height: height
        };
      }
    },
    resize: function resize(event) {
      var woset,
          hoset,
          isParent,
          isOffsetRelative,
          that = $(this).resizable("instance"),
          o = that.options,
          co = that.containerOffset,
          cp = that.position,
          pRatio = that._aspectRatio || event.shiftKey,
          cop = {
        top: 0,
        left: 0
      },
          ce = that.containerElement,
          continueResize = true;

      if (ce[0] !== document && /static/.test(ce.css("position"))) {
        cop = co;
      }

      if (cp.left < (that._helper ? co.left : 0)) {
        that.size.width = that.size.width + (that._helper ? that.position.left - co.left : that.position.left - cop.left);

        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
          continueResize = false;
        }

        that.position.left = o.helper ? co.left : 0;
      }

      if (cp.top < (that._helper ? co.top : 0)) {
        that.size.height = that.size.height + (that._helper ? that.position.top - co.top : that.position.top);

        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
          continueResize = false;
        }

        that.position.top = that._helper ? co.top : 0;
      }

      isParent = that.containerElement.get(0) === that.element.parent().get(0);
      isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position"));

      if (isParent && isOffsetRelative) {
        that.offset.left = that.parentData.left + that.position.left;
        that.offset.top = that.parentData.top + that.position.top;
      } else {
        that.offset.left = that.element.offset().left;
        that.offset.top = that.element.offset().top;
      }

      woset = Math.abs(that.sizeDiff.width + (that._helper ? that.offset.left - cop.left : that.offset.left - co.left));
      hoset = Math.abs(that.sizeDiff.height + (that._helper ? that.offset.top - cop.top : that.offset.top - co.top));

      if (woset + that.size.width >= that.parentData.width) {
        that.size.width = that.parentData.width - woset;

        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
          continueResize = false;
        }
      }

      if (hoset + that.size.height >= that.parentData.height) {
        that.size.height = that.parentData.height - hoset;

        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
          continueResize = false;
        }
      }

      if (!continueResize) {
        that.position.left = that.prevPosition.left;
        that.position.top = that.prevPosition.top;
        that.size.width = that.prevSize.width;
        that.size.height = that.prevSize.height;
      }
    },
    stop: function stop() {
      var that = $(this).resizable("instance"),
          o = that.options,
          co = that.containerOffset,
          cop = that.containerPosition,
          ce = that.containerElement,
          helper = $(that.helper),
          ho = helper.offset(),
          w = helper.outerWidth() - that.sizeDiff.width,
          h = helper.outerHeight() - that.sizeDiff.height;

      if (that._helper && !o.animate && /relative/.test(ce.css("position"))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h
        });
      }

      if (that._helper && !o.animate && /static/.test(ce.css("position"))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h
        });
      }
    }
  });
  $.ui.plugin.add("resizable", "alsoResize", {
    start: function start() {
      var that = $(this).resizable("instance"),
          o = that.options;
      $(o.alsoResize).each(function () {
        var el = $(this);
        el.data("ui-resizable-alsoresize", {
          width: parseFloat(el.width()),
          height: parseFloat(el.height()),
          left: parseFloat(el.css("left")),
          top: parseFloat(el.css("top"))
        });
      });
    },
    resize: function resize(event, ui) {
      var that = $(this).resizable("instance"),
          o = that.options,
          os = that.originalSize,
          op = that.originalPosition,
          delta = {
        height: that.size.height - os.height || 0,
        width: that.size.width - os.width || 0,
        top: that.position.top - op.top || 0,
        left: that.position.left - op.left || 0
      };
      $(o.alsoResize).each(function () {
        var el = $(this),
            start = $(this).data("ui-resizable-alsoresize"),
            style = {},
            css = el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
        $.each(css, function (i, prop) {
          var sum = (start[prop] || 0) + (delta[prop] || 0);

          if (sum && sum >= 0) {
            style[prop] = sum || null;
          }
        });
        el.css(style);
      });
    },
    stop: function stop() {
      $(this).removeData("ui-resizable-alsoresize");
    }
  });
  $.ui.plugin.add("resizable", "ghost", {
    start: function start() {
      var that = $(this).resizable("instance"),
          cs = that.size;
      that.ghost = that.originalElement.clone();
      that.ghost.css({
        opacity: 0.25,
        display: "block",
        position: "relative",
        height: cs.height,
        width: cs.width,
        margin: 0,
        left: 0,
        top: 0
      });

      that._addClass(that.ghost, "ui-resizable-ghost"); // DEPRECATED
      // TODO: remove after 1.12


      if ($.uiBackCompat !== false && typeof that.options.ghost === "string") {
        // Ghost option
        that.ghost.addClass(this.options.ghost);
      }

      that.ghost.appendTo(that.helper);
    },
    resize: function resize() {
      var that = $(this).resizable("instance");

      if (that.ghost) {
        that.ghost.css({
          position: "relative",
          height: that.size.height,
          width: that.size.width
        });
      }
    },
    stop: function stop() {
      var that = $(this).resizable("instance");

      if (that.ghost && that.helper) {
        that.helper.get(0).removeChild(that.ghost.get(0));
      }
    }
  });
  $.ui.plugin.add("resizable", "grid", {
    resize: function resize() {
      var outerDimensions,
          that = $(this).resizable("instance"),
          o = that.options,
          cs = that.size,
          os = that.originalSize,
          op = that.originalPosition,
          a = that.axis,
          grid = typeof o.grid === "number" ? [o.grid, o.grid] : o.grid,
          gridX = grid[0] || 1,
          gridY = grid[1] || 1,
          ox = Math.round((cs.width - os.width) / gridX) * gridX,
          oy = Math.round((cs.height - os.height) / gridY) * gridY,
          newWidth = os.width + ox,
          newHeight = os.height + oy,
          isMaxWidth = o.maxWidth && o.maxWidth < newWidth,
          isMaxHeight = o.maxHeight && o.maxHeight < newHeight,
          isMinWidth = o.minWidth && o.minWidth > newWidth,
          isMinHeight = o.minHeight && o.minHeight > newHeight;
      o.grid = grid;

      if (isMinWidth) {
        newWidth += gridX;
      }

      if (isMinHeight) {
        newHeight += gridY;
      }

      if (isMaxWidth) {
        newWidth -= gridX;
      }

      if (isMaxHeight) {
        newHeight -= gridY;
      }

      if (/^(se|s|e)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
      } else if (/^(ne)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
        that.position.top = op.top - oy;
      } else if (/^(sw)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
        that.position.left = op.left - ox;
      } else {
        if (newHeight - gridY <= 0 || newWidth - gridX <= 0) {
          outerDimensions = that._getPaddingPlusBorderDimensions(this);
        }

        if (newHeight - gridY > 0) {
          that.size.height = newHeight;
          that.position.top = op.top - oy;
        } else {
          newHeight = gridY - outerDimensions.height;
          that.size.height = newHeight;
          that.position.top = op.top + os.height - newHeight;
        }

        if (newWidth - gridX > 0) {
          that.size.width = newWidth;
          that.position.left = op.left - ox;
        } else {
          newWidth = gridX - outerDimensions.width;
          that.size.width = newWidth;
          that.position.left = op.left + os.width - newWidth;
        }
      }
    }
  });
  return $.ui.resizable;
});

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ 7:
/*!*******************************************************************************!*\
  !*** multi ./node_modules/@concretecms/bedrock/assets/desktop/js/frontend.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/andrewembler/projects/concretecms/build/node_modules/@concretecms/bedrock/assets/desktop/js/frontend.js */"./node_modules/@concretecms/bedrock/assets/desktop/js/frontend.js");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });