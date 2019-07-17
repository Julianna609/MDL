'use strict';

/**
 * Uncomment @babel/polyfill if you use some features from ES5+ (for IE11 compatibility)
 * E.g. Promise, Map, Set and so on
 */
// import '@babel/polyfill'

/**
 * Import utils
 */
import { log } from './utils';

/**
 * jQuery code
 */
($ => {
  $(document).ready(function () {
    log('Ready');

    let Popup = window.Popup;
    new Popup();

    // burger menu opening
    $('.js-burger-menu').click(function () {
      $(this).toggleClass('active');
      $('.js-menu').toggleClass('active');
      $('body').toggleClass('overflow-hidden');
    });

    $('.js-contact-widget').click(function () {
      $(this).toggleClass('opened');
    });

    // product descriptions accordion

    const initDescriptionAccodrion = () => {
      const showChar = $('window').width() > 991 ? 320 : 190; // How many characters are shown by default
      $('.js-review-description').each(function () {
        const content = $(this).html();

        if (content.length > showChar) {
          const c = content.substr(0, showChar);
          const h = content.substr(showChar, content.length - showChar);

          const html = `${c} <span class="morecontent"><span> ${h} </span><a href="#" class="show-more-button js-see-more">Show more . . .</a></span>`;

          $(this).html(html);
        }
      });
    };
    initDescriptionAccodrion();

    $('.js-see-more').click(function (e) {
      e.preventDefault();
      const $this = $(this);
      const moretext = `Show more . . .`;
      const lesstext = `Show less`;
      if ($this.hasClass('less')) {
        $this.removeClass('less');
        $this.html(moretext);
      } else {
        $this.addClass('less');
        $this.html(lesstext);
      }
      $this
        .parent()
        .prev()
        .css('display', 'inline');
      $this.prev().toggle();
    });

    // reviews load
    function reviewsLoad () {
      if ($('.reviews .review-item').length > 3) {
        $('.reviews .container').append(`<a href="/" class="review__see-more js-more-review">Показать еще отзывы</a>`);

        $('.reviews .review-item')
          .slice(0, 3)
          .css('display', 'flex');
        $('.js-more-review').on('click', function (e) {
          e.preventDefault();
          $('.reviews .review-item:hidden')
            .slice(0, 4)
            .css('display', 'flex');
        });
      } else {
        $('.reviews .review-item').css('display', 'flex');
      }
    }
    reviewsLoad();

    $('#comeback-trigger').mouseover(function () {
      if (typeof window.Cookies.get('exit') === 'undefined') {
        $.magnificPopup.open(
          {
            items: {
              src: '#comeback'
            },
            type: 'inline'
          },
          0
        );
        window.Cookies.set('exit', 1, { expires: 1 });
      }
    });
  });
})(window.jQuery);
