describe('Footer.vue Test', () => {
  // Nos aseguramos que antes de cada test visitamos la web
  beforeEach(() => {
    cy.visit('/'); // "baseUrl" definido en cypress.json
  });

  it('Renderiza el mensaje si está creado', () => {
    const expectedValue = 'joseluisgs 2021';
    // Esta en donde debe estar, lo comprobamos dos veces, una para ver si tiene el texto
    // y otra en el componente
    cy.get('.footer > h1').should('have.text', expectedValue);
    cy.contains(expectedValue);
  });
});
