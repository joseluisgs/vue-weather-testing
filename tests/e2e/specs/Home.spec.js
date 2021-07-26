// Lo bueno de haberlo ya hecho por partes, es que mucho de los tests ya están realizados, 
// así que haremos una búsqueda correcta e incorrecta
// y vemos lo que se ha renderizado.

describe('Home.vue Test', () => {
  // Nos aseguramos que antes de cada test visitamos la web
  beforeEach(() => {
    cy.visit('/'); // "baseUrl" definido en cypress.json
  });

  it('Visibilidad de los componentes al cargar Home', () => {
    cy.get('.header').should('be.visible');
    cy.get('.banner').should('not.be.visible');
    cy.get('.weather-search').should('be.visible');
    cy.get('.weather-results-container').should('not.exist');
    cy.get('.footer').should('be.visible');
  });

  it('Simulación de una petición HTTP GET satisfactoria', () => {
    // Formulario
    cy.get('#cityInput').type('Cazorla').should('have.value', 'Cazorla');
    cy.get('[type="submit"]').click({ force: true });
    // Banner
    cy.get('.banner').should('have.attr', 'style', 'background-color: green;');
    cy.get('.banner').should('be.visible');
    cy.get('.banner > p').contains('Success');
    cy.get('.banner > p').contains('Cazorla');
    // Contenedores de la información
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

  it('Simulación de una petición HTTP GET Erronea', () => {
    // Formulario
    cy.get('#cityInput').type('PEPPRPEPE').should('have.value', 'PEPPRPEPE');
    cy.get('[type="submit"]').click({ force: true });
    // Banner
    cy.get('.banner').should('have.attr', 'style', 'background-color: red;');
    cy.get('.banner').should('be.visible');
    cy.get('.banner > p').contains('ERROR');
    cy.get('.banner > p').contains('PEPPRPEPE');
    // Contenedores de la información
    cy.get('.weather-results-container').should('not.exist');
    cy.get('.weather-results-summary').should('not.exist');
    cy.get('.weather-results-temperatures').should('not.exist');
    cy.get('.weather-results-temperatures').should('not.exist');
    cy.get('.weather-results-buttons > button').should('not.exist');
  });
});
