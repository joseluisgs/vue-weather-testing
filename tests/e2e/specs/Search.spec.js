describe('Search.vue Test', () => {
  // Nos aseguramos que antes de cada test visitamos la web
  beforeEach(() => {
    cy.visit('/'); // "baseUrl" definido en cypress.json
  });

  it('Cuando se crea es visible', () => {
    cy.get('.weather-search').should('be.visible');
  });

  it('Renderiza Los elementos del formulario', () => {
    cy.get('h2').contains('Weather Search');
    cy.get('label').contains('City');
    cy.get('#cityInput').should('have.attr', 'placeholder', 'Enter a city name...');
    cy.get('[type="submit"]').should('contain', 'Search');
    cy.get('[type="reset"]').should('contain', 'Clear');
  });

  it('Limpia el formulario al pulsar Clear', () => {
    cy.get('#cityInput').should('have.attr', 'placeholder', 'Enter a city name...');
    cy.get('#cityInput').type('Cazorla').should('have.value', 'Cazorla');
    cy.get('[type="reset"]').click({ force: true });
    cy.get('#cityInput').should('have.attr', 'placeholder', 'Enter a city name...');
  });

  it('Busca al pulsar el botón Search', () => {
    cy.get('#cityInput').should('have.attr', 'placeholder', 'Enter a city name...');
    cy.get('#cityInput').type('Cazorla').should('have.value', 'Cazorla');
    cy.get('[type="submit"]').click({ force: true });
    cy.get('#cityInput').should('have.value', 'Cazorla');
  });
});
