class Form {
  constructor(selector, action) {
    this.element = document.querySelector(selector);
    this.submitBtn = this.element.querySelector('button[type="submit"]');

    this.bindAction(action || "submit");
  }

  bindAction(type) {
    if (type === "submit") {
      this.element.onsubmit = e => {
        e.preventDefault();

        // Escape if the honeypot has been filled.
        if (!!this.element.children.namedItem("honeypot").value) {
          return;
        }

        this.submitBtn.disabled = true;

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
          if (pe.target.status === 200) {
            // The form submission was successful.
            alert("Your message has been sent to Ken!");
          } else {
            // The form submission failed.
            alert(
              "Yikes! Something went wrong when sending this message to Ken. Please try again.\n\nAlternatively, you may send the message directly to kenchandev [at] gmail [dot] com."
            );
          }

          this.submitBtn.disabled = false;
        };
      };
    }
  }
}

export default Form;
