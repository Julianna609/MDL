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
    $('.js-mobile-menu-toggle').click(function () {
      $(this).toggleClass('active');
      $('.js-mobile-menu').toggleClass('active');
      $('body').toggleClass('overflow-hidden');
    });

    // mobile search-form behavior
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

    function addHomePadding () {
      const padding = $('.js-scroll-navbar-mobile').height();
      $('.home-section').css('padding-top', padding);
    } addHomePadding();
    $(document).on('load', addHomePadding);
    $(window).on('resize', addHomePadding);

    function homeHeaderScroll () {
      const height = $(window).scrollTop();
      if (height > 1) {
        $('.page-template-home .site-header').addClass('bg');
      } else {
        $('.page-template-home .site-header').removeClass('bg');
      }
    };
    $(window).on('scroll', homeHeaderScroll);
    // $('.js-mobile-search-open').click(function () {
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
    let prevScrollpos = $(window).pageYOffset;
    function navBarsScrollBehavior () {
      const currentScrollPos = window.pageYOffset;
      $('.js-scroll-navbar-mobile').each(function () {
        const $this = $(this);
        const position = $this.data('navbar-position');
        const height = $this.outerHeight();
        if (prevScrollpos > currentScrollPos || currentScrollPos < 100) {
          $this.css(position, '0px');
        } else {
          $this.css(position, -height);
        };
      });
      prevScrollpos = currentScrollPos;
    };
    $(window).on('scroll', () => {
      if ($(window).width() < 991) {
        navBarsScrollBehavior();
      }
    });

    $('.dropdown-menu > a').click(function (e) {
      e.preventDefault();
    });

    $('.dropdown-menu').click(function (e) {
      const $this = $(this);

      $('.dropdown-menu').not($this).removeClass('active') && $('.dropdown-menu').not($this).find('.sub-menu').removeClass('active');

      $this.toggleClass('active') && $this.find('.sub-menu').toggleClass('active');

      const isOpen = $this.closest('.primary-navigation').find('.dropdown-menu.active')[0];

      const arrow = $('.triangle-icon');
      isOpen !== undefined ? arrow.addClass('active') : arrow.removeClass('active');
      const posX = $this.offset().left;
      const elementWidth = $this.width();
      const left = posX + elementWidth - 15;
      arrow.css({ left: left });

      if ($(window).width() < 991) {
        $('.js-scroll-navbar-mobile').toggleClass('uplift');
        $('body').toggleClass('overflow-hidden');
      };
    });

    $('.bundles.menu-item').click(function (e) {
      e.preventDefault();
      const $this = $(this);

      $this.toggleClass('active') && $('.bundle-menu').toggleClass('active');
      $('body').toggleClass('overflow-hidden');

      if ($(window).width() < 991) {
        // const navbarHeight = $('.main-navigation.js-scroll-navbar-mobile').height();
        const headerHeight = $('.site-header.js-scroll-navbar-mobile').height();
        // log(navbarHeight, headerHeight);
        const height = `calc(100vh - ${headerHeight}px)`;
        $('.bundle-menu').css('height', height);
        $('.js-scroll-navbar-mobile').toggleClass('uplift');
      };
    });

    //  Purchase bundle: form payment buttons
    $('.payment-buttons .btn').click(function (e) {
      $('.payment-buttons .btn.active').not(this).removeClass('active');
      $(this).toggleClass('active');

      if ($(this).hasClass('btn-custom-payment')) {
        $('.purchase-bundle-block__container .input-payment-wrp').toggleClass('field-hidden');
      } else {
        $('.input-payment-wrp').addClass('field-hidden');
      }
    });

    // Purchase bundle: prevent submit on enter
    $('.bundle_form.cart').keydown(function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });

    $('.bundle_add_to_cart_button').on('click', checkEmptyBundleForm);

    function checkEmptyBundleForm (e) {
      if ($('.payment-buttons .btn.active')[0] && !$('.input-payment').hasClass('invalid')) {
        return;
      } else {
        e.preventDefault();
        const buttonsCollection = collectPaymentButtons();
        const theLowestPrice = buttonsCollection[0];
        const message = window.warning_translate_text_first
          .replace('[ins_1]', `${theLowestPrice}`)
          .replace('[ins_2]', `${theLowestPrice}`)
          .replace('[ins_3]', `${theLowestPrice}`);

        const warning = `<div class="purchase-bundle__warning-text warrning-1">${message}</div>`;
        $('.purchase-bundle__warning-container').html('');
        $('.purchase-bundle__warning-container').append(warning);
        $('.js-purchase-bundle__warning-add').on('click', increasePayment);
      };
    };

    // Purchase bundle: warning messages

    $('.payment-buttons .btn').on('click', insertWarningMessage);

    function insertWarningMessage (e, value = null) {
      const $this = $(this);
      const $thisValue = value ? value : $this.data('product-price');
      const buttonsCollection = collectPaymentButtons();
      $('.purchase-bundle__warning-container').html('');

      buttonsCollection.map(function (value) {
        if ($thisValue < value) {
          const message = window.warning_translate_text_second
            .replace('[ins_1]', `${value}`)
            .replace('[ins_2]', `${value - $thisValue}`)
            .replace('[ins_3]', `${value}`)
            .replace('[ins_4]', `${value - $thisValue}`);

          const warning = `<div class="purchase-bundle__warning-text warrning-1">${message}</div>`;
          return $('.purchase-bundle__warning-container').append(warning);
        };
      });
      $('.js-purchase-bundle__warning-add').on('click', increasePayment);
    }

    function increasePayment (e) {
      e.preventDefault();
      const dataPrice = $(this).data('product-price');
      const buttonSelector = `.btn-payment[data-product-price='${dataPrice}']`;
      $(buttonSelector).click();
    };

    function collectPaymentButtons () {
      let paymentButtonsArray = [];
      $('.payment-buttons .btn-payment').each(function () {
        const dataPrice = $(this).data('product-price');
        paymentButtonsArray.push(dataPrice);
      });
      return paymentButtonsArray;
    }; collectPaymentButtons();

    // show warning message on custom amount
    $('.input-payment').on('blur', function (e) {
      const value = Number($(this).val());
      insertWarningMessage(e, value);
      $(this).removeClass('invalid');
      if (value === 0) {
        $(this).addClass('invalid');
      }
    });

    // product descriptions accordion

    const initDescriptionAccodrion = () => {
      const showChar = 486;// How many characters are shown by default
      $('.description-text > p').each(function () {
        const content = $(this).html();

        if (content.length > showChar) {
          const c = content.substr(0, showChar);
          const h = content.substr(showChar, content.length - showChar);

          const html = `${c} <span class="morecontent"><span> ${h} </span><a href="#" data-name="" class="show-more-button">Show more</a></span>`;

          $(this).html(html);
        }
      });
    }; initDescriptionAccodrion();

    const initRequirementsAccodrion = () => {
      const showChar = 7;// How many lines are shown by default
      if ($('.system-requirements-list li').length > showChar) {
        $(`.system-requirements-list li:gt(${showChar})`).hide();
        $('.system-requirements-list').append('<li><a href="#" data-name="system requirements " class="show-more-button small-in-mobile">Show more system requirements</a></li>');
      }
    }; initRequirementsAccodrion();

    $('.show-more-button').click(function (e) {
      e.preventDefault();
      const $this = $(this);
      const button = $this.data('name');
      const moretext = `Show more ${button}`;
      const lesstext = `Show less ${button}`;
      if ($this.hasClass('less')) {
        $this.removeClass('less');
        $this.html(moretext);
      } else {
        $this.addClass('less');
        $this.html(lesstext);
      };
      $this.parent().prev().toggle();
      $this.prev().toggle();
    });

    const initProductSliders = () => {
      // main product slider
      $('.product-slider .woocommerce-product-gallery__wrapper').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.product-slider-navigation__container'
      });

      // navigation slider
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
    }, 500);

    // smooth scroll to element
    $('.go-to').click(function (e) {
      e.preventDefault();
      const offset = $(window).width() > 991 ? 150 : 50;
      const speed = 600;
      const destination = $(this).data('destination');
      $('html, body').animate({
        scrollTop: $(`${destination}`).offset().top - offset
      }, speed);
    });

    // checkout page: product quantity controllers

    function setCheckoutQntControllers () {
      const quontuityInput = $('.product-quantity input.qty');
      let currentValue = parseInt(quontuityInput.val(), 10);
      const maxValue = +quontuityInput.attr('max');
      const minValue = +quontuityInput.attr('min') === 0 ? 1 : +quontuityInput.attr('min');

      $('.product-quantity-controller.minus, .product-quantity-controller.plus').removeClass('disable');

      if (currentValue === minValue) {
        $('.product-quantity').find('.plus').removeClass('disable');
        $('.product-quantity').find('.minus').addClass('disable');
      } else if (currentValue === maxValue) {
        $('.product-quantity').find('.minus').removeClass('disable');
        $('.product-quantity').find('.plus').addClass('disable');
      }
    } setCheckoutQntControllers();

    const changeProdQuantity = e => {
      const $this = $(e.currentTarget);
      const quontuityInput = $this.closest('.product-quantity').find('input.qty');
      const maxValue = +quontuityInput.attr('max');
      const minValue = +quontuityInput.attr('min') === 0 ? 1 : +quontuityInput.attr('min');
      let currentValue = parseInt(quontuityInput.val(), 10);

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
      };
    };

    $('body').on('click', '.product-quantity-controller', changeProdQuantity);

    // checkout forms tab
    $('.tabs-controller').click(function () {
      const $this = $(this);
      const tabId = $this.attr('data-tab');
      $this.closest('.tabs-controllers').children($('.tabs-controller')).not($this).removeClass('current');
      $this.closest('.tabs-controllers').next($('.tab-pane')).children($('.tab-content')).removeClass('current');
      $this.addClass('current');
      $(tabId).addClass('current');
    });

    // bundle slider youtube video

    function initYoutubePreviews () {
      const youtube = $('.youtube').map(function () {
        return this;
      }).get();

      for (let i = 0; i < youtube.length; i++) {
        const source = 'https://img.youtube.com/vi/' + youtube[i].dataset.video + '/hqdefault.jpg';

        const image = new Image();
        image.src = source;
        image.setAttribute('class', 'product-slider-video');
        youtube[i].append(image);
      };
    } initYoutubePreviews();

    $('.product-slider .youtube').on('click', function () {
      const $this = $(this);
      $this.addClass('loaded');
      const vid = `<iframe src="https://www.youtube.com/embed/${this.dataset.video}?autoplay=1" width="100%" height="${this.dataset.height}" frameborder="0" allowfullscreen></iframe>`;
      $this.html('');
      $this.html(vid);
    });

    // error messages on register form
    $('.error-icon').click(function () {
      if ($(window).width() < 991) {
        $(this).toggleClass('active');
      }
    });

    // aside account navigation top position
    function addNavTopPosition () {
      const position = $('.js-scroll-navbar-mobile').height();
      $('.woocommerce-MyAccount-navigation').css('top', position);
    } addNavTopPosition();
    $(document).on('load', addNavTopPosition);
    $(window).on('resize', addNavTopPosition);

    // account main content padding calculator
    function accountContentPadding () {
      if ($(window).width() > 991) {
        const windowWidth = $(window).width();
        const contentWidth = $('.woocommerce-MyAccount-content .container').width();
        const navWidth = $('.woocommerce-MyAccount-navigation').width();
        const distanceToTheEndOfWindow = (windowWidth - contentWidth) / 2;

        if (distanceToTheEndOfWindow < navWidth) {
          const change = Math.abs(navWidth - distanceToTheEndOfWindow);
          $('.woocommerce-MyAccount-content .container').css('padding-left', change + 40);
        }
      }
    } accountContentPadding();
    $(document).on('load', accountContentPadding);
    $(window).on('resize', accountContentPadding);

    function confirmationEditForm (e) {
      const $this = $(e.currentTarget);
      if ($this.hasClass('disable')) {
        return false;
      } else {
        $('.confirmation-user-details__list, .confirmation-user-details__form').toggleClass('active');
        $this.addClass('disable');
      }
    }
    $('body').on('click', '.js-confirmation-details-btn', confirmationEditForm);

    // bundle main screen animation
    $('.main-gallery').find('li').each(function (i) {
      const neely = $(window).width() > 991 ? 2000 * parseInt(i) : 4000 * parseInt(i);
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
    });

    // stor page feature slider height
    $('.special-deal-products-section .woocommerce-loop-product__title').each(function () {
      const $this = $(this);
      const title = $this.text();
      const titleMaxSize = 14;
      const titleLenght = title.length;
      if (titleLenght > titleMaxSize) {
        const newTitle = title.substr(0, titleMaxSize);
        $this.text(newTitle);
        $this.addClass('slised');
      }
    });

    $('.woocommerce-loop-product__title').each(function () {
      const $this = $(this);
      const title = $this.text();
      const titleMaxSize = 30;
      const titleLenght = title.length;
      if (titleLenght > titleMaxSize) {
        const newTitle = title.substr(0, titleMaxSize);
        $this.text(newTitle);
        $this.addClass('slised');
      }
    });

    // shop page select placeholder

    setTimeout(function () {
      $('.berocket_single_filter_widget select[multiple]').each(function () {
        const $this = $(this);
        const pl = $this.data('placeholder');

        if (!$this.next('.select2-container').find('.select2-selection__rendered').find('li:first-child').hasClass('select2-selection__choice')) {
          $this.next('.select2-container').find('.select2-search__field').attr('placeholder', pl).css('width', '100%');
        }
      });
    }, 10);

    $(document).on('berocket_ajax_filtering_end', function () {
      $('.berocket_single_filter_widget select[multiple]').each(function () {
        const $this = $(this);
        const pl = $this.data('placeholder');

        if (!$this.next('.select2-container').find('.select2-selection__rendered').find('li:first-child').hasClass('select2-selection__choice')) {
          $this.next('.select2-container').find('.select2-search__field').attr('placeholder', pl).css('width', '100%');
        }
      });
    });

    // bundle title charac limit
    $('.product-type-bundle .woocommerce-loop-product__title').each(function () {
      const $this = $(this);

      $this.removeClass('slised');

      const title = $this.text();
      const titleMaxSize = 27;
      const titleLenght = title.length;
      if (titleLenght > titleMaxSize) {
        const newTitle = title.substr(0, titleMaxSize) + '...';
        $this.text(newTitle);
      }
    });

    $('body').on('blur change', '.woocommerce-ResetPassword #user_login', function () {
      var wrapper = $(this).closest('.form-row');
      wrapper.removeClass('woocommerce-validated').removeClass('woocommerce-invalid');

      // you do not have to removeClass() because Woo do it in checkout.js
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
