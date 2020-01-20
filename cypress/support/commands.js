// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("createUser", () => {
  cy.request({
    method: "GET",
    url: "https://randomuser.me/api/?inc=name,email"
  }).then(response => response.body.results[0]);
});

Cypress.Commands.add("all", (...functions) => {
  if (Cypress._.isEmpty(functions)) {
    return [];
  }

  const fns = Cypress._.isArray(functions[0]) ? functions[0] : functions;
  const results = [];

  fns.reduce((prev, fn) => {
    fn().then(result => results.push(result));
    return results;
  }, results);

  return cy.wrap(results);
});

Cypress.Commands.add("assertHome", () => {
  cy.url().should("eq", `${Cypress.config().baseUrl}/`);
});
