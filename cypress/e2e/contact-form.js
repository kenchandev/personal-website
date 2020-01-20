describe("contact form", () => {
  beforeEach(() => {
    cy.log("visiting site and waiting for animations");
    cy.visit("/").wait(2000); // Wait for initial profile animation to finish.

    cy.log("scrolling to form");
    cy.get("form").scrollIntoView({ easing: "linear", duration: 2000 });
  });

  it("should send data to serverless endpoint", () => {
    cy.all([cy.createUser, () => cy.fixture("message")]).then(
      ([user, message]) => {
        cy.log("filling out name");
        cy.findByLabelText(/^full\sname$/i).type(
          `${user.name.first} ${user.name.last}`
        );

        cy.log("filling out e-mail");
        cy.findByLabelText(/^e\-mail\saddress$/i).type(user.email);

        cy.log("filling out subject");
        cy.findByLabelText(/^subject$/i).type(message.subject);

        cy.log("filling out message");
        cy.findByLabelText(/^message$/i).type(message.body);

        cy.log("submitting filled-out form");
        cy.get("form").submit();

        cy.log("checking status alert's message");
        cy.findByRole("dialog").should(
          "contain",
          "Your message has been sent to Ken!"
        );
      }
    );
  });

  it("display html5 form validation error", () => {
    cy.log("submitting empty form");
    cy.get("form").submit();

    cy.log("checking validation");
    cy.findByLabelText(/^full\sname$/i).then($input => {
      const input = $input[0];

      expect(input.checkValidity()).to.eq(false);
      expect(input.validationMessage).to.eq("Please fill out this field.");
    });
  });
});
