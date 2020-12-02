describe('Gallery', () => {
  it('filter by category', () => {
    cy.visit('/gallery');

    // check that `ML category created on category.spec.js exists
    cy.get('select.form-control').contains('ML');

    // no filter
    cy.get('.card-columns > .card').should('have.length', 2);

    // filter by category
    cy.get('select.form-control').select('ML');
    cy.get('.card-columns > .card').should('have.length', 1);
  });
});
