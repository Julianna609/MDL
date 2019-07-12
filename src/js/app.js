'use strict';

/**
 * Uncomment @babel/polyfill if you use some features from ES5+ (for IE11 compatibility)
 * E.g. Promise, Map, Set and so on
 */
// import '@babel/polyfill'

/**
 * Import utils
 */
import { log } from './utils'

/**
 * jQuery code
 */
;($ => {
  $(document).ready(function () {
    log('Ready');

    // burger menu opening
    $('.js-burger-menu').click(function () {
      $(this).toggleClass('active');
      $('.js-menu').toggleClass('active');
      $('body').toggleClass('overflow-hidden');
    });
  });
})(window.jQuery);
