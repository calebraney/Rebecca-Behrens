import { attr } from './utilities';
import { initLenis } from './interactions/lenis';
import { hoverActive } from './interactions/hover-active';
import { load } from './interactions/load';
import { loop } from './interactions/loop';
import { marquee } from './interactions/marquee';
import { parallax } from './interactions/parallax';
import { scrollIn } from './interactions/scroll-in';
import { scrolling } from './interactions/scrolling';
import { createSlider } from './interactions/slider';

document.addEventListener('DOMContentLoaded', function () {
  // Comment out for production
  console.log('Local Script');
  // register gsap plugins if available
  if (gsap.ScrollTrigger !== undefined) {
    gsap.registerPlugin(ScrollTrigger);
  }
  if (gsap.Flip !== undefined) {
    gsap.registerPlugin(Flip);
  }

  //////////////////////////////
  //Global Variables

  let lenis;

  //////////////////////////////
  //Slider instances

  //when alink is clicked in the nav menu close the menu
  const hideNavOnMobileClick = function () {
    const LINK = '.nav_links_link';
    const MENU = '.nav_btn_wrap';
    const ACTIVE_CLASS = 'w--open';
    const links = [...document.querySelectorAll(LINK)];
    const menuButton = document.querySelector(MENU);
    links.forEach((item) => {
      item.addEventListener('click', (e) => {
        // e.preventDefault();
        console.log('click');
        menuButton.click();
      });
    });
  };

  const caseGallerySlider = function () {
    const COMPONENT = '.slider_layout';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      loop: false,
    };
    //apply a module with defaults settings (canc override them using the options object above)
    const modules = {
      navigation: true,
      pagination: true,
      scrollbar: false,
      autoplay: false,
    };
    const sliders = createSlider(components, options, modules);
  };

  // const caseGallerySlider = function () {
  //   const COMPONENT = '.splide';
  //   const components = [...document.querySelectorAll(COMPONENT)];
  //   components.forEach((item) => {
  //     const slider = new Splide(item, {
  //       type: 'slide',
  //       perPage: 1,
  //     });
  //     console.log(slider);
  //   });
  // };
  //////////////////////////////
  //Custom Interactions

  const navShowAndHide = function (lenis) {
    //elements
    const NAV_DESKTOP = '[data-ix-nav="nav-desktop"]';
    const NAV_MOBILE = '[data-ix-nav="nav-mobile"]';
    const NAV_BG = '[data-ix-nav="bg"]';
    //classes
    const HIDDEN_CLASS = 'is-hidden';

    const navDesktop = document.querySelector(NAV_DESKTOP);
    const navMobile = document.querySelector(NAV_MOBILE);
    const navDesktopBg = navDesktop.querySelector(NAV_BG);
    const navMobileBg = navMobile.querySelector(NAV_BG);

    console.log(navDesktop, navMobile, navDesktopBg);
    if (!navDesktop || !navMobile) return;

    //variable to check last scroll distance
    let lastScrollTop = 0;

    function scrollDirectionListener() {
      //check the current scroll distance from the top
      let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop === 0) {
        //user is at the top of the page
        console.log('down');
        navDesktopBg.classList.add(HIDDEN_CLASS);
        navMobileBg.classList.add(HIDDEN_CLASS);
      } else {
        //user is not at the top of the page.
        navDesktopBg.classList.remove(HIDDEN_CLASS);
        navMobileBg.classList.remove(HIDDEN_CLASS);
      }

      //compare current scroll distance to last scroll distance
      if (currentScrollTop > lastScrollTop) {
        //user is scrolling down
        navDesktop.classList.add(HIDDEN_CLASS);
        navMobile.classList.add(HIDDEN_CLASS);
      } else {
        //user is scrolling up
        navDesktop.classList.remove(HIDDEN_CLASS);
        navMobile.classList.remove(HIDDEN_CLASS);
      }
      // For Mobile or negative scrolling
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }
    window.addEventListener('scroll', scrollDirectionListener);
    // lenis.on('scroll', (e) => {
    //   scrollDirectionListener();
    // });
  };

  const navLinkHover = function () {
    const NAV_LINK = '[data-ix-navhover="item"]';
    const NAV_LINK_BG = '[data-ix-navhover="bg"]';
    const NAV_MENU = '[data-ix-navhover="menu"].is-desktop';
    //options
    const ACTIVE_CLASS = 'is-active';

    const bg = document.querySelector(NAV_LINK_BG);
    const menu = document.querySelector(NAV_MENU);
    const links = menu.querySelectorAll(NAV_LINK);
    //check for elements
    if (!bg || !menu || links.length === 0) return;

    // hover menu tracking
    let lastItem = links[0];
    // hover menu tracking
    let menuHover = false;

    //function to handle events
    const activateLink = function (item, hoverIn = true) {
      lastItem = item;
      //if hover in append the background and add active classes
      if (hoverIn) {
        //get state
        let state = Flip.getState([links, bg], {
          props: 'backgroundColor,color',
          simple: false,
        });
        //append background and add active classes
        item.append(bg);
        bg.classList.add(ACTIVE_CLASS);
        links.forEach((link) => {
          if (link === item) {
            link.classList.add(ACTIVE_CLASS);
          } else {
            link.classList.remove(ACTIVE_CLASS);
          }
        });
        // animate
        Flip.from(state, {
          duration: menuHover ? 0.6 : 0,
          ease: 'power2.out',
        });
      } else {
        //hover out
        let state = Flip.getState([links, bg], {
          props: 'backgroundColor,color',
          simple: false,
        });
        //append background and add active classes
        item.append(bg);
        bg.classList.remove(ACTIVE_CLASS);
        links.forEach((link) => {
          link.classList.remove(ACTIVE_CLASS);
        });
        // animate
        Flip.from(state, {
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };
    menu.addEventListener('mouseenter', function () {
      menuHover = true;
    });
    menu.addEventListener('mouseleave', function () {
      menuHover = false;
      // get the last link in the list
      bg.classList.remove(ACTIVE_CLASS);
      activateLink(lastItem, false);
      //animate to the last link in the list on hover out of the menu
      // activateLink(lastLink);
    });
    //link hover and flip
    links.forEach((item) => {
      item.addEventListener('mouseover', function () {
        activateLink(item);
      });
    });
  };

  const homeWork = function () {
    const SECTION = '[data-ix-work="wrap"]';
    const ITEM = '[data-ix-work="item"]';
    const LINKS = '[data-ix-work="link"]';

    //elements
    const wraps = [...document.querySelectorAll(SECTION)];
    if (wraps.length === 0) return;

    //for each section
    wraps.forEach((wrap) => {
      const items = [...wrap.querySelectorAll(ITEM)];

      items.forEach((item, i) => {
        if (!item) return;

        let nextItem = items[i + 1];
        if (!nextItem) return;
        let tl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: 'power2.out',
          },
          scrollTrigger: {
            trigger: nextItem,
            start: 'top 100%',
            end: 'top 48px',
            scrub: true,
          },
        });
        tl.fromTo(
          item,
          {
            scale: 1,
          },
          {
            scale: 0.9,
          }
        );
        // tl.fromTo(
        //   item,
        //   {
        //     filter: 'blur(0px)',
        //   },
        //   {
        //     filter: 'blur(12px)',
        //     ease: 'circ.out',
        //     duration: 0.6,
        //   },
        //   '<.4'
        // );
      });
    });
  };

  //////////////////////////////
  //Control Functions on page load
  const gsapInit = function () {
    let mm = gsap.matchMedia();
    mm.add(
      {
        //This is the conditions object
        isMobile: '(max-width: 767px)',
        isTablet: '(min-width: 768px)  and (max-width: 991px)',
        isDesktop: '(min-width: 992px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (gsapContext) => {
        let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;
        //functional interactions
        // lenis = initLenis();
        navShowAndHide();
        navLinkHover();
        hoverActive(gsapContext);
        marquee(gsapContext);
        load(gsapContext);
        loop(gsapContext);
        if (isDesktop) {
          homeWork();
        }
        //sliders
        hideNavOnMobileClick();
        caseGallerySlider();
        //conditional interactions
        if (!reduceMotion) {
          scrollIn(gsapContext);
          scrolling(gsapContext);
        }
      }
    );
  };
  gsapInit();

  //reset gsap on click of reset triggers
  const scrollReset = function () {
    //selector
    const RESET_EL = '[data-ix-reset]';
    //time option
    const RESET_TIME = 'data-ix-reset-time';
    const resetScrollTriggers = document.querySelectorAll(RESET_EL);
    resetScrollTriggers.forEach(function (item) {
      item.addEventListener('click', function (e) {
        //reset scrolltrigger
        ScrollTrigger.refresh();
        //if item has reset timer reset scrolltriggers after timer as well.
        if (item.hasAttribute(RESET_TIME)) {
          let time = attr(1000, item.getAttribute(RESET_TIME));
          //get potential timer reset
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, time);
        }
      });
    });
  };
  scrollReset();
});
