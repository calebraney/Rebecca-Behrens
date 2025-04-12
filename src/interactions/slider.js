// import Swiper from 'swiper';
// import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
//also import on index.js

//Curently uses the CDN Version of swiper, if you want to integrate swiper you'll need to configure modules manually
// Import Swiper and modules
// import Swiper from 'swiper';
// import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
// then you'll need to create a dynamic check for modules in the funciton and then include them in the swiper object
//  modules: [Navigation, Pagination, Scrollbar],

//Add CSS to the page head
// <!-- Swiper CSS -->
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>

export const createSlider = function (components, options, modules) {
  //Element selectors
  const SLIDER = '.swiper';
  const NEXT_BUTTON = '.swiper-next';
  const PREVIOUS_BUTTON = '.swiper-prev';
  const BULLET_WRAP = '.swiper-bullet-wrapper';
  const SCROLLBAR = '.swiper-scrollbar';
  const SCROLLBAR_DRAG = '.swiper-scrollbar-drag';
  //classes
  const ACTIVE_CLASS = 'is-active';
  const DISABLED_CLASS = 'is-disabled';
  const swipersArray = [];
  //loop through each component and create a swiper
  components.forEach(function (component) {
    //get elements
    if (!component) return;
    const slider = component.querySelector(SLIDER);
    if (!slider) return;
    //set the default settings
    const defaultSettings = {
      speed: 800,
      spaceBetween: 16,
      loop: false,
      centeredSlides: false,
      allowTouchMove: true,
      slideActiveClass: ACTIVE_CLASS,
      slideDuplicateActiveClass: ACTIVE_CLASS,
    };
    // setup module settings
    let finalModules = {};
    //NAVIGATION
    if (modules.navigation === true) {
      //get the navigation elements
      const nextButtonEl = component.querySelector(NEXT_BUTTON);
      const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
      //set the navigation settings
      const navigationSettings = {
        navigation: {
          nextEl: nextButtonEl,
          prevEl: previousButtonEl,
          disabledClass: DISABLED_CLASS,
        },
      };
      finalModules = { ...finalModules, ...navigationSettings };
    }
    //PAGINATION
    if (modules.pagination === true) {
      //get the pagination elements
      const bulletsEl = component.querySelector(BULLET_WRAP);
      //set the pagination settings
      const paginationSettings = {
        pagination: {
          type: 'bullets',
          el: bulletsEl,
          bulletActiveClass: ACTIVE_CLASS,
          bulletClass: 'swiper-bullet',
          bulletElement: 'button',
          clickable: true,
        },
      };
      finalModules = { ...finalModules, ...paginationSettings };
    }
    //SCROLLBAR
    if (modules.scrollbar === true) {
      //get the pagination elements
      const scrollbarEl = component.querySelector(SCROLLBAR);
      //set the pagination settings
      const scrollbarSettings = {
        scrollbar: {
          el: scrollbarEl,
          dragClass: SCROLLBAR_DRAG,
          draggable: true,
          dragSize: 'auto', //or set in number of pixels
          snapOnRelease: false,
        },
      };
      finalModules = { ...finalModules, ...scrollbarSettings };
    }
    //AUTOPLAY
    if (modules.autoplay === true) {
      //set the autoplay settings
      const autoplaySettings = {
        autoplay: {
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
          stopOnLastSlide: true,
        },
      };
      finalModules = { ...finalModules, ...autoplaySettings };
    }

    //combine all the settings
    const swiperSettings = { ...defaultSettings, ...finalModules, ...options };
    //create swiper
    const swiper = new Swiper(slider, swiperSettings);
    //push swiper to array for access
    swipersArray.push(swiper);
  });
  return swipersArray;
};
