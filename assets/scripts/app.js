import * as OfflinePluginRuntime from "offline-plugin/runtime";

import "focus-visible";

import CivicGraphDesktopHomepagePng from "../images/experiences/civic-graph/desktop/homepage.png";
import SmartAlecDesktopHomepagePng from "../images/experiences/smart-alec/desktop/homepage.png";
import CivicGraphMobileHomepagePng from "../images/experiences/civic-graph/mobile/homepage.png";
import SmartAlecMobileHomepagePng from "../images/experiences/smart-alec/mobile/homepage.png";

import SchedulerPng from "../images/experiences/smart-alec/desktop/scheduler.png";
import ChatClientPng from "../images/experiences/smart-alec/desktop/chat-client.png";
import BookingProcessPng from "../images/experiences/smart-alec/desktop/booking.png";
import TimeZonesPng from "../images/experiences/smart-alec/desktop/time-zones.png";
import TutorProfilePng from "../images/experiences/smart-alec/desktop/tutor-profile.png";

import {
  bindOnClickProjectFeatures,
  observeLazyImages,
  bindOnScrollLazyImages
} from "./screenshots";
import Form from "./form";
import Modal from "./modal";
import Experience from "./experience";
import BackToTopLink from "./back-to-top-link";

let modal = new Modal();

let backToTopLink = new BackToTopLink(".back-to-top", "skip-content", "top");

let contactForm = new Form(".form.form--contact", "submit", modal);

let civicGraph = new Experience(
  "msft",
  CivicGraphDesktopHomepagePng,
  CivicGraphMobileHomepagePng,
  []
);

let smartAlec = new Experience(
  "smart-alec",
  SmartAlecDesktopHomepagePng,
  SmartAlecMobileHomepagePng,
  [
    {
      id: "advanced-scheduler",
      imageUrl: SchedulerPng
    },
    {
      id: "chat-client",
      imageUrl: ChatClientPng
    },
    {
      id: "booking-process",
      imageUrl: BookingProcessPng
    },
    {
      id: "time-zones",
      imageUrl: TimeZonesPng
    },
    {
      id: "tutor-profile",
      imageUrl: TutorProfilePng
    }
  ]
);

let experiences = [civicGraph, smartAlec];

const callbacks = {
  renderCivicGraphHomepage: civicGraph.renderHomepage,
  renderSmartAlecHomepage: smartAlec.renderHomepage
};

//  `getBoundingClientRect()` and `window.innerHeight` causes synchronous, expensive calculations. (reflow or layout thrashing)
//  More Information: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
//  Avoid large polyfill for `IntersectionObserver` and `Array.from()`.
//  https://github.com/w3c/IntersectionObserver/tree/master/polyfill
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill
if (
  Array.from &&
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype
) {
  observeLazyImages(callbacks);
} else {
  bindOnScrollLazyImages(experiences, callbacks);
}

bindOnClickProjectFeatures(experiences);

//  Injected by Webpack.
if (IS_PROD) {
  OfflinePluginRuntime.install();
}
