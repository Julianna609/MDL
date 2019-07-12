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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

/**
 * Uncomment @babel/polyfill if you use some features from ES5+ (for IE11 compatibility)
 * E.g. Promise, Map, Set and so on
 */
// import '@babel/polyfill'

/**
 * Import utils
 */



(function ($) {
  $(document).ready(function () {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["log"])('Ready'); // burger menu opening

    $('.js-mobile-menu-toggle').click(function () {
      $(this).toggleClass('active');
      $('.js-mobile-menu').toggleClass('active');
      $('body').toggleClass('overflow-hidden');
    }); // mobile search-form behavior

    $('.js-mobile-search-open .site-search__field').focus(function () {
      $('.js-mobile-menu-products').addClass('unactive');
      $(this).closest('.js-mobile-search-open').addClass('active');
    });
    $('.js-mobile-search-open .site-search__field').blur(function () {
      $('.js-mobile-menu-products').removeClass('unactive');
      $(this).closest('.js-mobile-search-open').removeClass('active');
    });
    $('.site-search__submit').click(function (e) {
      if ($('.site-search__field').val() === '') {
        e.preventDefault();
      }
    });

    function addHomePadding() {
      var padding = $('.js-scroll-navbar-mobile').height();
      $('.home-section').css('padding-top', padding);
    }

    addHomePadding();
    $(document).on('load', addHomePadding);
    $(window).on('resize', addHomePadding);

    function homeHeaderScroll() {
      var height = $(window).scrollTop();

      if (height > 1) {
        $('.page-template-home .site-header').addClass('bg');
      } else {
        $('.page-template-home .site-header').removeClass('bg');
      }
    }

    ;
    $(window).on('scroll', homeHeaderScroll); // $('.js-mobile-search-open').click(function () {
    //   $(this).addClass('active');
    //   $('.js-mobile-menu-products').addClass('unactive');
    // });
    // $(document).on('click', e => {
    //   if (!$('.site-search__field').is(e.target)) {
    //     $('.js-mobile-search-open').removeClass('active');
    //     $('.js-mobile-menu-products').removeClass('unactive');
    //   }
    // });
    // behavior of mobile navbars on scroll

    var prevScrollpos = $(window).pageYOffset;

    function navBarsScrollBehavior() {
      var currentScrollPos = window.pageYOffset;
      $('.js-scroll-navbar-mobile').each(function () {
        var $this = $(this);
        var position = $this.data('navbar-position');
        var height = $this.outerHeight();

        if (prevScrollpos > currentScrollPos || currentScrollPos < 100) {
          $this.css(position, '0px');
        } else {
          $this.css(position, -height);
        }

        ;
      });
      prevScrollpos = currentScrollPos;
    }

    ;
    $(window).on('scroll', function () {
      if ($(window).width() < 991) {
        navBarsScrollBehavior();
      }
    });
    $('.dropdown-menu > a').click(function (e) {
      e.preventDefault();
    });
    $('.dropdown-menu').click(function (e) {
      var $this = $(this);
      $('.dropdown-menu').not($this).removeClass('active') && $('.dropdown-menu').not($this).find('.sub-menu').removeClass('active');
      $this.toggleClass('active') && $this.find('.sub-menu').toggleClass('active');
      var isOpen = $this.closest('.primary-navigation').find('.dropdown-menu.active')[0];
      var arrow = $('.triangle-icon');
      isOpen !== undefined ? arrow.addClass('active') : arrow.removeClass('active');
      var posX = $this.offset().left;
      var elementWidth = $this.width();
      var left = posX + elementWidth - 15;
      arrow.css({
        left: left
      });

      if ($(window).width() < 991) {
        $('.js-scroll-navbar-mobile').toggleClass('uplift');
        $('body').toggleClass('overflow-hidden');
      }

      ;
    });
    $('.bundles.menu-item').click(function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.toggleClass('active') && $('.bundle-menu').toggleClass('active');
      $('body').toggleClass('overflow-hidden');

      if ($(window).width() < 991) {
        // const navbarHeight = $('.main-navigation.js-scroll-navbar-mobile').height();
        var headerHeight = $('.site-header.js-scroll-navbar-mobile').height(); // log(navbarHeight, headerHeight);

        var height = "calc(100vh - ".concat(headerHeight, "px)");
        $('.bundle-menu').css('height', height);
        $('.js-scroll-navbar-mobile').toggleClass('uplift');
      }

      ;
    }); //  Purchase bundle: form payment buttons

    $('.payment-buttons .btn').click(function (e) {
      $('.payment-buttons .btn.active').not(this).removeClass('active');
      $(this).toggleClass('active');

      if ($(this).hasClass('btn-custom-payment')) {
        $('.purchase-bundle-block__container .input-payment-wrp').toggleClass('field-hidden');
      } else {
        $('.input-payment-wrp').addClass('field-hidden');
      }
    }); // Purchase bundle: prevent submit on enter

    $('.bundle_form.cart').keydown(function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });
    $('.bundle_add_to_cart_button').on('click', checkEmptyBundleForm);

    function checkEmptyBundleForm(e) {
      if ($('.payment-buttons .btn.active')[0] && !$('.input-payment').hasClass('invalid')) {
        return;
      } else {
        e.preventDefault();
        var buttonsCollection = collectPaymentButtons();
        var theLowestPrice = buttonsCollection[0];
        var message = window.warning_translate_text_first.replace('[ins_1]', "".concat(theLowestPrice)).replace('[ins_2]', "".concat(theLowestPrice)).replace('[ins_3]', "".concat(theLowestPrice));
        var warning = "<div class=\"purchase-bundle__warning-text warrning-1\">".concat(message, "</div>");
        $('.purchase-bundle__warning-container').html('');
        $('.purchase-bundle__warning-container').append(warning);
        $('.js-purchase-bundle__warning-add').on('click', increasePayment);
      }

      ;
    }

    ; // Purchase bundle: warning messages

    $('.payment-buttons .btn').on('click', insertWarningMessage);

    function insertWarningMessage(e) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var $this = $(this);
      var $thisValue = value ? value : $this.data('product-price');
      var buttonsCollection = collectPaymentButtons();
      $('.purchase-bundle__warning-container').html('');
      buttonsCollection.map(function (value) {
        if ($thisValue < value) {
          var message = window.warning_translate_text_second.replace('[ins_1]', "".concat(value)).replace('[ins_2]', "".concat(value - $thisValue)).replace('[ins_3]', "".concat(value)).replace('[ins_4]', "".concat(value - $thisValue));
          var warning = "<div class=\"purchase-bundle__warning-text warrning-1\">".concat(message, "</div>");
          return $('.purchase-bundle__warning-container').append(warning);
        }

        ;
      });
      $('.js-purchase-bundle__warning-add').on('click', increasePayment);
    }

    function increasePayment(e) {
      e.preventDefault();
      var dataPrice = $(this).data('product-price');
      var buttonSelector = ".btn-payment[data-product-price='".concat(dataPrice, "']");
      $(buttonSelector).click();
    }

    ;

    function collectPaymentButtons() {
      var paymentButtonsArray = [];
      $('.payment-buttons .btn-payment').each(function () {
        var dataPrice = $(this).data('product-price');
        paymentButtonsArray.push(dataPrice);
      });
      return paymentButtonsArray;
    }

    ;
    collectPaymentButtons(); // show warning message on custom amount

    $('.input-payment').on('blur', function (e) {
      var value = Number($(this).val());
      insertWarningMessage(e, value);
      $(this).removeClass('invalid');

      if (value === 0) {
        $(this).addClass('invalid');
      }
    }); // product descriptions accordion

    var initDescriptionAccodrion = function initDescriptionAccodrion() {
      var showChar = 486; // How many characters are shown by default

      $('.description-text > p').each(function () {
        var content = $(this).html();

        if (content.length > showChar) {
          var c = content.substr(0, showChar);
          var h = content.substr(showChar, content.length - showChar);
          var html = "".concat(c, " <span class=\"morecontent\"><span> ").concat(h, " </span><a href=\"#\" data-name=\"\" class=\"show-more-button\">Show more</a></span>");
          $(this).html(html);
        }
      });
    };

    initDescriptionAccodrion();

    var initRequirementsAccodrion = function initRequirementsAccodrion() {
      var showChar = 7; // How many lines are shown by default

      if ($('.system-requirements-list li').length > showChar) {
        $(".system-requirements-list li:gt(".concat(showChar, ")")).hide();
        $('.system-requirements-list').append('<li><a href="#" data-name="system requirements " class="show-more-button small-in-mobile">Show more system requirements</a></li>');
      }
    };

    initRequirementsAccodrion();
    $('.show-more-button').click(function (e) {
      e.preventDefault();
      var $this = $(this);
      var button = $this.data('name');
      var moretext = "Show more ".concat(button);
      var lesstext = "Show less ".concat(button);

      if ($this.hasClass('less')) {
        $this.removeClass('less');
        $this.html(moretext);
      } else {
        $this.addClass('less');
        $this.html(lesstext);
      }

      ;
      $this.parent().prev().toggle();
      $this.prev().toggle();
    });

    var initProductSliders = function initProductSliders() {
      // main product slider
      $('.product-slider .woocommerce-product-gallery__wrapper').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.product-slider-navigation__container'
      }); // navigation slider

      $('.product-slider-navigation__container').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: '.product-slider .woocommerce-product-gallery__wrapper',
        focusOnSelect: true,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 4
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }]
      });
      $('.slick-slide a:not(.main-button), .bundled_product_image a').click(function (e) {
        e.preventDefault();
      });
    };

    setTimeout(function () {
      initProductSliders();
    }, 500); // smooth scroll to element

    $('.go-to').click(function (e) {
      e.preventDefault();
      var offset = $(window).width() > 991 ? 150 : 50;
      var speed = 600;
      var destination = $(this).data('destination');
      $('html, body').animate({
        scrollTop: $("".concat(destination)).offset().top - offset
      }, speed);
    }); // checkout page: product quantity controllers

    function setCheckoutQntControllers() {
      var quontuityInput = $('.product-quantity input.qty');
      var currentValue = parseInt(quontuityInput.val(), 10);
      var maxValue = +quontuityInput.attr('max');
      var minValue = +quontuityInput.attr('min') === 0 ? 1 : +quontuityInput.attr('min');
      $('.product-quantity-controller.minus, .product-quantity-controller.plus').removeClass('disable');

      if (currentValue === minValue) {
        $('.product-quantity').find('.plus').removeClass('disable');
        $('.product-quantity').find('.minus').addClass('disable');
      } else if (currentValue === maxValue) {
        $('.product-quantity').find('.minus').removeClass('disable');
        $('.product-quantity').find('.plus').addClass('disable');
      }
    }

    setCheckoutQntControllers();

    var changeProdQuantity = function changeProdQuantity(e) {
      var $this = $(e.currentTarget);
      var quontuityInput = $this.closest('.product-quantity').find('input.qty');
      var maxValue = +quontuityInput.attr('max');
      var minValue = +quontuityInput.attr('min') === 0 ? 1 : +quontuityInput.attr('min');
      var currentValue = parseInt(quontuityInput.val(), 10);
      currentValue = isNaN(currentValue) ? 1 : currentValue;

      if (!$this.hasClass('disable')) {
        $this.closest('.product-quantity').find('.product-quantity-controller').removeClass('disable');

        if ($this.hasClass('minus')) {
          currentValue--;

          if (currentValue === minValue) {
            $this.addClass('disable');
          }
        } else if ($this.hasClass('plus')) {
          currentValue++;

          if (currentValue === maxValue) {
            $this.addClass('disable');
          }
        }

        quontuityInput.val(currentValue);
      }

      ;
    };

    $('body').on('click', '.product-quantity-controller', changeProdQuantity); // checkout forms tab

    $('.tabs-controller').click(function () {
      var $this = $(this);
      var tabId = $this.attr('data-tab');
      $this.closest('.tabs-controllers').children($('.tabs-controller')).not($this).removeClass('current');
      $this.closest('.tabs-controllers').next($('.tab-pane')).children($('.tab-content')).removeClass('current');
      $this.addClass('current');
      $(tabId).addClass('current');
    }); // bundle slider youtube video

    function initYoutubePreviews() {
      var youtube = $('.youtube').map(function () {
        return this;
      }).get();

      for (var i = 0; i < youtube.length; i++) {
        var source = 'https://img.youtube.com/vi/' + youtube[i].dataset.video + '/hqdefault.jpg';
        var image = new Image();
        image.src = source;
        image.setAttribute('class', 'product-slider-video');
        youtube[i].append(image);
      }

      ;
    }

    initYoutubePreviews();
    $('.product-slider .youtube').on('click', function () {
      var $this = $(this);
      $this.addClass('loaded');
      var vid = "<iframe src=\"https://www.youtube.com/embed/".concat(this.dataset.video, "?autoplay=1\" width=\"100%\" height=\"").concat(this.dataset.height, "\" frameborder=\"0\" allowfullscreen></iframe>");
      $this.html('');
      $this.html(vid);
    }); // error messages on register form

    $('.error-icon').click(function () {
      if ($(window).width() < 991) {
        $(this).toggleClass('active');
      }
    }); // aside account navigation top position

    function addNavTopPosition() {
      var position = $('.js-scroll-navbar-mobile').height();
      $('.woocommerce-MyAccount-navigation').css('top', position);
    }

    addNavTopPosition();
    $(document).on('load', addNavTopPosition);
    $(window).on('resize', addNavTopPosition); // account main content padding calculator

    function accountContentPadding() {
      if ($(window).width() > 991) {
        var windowWidth = $(window).width();
        var contentWidth = $('.woocommerce-MyAccount-content .container').width();
        var navWidth = $('.woocommerce-MyAccount-navigation').width();
        var distanceToTheEndOfWindow = (windowWidth - contentWidth) / 2;

        if (distanceToTheEndOfWindow < navWidth) {
          var change = Math.abs(navWidth - distanceToTheEndOfWindow);
          $('.woocommerce-MyAccount-content .container').css('padding-left', change + 40);
        }
      }
    }

    accountContentPadding();
    $(document).on('load', accountContentPadding);
    $(window).on('resize', accountContentPadding);

    function confirmationEditForm(e) {
      var $this = $(e.currentTarget);

      if ($this.hasClass('disable')) {
        return false;
      } else {
        $('.confirmation-user-details__list, .confirmation-user-details__form').toggleClass('active');
        $this.addClass('disable');
      }
    }

    $('body').on('click', '.js-confirmation-details-btn', confirmationEditForm); // bundle main screen animation

    $('.main-gallery').find('li').each(function (i) {
      var neely = $(window).width() > 991 ? 2000 * parseInt(i) : 4000 * parseInt(i);
      $(this).delay(neely).queue(function () {
        $(this).addClass('item');
      });
    });
    $('.featured-products, .special-deal-products').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: true
        }
      }]
    });
    $('.featured-sales-products, .hot-offers-products').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: true
        }
      }]
    }); // stor page feature slider height

    $('.special-deal-products-section .woocommerce-loop-product__title').each(function () {
      var $this = $(this);
      var title = $this.text();
      var titleMaxSize = 14;
      var titleLenght = title.length;

      if (titleLenght > titleMaxSize) {
        var newTitle = title.substr(0, titleMaxSize);
        $this.text(newTitle);
        $this.addClass('slised');
      }
    });
    $('.woocommerce-loop-product__title').each(function () {
      var $this = $(this);
      var title = $this.text();
      var titleMaxSize = 30;
      var titleLenght = title.length;

      if (titleLenght > titleMaxSize) {
        var newTitle = title.substr(0, titleMaxSize);
        $this.text(newTitle);
        $this.addClass('slised');
      }
    }); // shop page select placeholder

    setTimeout(function () {
      $('.berocket_single_filter_widget select[multiple]').each(function () {
        var $this = $(this);
        var pl = $this.data('placeholder');

        if (!$this.next('.select2-container').find('.select2-selection__rendered').find('li:first-child').hasClass('select2-selection__choice')) {
          $this.next('.select2-container').find('.select2-search__field').attr('placeholder', pl).css('width', '100%');
        }
      });
    }, 10);
    $(document).on('berocket_ajax_filtering_end', function () {
      $('.berocket_single_filter_widget select[multiple]').each(function () {
        var $this = $(this);
        var pl = $this.data('placeholder');

        if (!$this.next('.select2-container').find('.select2-selection__rendered').find('li:first-child').hasClass('select2-selection__choice')) {
          $this.next('.select2-container').find('.select2-search__field').attr('placeholder', pl).css('width', '100%');
        }
      });
    }); // bundle title charac limit

    $('.product-type-bundle .woocommerce-loop-product__title').each(function () {
      var $this = $(this);
      $this.removeClass('slised');
      var title = $this.text();
      var titleMaxSize = 27;
      var titleLenght = title.length;

      if (titleLenght > titleMaxSize) {
        var newTitle = title.substr(0, titleMaxSize) + '...';
        $this.text(newTitle);
      }
    });
    $('body').on('blur change', '.woocommerce-ResetPassword #user_login', function () {
      var wrapper = $(this).closest('.form-row');
      wrapper.removeClass('woocommerce-validated').removeClass('woocommerce-invalid'); // you do not have to removeClass() because Woo do it in checkout.js

      if ($(this).val() === '' || $(this).val() === undefined) {
        wrapper.addClass('woocommerce-invalid'); // error
      } else {
        $('.woocommerce-ResetPassword').find('.main-button').removeAttr('disabled');
        wrapper.addClass('woocommerce-validated'); // success
      }
    });
    $('.woocommerce-ResetPassword').on('submit', function (e) {
      var $form = $(this);
      $form.find('.input-text').trigger('validate').blur();

      if ($form.find('.woocommerce-invalid').length > 0) {
        e.preventDefault();
        return false;
      }
    });
  });
})(window.jQuery);

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/**
 * Color log message.
 * The log message created via this function won't be removed for production as well
 *
 * @param {*} arguments
 */
var log = function log() {
  var _console;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (_console = console).info.apply(_console, ['%c[DEBUG]', 'color: #ffaa00'].concat(args));
};

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1:
/*!*************************************************!*\
  !*** multi ./src/js/app.js ./src/scss/app.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/js/app.js */"./src/js/app.js");
module.exports = __webpack_require__(/*! ./src/scss/app.scss */"./src/scss/app.scss");


/***/ })

/******/ });