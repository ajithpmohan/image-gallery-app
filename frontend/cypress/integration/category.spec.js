// / <reference types="cypress" />

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
    submitCategoryForm('Machine Learning');
    cy.get('div.list-group').contains('Machine Learning');
  });

  it('unique value error', () => {
    submitCategoryForm('Machine Learning');
    cy.get('div.form-group').contains(
      'Image Category with this name already exists.',
    );
  });

  it('case insensitive unique value error', () => {
    submitCategoryForm('machine learning');

    cy.get('div.form-group').contains(
      'Image Category with this name already exists.',
    );
  });

  it('empty value error', () => {
    submitCategoryForm('     ');

    cy.get('div.form-group').contains('This field may not be blank.');
  });
});
