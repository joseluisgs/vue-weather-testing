describe('Weather.vue Test', () => {
  // Nos aseguramos que antes de cada test visitamos la web
  beforeEach(() => {
    cy.visit('/'); // "baseUrl" definido en cypress.json
  });

  it('Cuando se crea no es visible', () => {
    cy.get('.weather-results-container').should('not.exist');
  });

  it('Renderiza los elementos si la búqeuda es correcta', () => {
    cy.get('#cityInput').type('Cazorla').should('have.value', 'Cazorla');
    cy.get('[type="submit"]').click({ force: true });
    cy.get('.weather-results-container').should('exist');
    cy.get('.weather-results-summary').should('exist');
    cy.get('.weather-results-temperatures').should('exist');
    cy.get('.weather-results-temperatures').should('exist');
    cy.get('.weather-results-buttons > button').should('exist');
    // Aparecen los datos
    cy.get('.weather-results-summary').contains('City');
    cy.get('.weather-results-summary').contains('Summary');
    cy.get('.weather-results-summary').contains('Details');
    cy.get('.weather-results-temperatures').contains('Current');
    cy.get('.weather-results-temperatures').contains('High (Today)');
    cy.get('.weather-results-temperatures').contains('Low (Today)');
    cy.get('.weather-results-summary').contains('Cazorla');
  });

  it('Limpia los datos si pulsamos el botón Clear Weather Data', () => {
    // Buscamos
    cy.get('#cityInput').type('Cazorla').should('have.value', 'Cazorla');
    cy.get('[type="submit"]').click({ force: true });
    cy.get('.weather-results-container').should('exist');
    cy.get('.weather-results-summary').should('exist');
    cy.get('.weather-results-temperatures').should('exist');
    cy.get('.weather-results-temperatures').should('exist');
    cy.get('.weather-results-buttons > button').should('exist');
    // Pulsamos el botón
    cy.get('.weather-results-buttons > button').click({ force: true });
    // Desaparecen
    cy.get('.weather-results-container').should('not.exist');
    cy.get('.weather-results-summary').should('not.exist');
    cy.get('.weather-results-temperatures').should('not.exist');
    cy.get('.weather-results-temperatures').should('not.exist');
    cy.get('.weather-results-buttons > button').should('not.exist');
  });
});
