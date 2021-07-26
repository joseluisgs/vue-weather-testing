// https://docs.cypress.io/api/introduction/api.html

describe('Init Test', () => {
  it('Carga la página', () => {
    cy.visit('/');
    cy.contains('Vue Weather App');
    cy.contains('Weather Search');
    cy.contains('joseluisgs 2021');
  });
});
