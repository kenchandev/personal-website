export const hasClass = (element, targetClass) =>
  !!element.className.match(new RegExp(`(\\s|^)${targetClass}(\\s|$)`));

export const addClass = (element, newClass) => {
  if (!hasClass(element, newClass)) {
    element.className = element.className
      ? `${element.className.trim()} ${newClass}`
      : newClass;
  }
};

export const removeClass = (element, targetClass) => {
  if (hasClass(element, targetClass)) {
    element.className = element.className
      .replace(new RegExp(`(\\s|^)${targetClass}(\\s|$)`), " ")
      .trim();

    if (!element.className) {
      element.removeAttribute("class");
    }
  }
};

export const isFullyVisible = element => {
  let { top, bottom } = element.getBoundingClientRect();

  return top >= 0 && bottom <= window.innerHeight;
};

export const isPartiallyVisible = element => {
  let { top, bottom, height } = element.getBoundingClientRect();

  return top + height >= 0 && height + window.innerHeight >= bottom;
};

/**
 * Scroll smoothly to a specific scroll offset.
 * Source: https://gist.github.com/joshcanhelp/a3a669df80898d4097a1e2c01dea52c1
 */
export const smoothScrollTo = (scrollTo, scrollDuration) => {
  if (typeof scrollTo === "string") {
    let scrollToObj = document.querySelector(scrollTo);

    if (
      scrollToObj &&
      typeof scrollToObj.getBoundingClientRect === "function"
    ) {
      scrollTo = window.pageYOffset + scrollToObj.getBoundingClientRect().top;
    } else {
      throw `Error: No element found with the selector "${scrollTo}."`;
    }
  } else if (typeof scrollTo !== "number") {
    scrollTo = 0;
  }

  let anchorHeightAdjust = 30;

  if (scrollTo > anchorHeightAdjust) {
    scrollTo = scrollTo - anchorHeightAdjust;
  }

  if (typeof scrollDuration !== "number" || scrollDuration < 0) {
    scrollDuration = 1000;
  }

  let cosParameter = (window.pageYOffset - scrollTo) / 2,
    scrollCount = 0,
    oldTimestamp = window.performance.now();

  const step = newTimestamp => {
    let tsDiff = newTimestamp - oldTimestamp;

    if (tsDiff > 100) {
      tsDiff = 30;
    }

    scrollCount += Math.PI / (scrollDuration / tsDiff);

    if (scrollCount >= Math.PI) {
      return;
    }

    let moveStep = Math.round(
      scrollTo + cosParameter + cosParameter * Math.cos(scrollCount)
    );

    window.scrollTo(0, moveStep);
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
};
