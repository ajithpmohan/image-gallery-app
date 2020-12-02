const serverUrl = Cypress.env('serverUrl');

const imageUploadForm = (imageFile, category = null) => {
  // network call
  cy.server();
  cy.route('POST', `${serverUrl}/image-gallery/`).as('uploadImage');

  cy.visit('/upload');

  category && cy.get('select.form-control').select(category);
  cy.get('input[name="imageInput"]').attachFile(imageFile);
  cy.wait('@uploadImage');
};

describe('Image Upload', () => {
  it('upload image with category', () => {
    imageUploadForm(
      'images/ml.jpeg',
      'ML',
    );
    cy.get('div.Toastify').contains(
      '🚀 Image Uploaded! Go to Gallery to view the image',
    );
  });

  it('upload image without category', () => {
    imageUploadForm('images/ai.png');
    cy.get('div.Toastify').contains(
      '🚀 Image Uploaded! Go to Gallery to view the image',
    );
  });
});
