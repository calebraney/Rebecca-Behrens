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

  const navShowAndHide = function () {
    //elements
    const NAV = '[data-ix-nav="nav"]';
    const NAV_BG = '[data-ix-nav="bg"]';
    //classes
    const HIDDEN_CLASS = 'is-hidden';

    const nav = document.querySelector(NAV);
    const navBg = document.querySelector(NAV_BG);
    if (!nav || !navBg) return;

    //variable to check last scroll distance
    let lastScrollTop = 0;

    function scrollDirectionListener() {
      //check the current scroll distance from the top
      let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      //compare current scroll distance to last scroll distance
      if (currentScrollTop > lastScrollTop) {
        //user is scrolling down
        nav.classList.add(HIDDEN_CLASS);
      } else {
        //user is scrolling up
        nav.classList.remove(HIDDEN_CLASS);
      }

      if (currentScrollTop === 0) {
        //user is at the top of the page
        navBg.classList.add(HIDDEN_CLASS);
      } else {
        //user is not at the top of the page.
        navBg.classList.remove(HIDDEN_CLASS);
      }
      // For Mobile or negative scrolling
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }
    window.addEventListener('scroll', scrollDirectionListener);
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

    //function to handle events
    const activateLink = function (item, hoverIn = true) {
      //if hover in append the background and add active classes
      if (hoverIn) {
        //get state
        let state = Flip.getState([links, bg], {
          props: 'backgroundColor,color',
          simple: true,
        });
        //append background and add active classes
        item.append(bg);
        links.forEach((link) => {
          if (link === item) {
            link.classList.add(ACTIVE_CLASS);
          } else {
            link.classList.remove(ACTIVE_CLASS);
          }
        });
        // animate
        Flip.from(state, {
          duration: 0.6,
          ease: 'power2.out',
        });
      } else {
        //if hover out remove active class
        item.classList.remove(ACTIVE_CLASS);
      }
    };
    menu.addEventListener('mouseleave', function () {
      // get the last link in the list
      const lastLink = links[links.length - 1];
      //animate to the last link in the list on hover out of the menu
      activateLink(lastLink);
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
            end: 'top 112px',
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
        lenis = initLenis();
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
