import { log } from './utils';

;($ => {
  $(document).ready(function () {
    log('Ready slideout');

    const data = window.bundle_items_popup_data;

    // collect all products on the page
    const toCollectProduct = () => {
      const collect = [];
      $('.bundled_item_optional').each(function () {
        const id = $(this).data('bundle-item-id');
        collect.push(id);
      });
      return collect;
    };
    const productCollect = toCollectProduct();

    /**
     * Main function which build all slideout
     *
     * @param {jQueryObject} item
     *  Bundle to be made slideout
     */
    const generateSlideout = item => {
      const $this = item;

      $('.bundled_item_optional').removeClass('current');
      $this.addClass('current');

      const productId = $this.data('bundle-item-id');
      const container = $this.siblings('.js-slideout-holder');
      const containerOrder = productId === productCollect[0] ? 'first' : productId === productCollect[productCollect.length - 1] ? 'last' : '';
      const productData = getProductData(productId, data);
      const productSlideout = renderProductSlideout(productData, containerOrder);

      topArrowPosition($this, container);
      insertSlideout(container, productSlideout);
      initDescAccodrion(container);
      setSlideoutOrder($this, container);
      scrollToCurrentSlideout($this);
    };

    const getProductData = (id, data = {}) => {
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
    const renderProductSlideout = (data, order) => {
      const galleryInit = () => {
        let arr = '';

        for (let i = 0; i < data.gallery.length; i++) {
          arr += `<img src="${data.gallery[i]}" alt="${data.title}"/>`;
        }

        for (let i = 0; i < data.video_ids.length; i++) {
          const video = `
            <div>
              <div class="youtube" data-video="${data.video_ids[i]}">
                <img src="https://img.youtube.com/vi/${data.video_ids[i]}/hqdefault.jpg" class="product-slider-video">
              </div>
            </div>
          `;
          arr += video;
        }

        return arr;
      };
      const gallery = galleryInit();
      return `
      <div>
          <div class="navigation-content left js-slideout-prev js-slideout-nav" style="${order === 'first' ? 'display:none;' : 'display:flex;'}">
              <span class="icon icon-arrow-left"></span>
          </div>
          <div class="navigation-content right js-slideout-next js-slideout-nav" style="${order === 'last' ? 'display:none;' : 'display:flex;'}">
              <span class="icon icon-arrow-right"></span>
          </div>
      </div>
      <div class="bundled__slideout-content">
        <div class="bundled__slideout-media js-slideout-media">
          <div class="slideout-slider">
            ${gallery}
          </div>
          <div class="slideout-slider-navigation">
            ${gallery}
          </div>
        </div>

        <div class="bundled__slideout-body js-slideout-body">
          <p class="item_title semi-bold">${data.title}</p>
          ${data.terms}
          <div class="description-text">
            ${data.description}
          </div>
        </div>
      </div>
      `;
    };

    /**
     * Initialization of slideout sliders
     *
     * @param {jQueryObject} main
     * @param {jQueryObject} navigation
     */
    const initSlideoutSliders = (main, navigation) => {
      const mainClass = main.attr('class').split(' ').join('.');
      const navigationClass = navigation.attr('class').split(' ').join('.');
      // main slider
      main.slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: `.${navigationClass}`
      });

      // navigation slider
      navigation.slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: `.${mainClass}`,
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
    const topArrowPosition = (element, container) => {
      const arrow = container.find('.js-slideout-arrow');
      const posX = element.offset().left;
      const elementWidth = element.outerWidth();
      const left = posX + (elementWidth / 2);
      arrow.css({ left: left });
    };

    /**
     * Insert generated slideout
     *
     * @param {jQueryObject} container
     *  Container to inset generated slideout
     * @param {String} html
     *  Generated string with slideout html
     */
    const insertSlideout = (container, html) => {
      $('.js-slideout-holder').not(container).hide();
      container.find('.js-slideout-content').html();

      container.find('.js-slideout-content').html(html);
      const mainSlider = container.find('.slideout-slider');
      const navSlider = container.find('.slideout-slider-navigation');
      initSlideoutSliders(mainSlider, navSlider);

      $('.slideout-slider .youtube').on('click', youtubeVideoLoader);

      container.show();
    };

    const youtubeVideoLoader = e => {
      const $this = $(e.target);
      $this.addClass('loaded');
      const vid = `<iframe src="https://www.youtube.com/embed/${$this.data('video')}?autoplay=1" width="100%" height="300" frameborder="0" allowfullscreen></iframe>`;
      $this.html('');
      $this.html(vid);
    };

    const slideoutClose = e => {
      const $this = $(e.target);
      $this.closest('.js-slideout-holder').hide();
    };

    $('body').on('click', '.js-slideout-close', slideoutClose);

    const slideoutNav = e => {
      const $this = $(e.currentTarget);
      const currentProd = $('.bundled_item_optional.current');
      const currentId = currentProd.data('bundle-item-id');
      let id = null;
      if ($this.hasClass('right')) {
        id = navigateSlide(currentId, 'next');
        const nextProduct = $(`.bundled_item_optional[data-bundle-item-id="${id}"]`);
        generateSlideout(nextProduct);
      } else {
        id = navigateSlide(currentId, 'prev');
        const prevProduct = $(`.bundled_item_optional[data-bundle-item-id="${id}"]`);
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
    const navigateSlide = (id, dir) => {
      const l = productCollect.length;
      let prev = '';
      let next = '';
      for (let i = 0; i < l; i++) {
        if (productCollect[i] === id) {
          prev = productCollect[i - 1];
          next = productCollect[i + 1];
        }
      }
      return dir === 'next' ? next : prev;
    };

    const setSlideout = e => {
      e.preventDefault();
      const current = $(e.currentTarget);
      generateSlideout(current);
    };

    const setBundlesOrder = item => {
      const containerWidth = $('.products-row').width();
      const bundleWidth = $('.bundled_product').width();
      const c = Math.floor(containerWidth / bundleWidth);

      $('.products-row').each(function () {
        let a = 0; // order to start
        const b = 2; // step for order
        const d = $(this).find('.bundled_product').length; // count items in container

        for (let i = 0; i <= d; i++) {
          $(`.products-row > .bundled_product:nth-child(${i})`).css('order', a);
          if (i !== 0 && i % c === 0) {
            a += b;
          };
        };
      });
    }; setBundlesOrder();

    $(window).on('resize', setBundlesOrder);

    /**
     * Init bundles order on each section
     * @param {jQueryObject} item
     *  Bundle to be made slideout
     * @param {jQueryObject} container
     *  Active slideout container
     */
    const setSlideoutOrder = (item, container) => {
      const currentItemOrder = item.css('order');
      container.css('order', currentItemOrder + 1);
    };

    /**
     * Initialization of the product`s description text
     *
     * @param {jQueryObject} container
     *  Active slideout container
     */
    const initDescAccodrion = container => {
      const showChar = 600; // How many characters are shown by default
      container.find('.description-text > p').each(function () {
        const content = $(this).html();

        if (content.length > showChar) {
          const c = content.substr(0, showChar);
          const h = content.substr(showChar, content.length - showChar);

          const html = `${c} <span class="morecontent"><span> ${h} </span><a href="#" data-name="" class="show-more-button js-slideout-more">Show more</a></span>`;

          $(this).html(html);
        }
      });
    };

    const moreDescr = e => {
      e.preventDefault();
      const $this = $(e.target);
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
      // $this.parent().prev().toggle();
      $this.prev().toggle();
    };

    $('body').on('click', '.js-slideout-more', moreDescr);

    /**
     * Guidance for screen when slideout position change
     *
     * @param {jQueryObject} slideout
     *  Bundle to be made slideout
     */
    const scrollToCurrentSlideout = slideout => {
      const target = slideout.closest('.products-row').find('.slideout-holder');
      const top = target.offset().top;
      const offset = $('.js-scroll-navbar-mobile').height();
      const speed = 600;
      $('html, body').stop().animate({
        scrollTop: (top - (offset + 50))
      }, speed);
    };

    // setting slideout event handlers
    $('.bundled_item_optional').on('click', setSlideout);
  });
})(window.jQuery);
