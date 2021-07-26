describe('Header.vue Test', () => {
  // Nos aseguramos que antes de cada test visitamos la web
  beforeEach(() => {
    cy.visit('/'); // "baseUrl" definido en cypress.json
  });

  it('Cuando se crea es visible', () => {
    cy.get('.header').should('be.visible');
  });

  it('Renderiza el mensaje si está creado', () => {
    const expectedValue = 'Vue Weather App';
    // Esta en donde debe estar
    cy.get('.header > h1').should('have.text', expectedValue);
    cy.contains(expectedValue);
  });
});
