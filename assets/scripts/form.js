import { FORM_STATUSES } from "./enums";
import { addClass } from "./utils";

class Form {
  constructor(selector, action, modal) {
    this.element = document.querySelector(selector);
    this.submitBtn = this.element.querySelector('button[type="submit"]');

    this.bindAction(action || "submit");

    this.liveRegion = document.querySelector("#sr-form-alert");
    this.messageStatus = document.querySelector(
      ".status-alert p.status-alert__message"
    );
    this.statusMessage = null;

    this.modal = modal;
  }

  bindAction(type) {
    if (type === "submit") {
      this.element.onsubmit = e => {
        e.preventDefault();

        //  Check to prevent Cypress tests from submitting empty form.
        if (!e.target.checkValidity()) {
          return;
        }

        // Escape if the honeypot has been filled.
        if (!!this.element.children.namedItem("honeypot").value) {
          return;
        }

        this.submitBtn.setAttribute("aria-hidden", "true");
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = "Sending...";
        addClass(this.submitBtn, "prev-focus-trap");

        this.liveRegion.textContent = FORM_STATUSES.IN_PROGRESS;

        // Prepare data to send.
        const data = Array.from(this.element).reduce((result, input) => {
          result[input.name] = input.value;
          return result;
        }, {});

        // Construct an HTTP request.
        let xhr = new XMLHttpRequest();
        xhr.open(this.element.method, this.element.action, true);
        xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

        // Send the collected data as JSON.
        xhr.send(JSON.stringify(data));

        xhr.onloadend = pe => {
          this.statusMessage =
            pe.target.status === 200
              ? FORM_STATUSES.SUCCESS
              : FORM_STATUSES.ERROR;

          this.liveRegion.textContent = "";

          this.messageStatus.textContent = this.statusMessage;
          this.modal.open("#message-status");

          //  `alert` stops the thread. Chrome has optimized reflow by executing `alert` prior to DOM modifications.
          // alert(statusMessage);

          this.submitBtn.removeAttribute("aria-hidden");
          this.submitBtn.disabled = false;
          this.submitBtn.textContent = "Submit";
        };
      };
    }
  }
}

export default Form;
