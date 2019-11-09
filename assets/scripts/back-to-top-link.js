import { smoothScrollTo } from "./utils";

export default class BackToTopLink {
  constructor(linkSelector, topElementId, hash) {
    this.link = document.querySelector(linkSelector);
    this.topElement = document.getElementById(topElementId);
    this.hash = hash;

    this.addSmoothScroll();
  }

  addSmoothScroll() {
    //  If JavaScript is disabled, then the default `href` will still allow the user to return back to the top of the page.
    this.link.setAttribute("href", "javascript:void(0)");

    this.link.addEventListener("click", () => {
      //  Smoothly scroll back to the top of the page (offset of 0px) in 500ms.
      smoothScrollTo(0, 500);

      //  Append "#top" to the root URL.
      //  Simulates as if JavaScript was disabled, and the link still linked to the internal page element.
      window.location.hash = this.hash;

      //  To help people using assistive technologies, automatically apply focus to the top element.
      const requestId = window.requestAnimationFrame(() => {
        this.topElement.focus();

        window.cancelAnimationFrame(requestId);
      });
    });
  }
}
