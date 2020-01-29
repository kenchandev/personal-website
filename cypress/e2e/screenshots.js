describe("smart alec screenshots", () => {
  beforeEach(() => {
    cy.log("visiting site and waiting for animations");
    cy.visit("/").wait(2000); // Wait for initial profile animation to finish.

    cy.log("scrolling to smart alec section");
    //  TODO: Simplify selector.
    cy.get(".experience.experience--smart-alec").scrollIntoView({
      eaasing: "linear",
      duration: 2000
    });
  });

  it("should display a different screenshot in browser svg when a project feature is clicked", () => {
    //  TODO: Simplify selector.
    const screenshotSelector =
      ".experience.experience--smart-alec .browser svg #Browser #Screenshot";

    cy.get(screenshotSelector)
      .invoke("attr", "href")
      .then(prevSrc => {
        cy.findByText(/^multiple\stime\szones\ssupport$/i).click();

        cy.get(screenshotSelector)
          .invoke("attr", "href")
          .then(nextSrc => {
            expect(nextSrc).to.not.equal(prevSrc);
          });
      });
  });
});
