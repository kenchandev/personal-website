describe("back-to-top link", () => {
  beforeEach(() => {
    cy.log("visiting site and waiting for animations");
    cy.visit("/").wait(2000); // Wait for initial profile animation to finish.

    cy.log("scrolling to footer");
    cy.get("footer").scrollIntoView({ easing: "linear", duration: 2000 });
  });

  it("should scroll back to the top of the window", () => {
    cy.findByText(/^back\sto\stop$/i).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.window().then($window => {
      expect($window.scrollY).to.eq(0);
    });
  });
});
