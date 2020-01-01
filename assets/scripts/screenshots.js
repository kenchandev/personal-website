import { hasClass, addClass, removeClass, isPartiallyVisible } from "./utils";
import { SCREENSHOT_ATTRS } from "./enums";

export const getSvgElement = (modifier, viewportClass) => {
  return document.querySelector(
    `.experience.experience--${modifier} .${viewportClass} svg`
  );
};

export const renderScreenshot = (
  target,
  { imageUrl, attrs: { width, height, x, y } },
  onLoad
) => {
  let svgScreenshot = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image"
  );

  //  `onload` attribute does not fire within Safari.
  //  Create a "placeholder" image to ensure the execution of the `load` callback.
  //  https://stackoverflow.com/questions/35036672/trap-the-image-loading-event-on-an-svg-element-in-ie11

  let loader = target.parentElement.parentElement.parentElement.lastChild,
    previousScreenshot = target.querySelector("#Screenshot");

  if (loader.style.display === "none") {
    if (previousScreenshot) {
      previousScreenshot.remove();
    }

    loader.style.display = "block";
  }

  let placeholder = new Image();

  placeholder.addEventListener(
    "load",
    () => {
      svgScreenshot.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "href",
        imageUrl
      );
      svgScreenshot.setAttribute("id", "Screenshot");
      svgScreenshot.setAttribute("width", width);
      svgScreenshot.setAttribute("height", height);
      svgScreenshot.setAttribute("x", x);
      svgScreenshot.setAttribute("y", y);

      loader.style.display = "none";

      target.appendChild(svgScreenshot);
    },
    false
  );

  placeholder.src = imageUrl;
};

export const bindOnClickProjectFeatures = experiences => {
  let activeClass = "active",
    currentActiveElement = null;

  function loadFeatureScreenshot(browserElement, imageUrl, e) {
    if (window.innerWidth <= 479) return;

    let element = e.target;

    if (!hasClass(element, activeClass)) {
      if (currentActiveElement) {
        removeClass(currentActiveElement, activeClass);
      }
      addClass(element, activeClass);
      currentActiveElement = element;

      renderScreenshot(
        browserElement.getElementById(browserElement.dataset.targetId),
        {
          imageUrl,
          attrs: SCREENSHOT_ATTRS.BROWSER
        }
      );
    }
  }

  for (let { browser, projectFeatures } of experiences) {
    for (let { id, imageUrl } of projectFeatures) {
      document.getElementById(`pf-${id}`).addEventListener("click", e => {
        loadFeatureScreenshot(browser.element, imageUrl, e);
      });
    }
  }
};

export const observeLazyImages = callbacks => {
  let lazyImages = Array.from(
    document.querySelectorAll(
      ".experience .browser svg, .experience .mobile svg"
    )
  );

  let lazyImageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(({ isIntersecting, target, intersectionRatio }) => {
        if (isIntersecting) {
          callbacks[target.dataset.callback](target, target.dataset.targetId);

          lazyImageObserver.unobserve(target);
        }
      });
    },
    {
      threshold: 0
    }
  );

  lazyImages.forEach(lazyImage => {
    lazyImageObserver.observe(lazyImage);
  });
};

export const bindOnScrollLazyImages = (experiences, callbacks) => {
  function onScroll() {
    for (let experience of experiences) {
      let { browser, mobile } = experience;

      if (
        window.innerWidth <= 479 &&
        !mobile.isVisited &&
        isPartiallyVisible(mobile.element)
      ) {
        callbacks[mobile.element.dataset.callback](
          mobile.element,
          mobile.element.dataset.targetId
        );

        mobile.isVisited = true;
      } else if (
        window.innerWidth > 479 &&
        !browser.isVisited &&
        isPartiallyVisible(browser.element)
      ) {
        callbacks[browser.element.dataset.callback](
          browser.element,
          browser.element.dataset.targetId
        );

        browser.isVisited = true;
      }
    }
  }

  let isScrolling = false;

  function throttleScroll(e) {
    if (isScrolling === false) {
      window.requestAnimationFrame(() => {
        onScroll();
        isScrolling = false;
      });
    }

    isScrolling = true;
  }

  window.addEventListener("scroll", throttleScroll, false);
};
