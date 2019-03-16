import { SCREENSHOT_ATTRS } from "./enums";
import { getSvgElement, renderScreenshot } from "./screenshots";

export default class Experience {
  constructor(
    modifier,
    browserHomepagePng,
    mobileHomepagePng,
    projectFeatures
  ) {
    this.browser = {
      element: getSvgElement(modifier, "browser"),
      homepagePng: browserHomepagePng,
      isVisited: false
    };

    this.mobile = {
      element: getSvgElement(modifier, "mobile"),
      homepagePng: mobileHomepagePng,
      isVisited: false
    };

    this.projectFeatures = projectFeatures;

    //  Mapping `renderHomepage` method to render callback.
    //  Preserve correct context.
    this.renderHomepage = this.renderHomepage.bind(this);
  }

  renderHomepage(svgElement, targetId, onLoad) {
    renderScreenshot(
      svgElement.getElementById(targetId),
      {
        Browser: {
          imageUrl: this.browser.homepagePng,
          attrs: SCREENSHOT_ATTRS.BROWSER
        },
        Mobile: {
          imageUrl: this.mobile.homepagePng,
          attrs: SCREENSHOT_ATTRS.MOBILE
        }
      }[targetId],
      onLoad
    );
  }
}
