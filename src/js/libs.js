import jQuery from 'jquery';

// Enable popper.js and bootstrap if they are needed
// import 'popper.js'
// import 'bootstrap'

import 'slick-carousel';
import Cookies from 'js-cookie';
import 'magnific-popup';
const Form = require('../../moduls/forms/index');

window.Popup = function () {
  jQuery('.popup-btn').each(function (index, obj) {
    var $this = jQuery(obj);

    var settings = {};

    settings.type = 'inline';
    if ($this.data('type') !== '') {
      settings.type = $this.data('type');
    }

    if (settings.type === 'inline') {
      var slider = jQuery($this.data('mfp-src')).find('.slick-slider');

      if (slider.length) {
        settings.callbacks = {
          open: function () {
            slider.slick();
          }
        };
      }
    }

    $this.magnificPopup(settings);
  });
};

// Allow to use jQuery in a global scope
/* global */
window.jQuery = jQuery;
window.Cookies = Cookies;
window.Form = Form;
