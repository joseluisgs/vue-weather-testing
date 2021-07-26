describe('Banner.vue Test', () => {
  // Nos aseguramos que antes de cada test visitamos la web
  beforeEach(() => {
    cy.visit('/'); // "baseUrl" definido en cypress.json
  });

  it('Cuando se crea no es visible', () => {
    cy.get('.banner').should('not.be.visible');
  });

  it('Si una búsqueda es correcta, es Verde, contiene Success y la ciudad', () => {
    cy.get('.banner').should('not.be.visible');
    cy.get('#cityInput').type('Cazorla');
    cy.get('[type="submit"]').click({ force: true });
    cy.get('.banner').should('have.attr', 'style', 'background-color: green;');
    cy.get('.banner').should('be.visible');
    cy.get('.banner > p').contains('Success');
    cy.get('.banner > p').contains('Cazorla');
  });

  it('Si una búsqueda es incorrecta, es Rojo, contiene Error', () => {
    cy.get('.banner').should('not.be.visible');
    cy.get('#cityInput').type('PRPRPRPRPR');
    cy.get('[type="submit"]').click({ force: true });
    cy.get('.banner').should('be.visible');
    cy.get('.banner').should('have.attr', 'style', 'background-color: red;');
    cy.get('.banner > p').contains('ERROR');
    cy.get('.banner > p').contains('PRPRPRPRPR');
  });

  it('Si si pulsa Clear, desaparece', () => {
    cy.get('.banner').should('not.be.visible');
    cy.get('#cityInput').type('PRPRPRPRPR');
    cy.get('[type="submit"]').click({ force: true });
    cy.get('.banner').should('be.visible');
    cy.get('#errorMessageClear').click({ force: true });
    cy.get('.banner').should('not.be.visible');
  });
});
