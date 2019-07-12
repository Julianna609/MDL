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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/bundle-slideout.js":
/*!***********************************!*\
  !*** ./src/js/bundle-slideout.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

;

(function ($) {
  $(document).ready(function () {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["log"])('Ready slideout');
    var data = window.bundle_items_popup_data; // collect all products on the page

    var toCollectProduct = function toCollectProduct() {
      var collect = [];
      $('.bundled_item_optional').each(function () {
        var id = $(this).data('bundle-item-id');
        collect.push(id);
      });
      return collect;
    };

    var productCollect = toCollectProduct();
    /**
     * Main function which build all slideout
     *
     * @param {jQueryObject} item
     *  Bundle to be made slideout
     */

    var generateSlideout = function generateSlideout(item) {
      var $this = item;
      $('.bundled_item_optional').removeClass('current');
      $this.addClass('current');
      var productId = $this.data('bundle-item-id');
      var container = $this.siblings('.js-slideout-holder');
      var containerOrder = productId === productCollect[0] ? 'first' : productId === productCollect[productCollect.length - 1] ? 'last' : '';
      var productData = getProductData(productId, data);
      var productSlideout = renderProductSlideout(productData, containerOrder);
      topArrowPosition($this, container);
      insertSlideout(container, productSlideout);
      initDescAccodrion(container);
      setSlideoutOrder($this, container);
      scrollToCurrentSlideout($this);
    };

    var getProductData = function getProductData(id) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return data[id];
    };
    /**
     * Generating slideout code to insert
     *
     * @param {Object} data
     *  All data about product
     * @param {String} order
     * Product order on the page: 'first', 'last'
     * @return
     * String to insert with slideout`s HTML
     */


    var renderProductSlideout = function renderProductSlideout(data, order) {
      var galleryInit = function galleryInit() {
        var arr = '';

        for (var i = 0; i < data.gallery.length; i++) {
          arr += "<img src=\"".concat(data.gallery[i], "\" alt=\"").concat(data.title, "\"/>");
        }

        for (var _i = 0; _i < data.video_ids.length; _i++) {
          var video = "\n            <div>\n              <div class=\"youtube\" data-video=\"".concat(data.video_ids[_i], "\">\n                <img src=\"https://img.youtube.com/vi/").concat(data.video_ids[_i], "/hqdefault.jpg\" class=\"product-slider-video\">\n              </div>\n            </div>\n          ");
          arr += video;
        }

        return arr;
      };

      var gallery = galleryInit();
      return "\n      <div>\n          <div class=\"navigation-content left js-slideout-prev js-slideout-nav\" style=\"".concat(order === 'first' ? 'display:none;' : 'display:flex;', "\">\n              <span class=\"icon icon-arrow-left\"></span>\n          </div>\n          <div class=\"navigation-content right js-slideout-next js-slideout-nav\" style=\"").concat(order === 'last' ? 'display:none;' : 'display:flex;', "\">\n              <span class=\"icon icon-arrow-right\"></span>\n          </div>\n      </div>\n      <div class=\"bundled__slideout-content\">\n        <div class=\"bundled__slideout-media js-slideout-media\">\n          <div class=\"slideout-slider\">\n            ").concat(gallery, "\n          </div>\n          <div class=\"slideout-slider-navigation\">\n            ").concat(gallery, "\n          </div>\n        </div>\n\n        <div class=\"bundled__slideout-body js-slideout-body\">\n          <p class=\"item_title semi-bold\">").concat(data.title, "</p>\n          ").concat(data.terms, "\n          <div class=\"description-text\">\n            ").concat(data.description, "\n          </div>\n        </div>\n      </div>\n      ");
    };
    /**
     * Initialization of slideout sliders
     *
     * @param {jQueryObject} main
     * @param {jQueryObject} navigation
     */


    var initSlideoutSliders = function initSlideoutSliders(main, navigation) {
      var mainClass = main.attr('class').split(' ').join('.');
      var navigationClass = navigation.attr('class').split(' ').join('.'); // main slider

      main.slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: ".".concat(navigationClass)
      }); // navigation slider

      navigation.slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: ".".concat(mainClass),
        focusOnSelect: true,
        responsive: [{
          breakpoint: 480,
          settings: {
            slidesToShow: 2
          }
        }]
      });
    };
    /**
     * Guidance of slideout top arrow
     *
     * @param {jQueryObject} element
     *  Target element
     * @param {jQueryObject} container
     *  Active slideout container
     */


    var topArrowPosition = function topArrowPosition(element, container) {
      var arrow = container.find('.js-slideout-arrow');
      var posX = element.offset().left;
      var elementWidth = element.outerWidth();
      var left = posX + elementWidth / 2;
      arrow.css({
        left: left
      });
    };
    /**
     * Insert generated slideout
     *
     * @param {jQueryObject} container
     *  Container to inset generated slideout
     * @param {String} html
     *  Generated string with slideout html
     */


    var insertSlideout = function insertSlideout(container, html) {
      $('.js-slideout-holder').not(container).hide();
      container.find('.js-slideout-content').html();
      container.find('.js-slideout-content').html(html);
      var mainSlider = container.find('.slideout-slider');
      var navSlider = container.find('.slideout-slider-navigation');
      initSlideoutSliders(mainSlider, navSlider);
      $('.slideout-slider .youtube').on('click', youtubeVideoLoader);
      container.show();
    };

    var youtubeVideoLoader = function youtubeVideoLoader(e) {
      var $this = $(e.target);
      $this.addClass('loaded');
      var vid = "<iframe src=\"https://www.youtube.com/embed/".concat($this.data('video'), "?autoplay=1\" width=\"100%\" height=\"300\" frameborder=\"0\" allowfullscreen></iframe>");
      $this.html('');
      $this.html(vid);
    };

    var slideoutClose = function slideoutClose(e) {
      var $this = $(e.target);
      $this.closest('.js-slideout-holder').hide();
    };

    $('body').on('click', '.js-slideout-close', slideoutClose);

    var slideoutNav = function slideoutNav(e) {
      var $this = $(e.currentTarget);
      var currentProd = $('.bundled_item_optional.current');
      var currentId = currentProd.data('bundle-item-id');
      var id = null;

      if ($this.hasClass('right')) {
        id = navigateSlide(currentId, 'next');
        var nextProduct = $(".bundled_item_optional[data-bundle-item-id=\"".concat(id, "\"]"));
        generateSlideout(nextProduct);
      } else {
        id = navigateSlide(currentId, 'prev');
        var prevProduct = $(".bundled_item_optional[data-bundle-item-id=\"".concat(id, "\"]"));
        generateSlideout(prevProduct);
      }
    };

    $('body').on('click', '.js-slideout-nav', slideoutNav);
    /**
     * Navigarion through the products on the page
     *
     * @param {Number} id
     *  Id of the current product in slideout
     * @param {String} dir
     *  Navigation direction: 'next', 'prev'
     * @return
     *  Id of the next product
     */

    var navigateSlide = function navigateSlide(id, dir) {
      var l = productCollect.length;
      var prev = '';
      var next = '';

      for (var i = 0; i < l; i++) {
        if (productCollect[i] === id) {
          prev = productCollect[i - 1];
          next = productCollect[i + 1];
        }
      }

      return dir === 'next' ? next : prev;
    };

    var setSlideout = function setSlideout(e) {
      e.preventDefault();
      var current = $(e.currentTarget);
      generateSlideout(current);
    };

    var setBundlesOrder = function setBundlesOrder(item) {
      var containerWidth = $('.products-row').width();
      var bundleWidth = $('.bundled_product').width();
      var c = Math.floor(containerWidth / bundleWidth);
      $('.products-row').each(function () {
        var a = 0; // order to start

        var b = 2; // step for order

        var d = $(this).find('.bundled_product').length; // count items in container

        for (var i = 0; i <= d; i++) {
          $(".products-row > .bundled_product:nth-child(".concat(i, ")")).css('order', a);

          if (i !== 0 && i % c === 0) {
            a += b;
          }

          ;
        }

        ;
      });
    };

    setBundlesOrder();
    $(window).on('resize', setBundlesOrder);
    /**
     * Init bundles order on each section
     * @param {jQueryObject} item
     *  Bundle to be made slideout
     * @param {jQueryObject} container
     *  Active slideout container
     */

    var setSlideoutOrder = function setSlideoutOrder(item, container) {
      var currentItemOrder = item.css('order');
      container.css('order', currentItemOrder + 1);
    };
    /**
     * Initialization of the product`s description text
     *
     * @param {jQueryObject} container
     *  Active slideout container
     */


    var initDescAccodrion = function initDescAccodrion(container) {
      var showChar = 600; // How many characters are shown by default

      container.find('.description-text > p').each(function () {
        var content = $(this).html();

        if (content.length > showChar) {
          var c = content.substr(0, showChar);
          var h = content.substr(showChar, content.length - showChar);
          var html = "".concat(c, " <span class=\"morecontent\"><span> ").concat(h, " </span><a href=\"#\" data-name=\"\" class=\"show-more-button js-slideout-more\">Show more</a></span>");
          $(this).html(html);
        }
      });
    };

    var moreDescr = function moreDescr(e) {
      e.preventDefault();
      var $this = $(e.target);
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

      ; // $this.parent().prev().toggle();

      $this.prev().toggle();
    };

    $('body').on('click', '.js-slideout-more', moreDescr);
    /**
     * Guidance for screen when slideout position change
     *
     * @param {jQueryObject} slideout
     *  Bundle to be made slideout
     */

    var scrollToCurrentSlideout = function scrollToCurrentSlideout(slideout) {
      var target = slideout.closest('.products-row').find('.slideout-holder');
      var top = target.offset().top;
      var offset = $('.js-scroll-navbar-mobile').height();
      var speed = 600;
      $('html, body').stop().animate({
        scrollTop: top - (offset + 50)
      }, speed);
    }; // setting slideout event handlers


    $('.bundled_item_optional').on('click', setSlideout);
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

/***/ 2:
/*!*****************************************!*\
  !*** multi ./src/js/bundle-slideout.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/bundle-slideout.js */"./src/js/bundle-slideout.js");


/***/ })

/******/ });