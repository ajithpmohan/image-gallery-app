describe('Home', () => {
  it('render home page', () => {
    cy.visit('/');
    cy.get('div').contains('Welcome to Image Gallery App');
  });
});
