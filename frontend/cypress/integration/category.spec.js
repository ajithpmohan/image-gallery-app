const serverUrl = Cypress.env('serverUrl');

const submitCategoryForm = (value) => {
  // network call
  cy.server();
  cy.route('POST', `${serverUrl}/image-category/`).as(
    'createCategory',
  );

  cy.visit('/category');

  cy.get('input[name="category"]').type(value);
  cy.get('button').contains('Submit').click();
  cy.wait('@createCategory');
};

describe('Category', () => {
  it('create category', () => {
    submitCategoryForm('ML');
    cy.get('div.list-group').contains('ML');
  });

  it('unique value error', () => {
    submitCategoryForm('ML');
    cy.get('div.form-group').contains(
      'Image Category with this name already exists.',
    );
  });

  it('case insensitive unique value error', () => {
    submitCategoryForm('ml');

    cy.get('div.form-group').contains(
      'Image Category with this name already exists.',
    );
  });

  it('empty value error', () => {
    submitCategoryForm('     ');

    cy.get('div.form-group').contains('This field may not be blank.');
  });
});
