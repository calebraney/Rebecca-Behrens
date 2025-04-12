import { attr, attrIfSet, checkBreakpoints, getClipDirection } from '../utilities';

export const loop = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'loop';
  //elements
  const ITEM = `[data-ix-loop="item"]`;
  //timeline options
  const EASE = 'data-ix-loop-ease';
  const DELAY = 'data-ix-loop-delay';
  const REPEAT_DELAY = 'data-ix-loop-repeat-delay';
  const YOYO = 'data-ix-loop-yoyo';
  //tween options
  const DURATION = 'data-ix-loop-duration';
  const X_START = 'data-ix-loop-x-start';
  const X_END = 'data-ix-loop-x-end';
  const Y_START = 'data-ix-loop-y-start';
  const Y_END = 'data-ix-loop-y-end';
  const SCALE_START = 'data-ix-loop-scale-start';
  const SCALE_END = 'data-ix-loop-scale-end';
  const SCALE_X_START = 'data-ix-loop-scale-x-start';
  const SCALE_X_END = 'data-ix-loop-scale-x-end';
  const SCALE_Y_START = 'data-ix-loop-scale-y-start';
  const SCALE_Y_END = 'data-ix-loop-scale-y-end';
  const WIDTH_START = 'data-ix-loop-width-start';
  const WIDTH_END = 'data-ix-loop-width-end';
  const HEIGHT_START = 'data-ix-loop-height-start';
  const HEIGHT_END = 'data-ix-loop-height-end';
  const ROTATE_X_START = 'data-ix-loop-rotate-x-start';
  const ROTATE_X_END = 'data-ix-loop-rotate-x-end';
  const ROTATE_Y_START = 'data-ix-loop-rotate-y-start';
  const ROTATE_Y_END = 'data-ix-loop-rotate-y-end';
  const ROTATE_Z_START = 'data-ix-loop-rotate-z-start';
  const ROTATE_Z_END = 'data-ix-loop-rotate-z-end';
  const OPACITY_START = 'data-ix-loop-opacity-start';
  const OPACITY_END = 'data-ix-loop-opacity-end';
  const RADIUS_START = 'data-ix-loop-radius-start';
  const RADIUS_END = 'data-ix-loop-radius-end';
  const CLIP_START = 'data-ix-loop-clip-start';
  const CLIP_END = 'data-ix-loop-clip-end';

  const items = [...document.querySelectorAll(ITEM)];
  items.forEach((item) => {
    // return if items are null
    if (!item) return;
    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(item, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;
    //create variables from GSAP context
    let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;

    //////////////////////
    // Adding tweens

    //objects for tween
    const varsFrom = {};
    const varsTo = { duration: 5 };
    let tl = gsap.timeline({
      defaults: {
        repeat: -1,
        ease: 'none',
      },
    });
    //add core properties
    varsTo.yoyo = attrIfSet(item, YOYO, false);
    varsTo.delay = attrIfSet(item, DELAY, 0);
    varsTo.repeatDelay = attrIfSet(item, REPEAT_DELAY, 0);
    varsTo.duration = attrIfSet(item, DURATION, 1);
    varsTo.ease = attrIfSet(item, EASE, 'none');
    //animatable properties
    varsFrom.x = attrIfSet(item, X_START, '0%');
    varsTo.x = attrIfSet(item, X_END, '0%');
    varsFrom.y = attrIfSet(item, Y_START, '0%');
    varsTo.y = attrIfSet(item, Y_END, '0%');
    varsFrom.scale = attrIfSet(item, SCALE_START, 1);
    varsTo.scale = attrIfSet(item, SCALE_END, 1);
    varsFrom.scaleX = attrIfSet(item, SCALE_X_START, 1);
    varsTo.scaleX = attrIfSet(item, SCALE_X_END, 1);
    varsFrom.scaleY = attrIfSet(item, SCALE_Y_START, 1);
    varsTo.scaleY = attrIfSet(item, SCALE_Y_END, 1);
    varsFrom.width = attrIfSet(item, WIDTH_START, '0%');
    varsTo.width = attrIfSet(item, WIDTH_END, '0%');
    varsFrom.height = attrIfSet(item, HEIGHT_START, '0%');
    varsTo.height = attrIfSet(item, HEIGHT_END, '0%');
    varsFrom.rotateX = attrIfSet(item, ROTATE_X_START, 0);
    varsTo.rotateX = attrIfSet(item, ROTATE_X_END, 0);
    varsFrom.rotateY = attrIfSet(item, ROTATE_Y_START, 0);
    varsTo.rotateY = attrIfSet(item, ROTATE_Y_END, 0);
    varsFrom.rotateZ = attrIfSet(item, ROTATE_Z_START, 0);
    varsTo.rotateZ = attrIfSet(item, ROTATE_Z_END, 0);
    varsFrom.opacity = attrIfSet(item, OPACITY_START, 0);
    varsTo.opacity = attrIfSet(item, OPACITY_END, 0);
    varsFrom.borderRadius = attrIfSet(item, RADIUS_START, 'string');
    varsTo.borderRadius = attrIfSet(item, RADIUS_END, 'string');
    //get clip path values (and allow keyword names light right, or full)
    const clipStart = attrIfSet(item, CLIP_START, 'left');
    const clipEnd = attrIfSet(item, CLIP_END, 'full');
    //convert keyword names into actual clip values
    varsFrom.clipPath = getClipDirection(clipStart);
    varsTo.clipPath = getClipDirection(clipEnd);

    //create tween
    let tween = tl.fromTo(item, varsFrom, varsTo);
  });
};
