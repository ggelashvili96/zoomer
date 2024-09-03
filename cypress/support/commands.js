// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('visitTestZootopia', () => {
  cy.visit('https://testzootopia.loremipsum.ge/ka');
  cy.viewport(1600, 900);
  cy.url().should('include', 'testzootopia.loremipsum.ge');
});

Cypress.Commands.add('login', (email, password) => {
  cy.contains('p', 'შესვლა').should('be.visible').click();
  cy.get('input[name="login_email"]').type(email).should('have.value', email);
  cy.get('.ipass').type(password);
  cy.contains('button', 'ავტორიზაცია').click();
});

Cypress.Commands.add('visitProfilePage', () => {
  cy.contains('p', 'ჩემი გვერდი').should('be.visible').click();
});

Cypress.Commands.add('fillRegistrationForm', (user) => {
  cy.get('input[name="first_name"]').type(user.firstName).should('have.value', user.firstName);
  cy.get('input[name="reg_email"]').type(user.email).should('have.value', user.email);
  cy.get('input[name="personal_id"]').type(user.personalId).should('have.value', user.personalId);
  cy.get('input[name="phone"]').type(user.phone).should('have.value', user.phone);
  cy.get('input[name="reg_password"]').type(user.password);
  cy.get('input[name="reg_password_confirmation"]').type(user.password);
});

Cypress.Commands.add('loginAndVisitProfile', () => {
  cy.fixture('user.json').then((loginData) => {
    cy.visitTestZootopia();
    cy.login(loginData.email, loginData.password);
    cy.visitProfilePage();
  });
});

Cypress.Commands.add('registerUserAndCheckAlert', () => {
  cy.fixture('user.json').then((user) => {
    cy.visitTestZootopia();
    cy.contains('p', 'შესვლა').should('be.visible').click();
    cy.contains('a', 'გაიარეთ რეგისტრაცია').should('be.visible').click();
    cy.fillRegistrationForm(user);
    cy.get('label[for="etx"]').find('svg').find('path').eq(2).click();
    cy.get('button.regsub').click();
    cy.get('div.alert').should('be.visible').find('div.alert-text').should('contain.text', 'ასეთი ჩანაწერი უკვე არსებობს.');
  });
});

Cypress.Commands.add('addItemToCartAndVerify', () => {
  cy.fixture('user.json').then((loginData) => {
    cy.visitTestZootopia();
    cy.login(loginData.email, loginData.password);
    cy.get('.burger > .burger-span').click();
    cy.contains('a', 'მშრალი საკვები').should('be.visible').click();
    cy.get(':nth-child(1) > .price-cart > .product-cart').click();
    cy.get(':nth-child(3) > .price-cart > .product-cart').click();
    cy.get('a.icart p').click();
    cy.get('.cart-list').children().should('have.length', 2);
  });
});

Cypress.Commands.add('changePasswordAndClosePopup', () => {
  cy.fixture('user.json').then((loginData) => {
    cy.visitTestZootopia();
    cy.login(loginData.email, loginData.password);
    cy.contains('p', 'ჩემი გვერდი').should('be.visible').click();
    cy.contains('li', 'პაროლის შეცვლა').should('be.visible').click()
    cy.get('input[name="old_password"]').type(loginData.password).should('have.value', loginData.password);
    cy.get('input[name="new_password"]').type(loginData.password).should('have.value', loginData.password);
    cy.get('input[name="new_password_confirmation"]').type(loginData.password).should('have.value', loginData.password);
    cy.contains('button', 'შეცვლა').click();
    cy.get('#modal-box-success-message').should('be.visible').and('contain.text', 'ინფორმაცია წარმატებით განახლდა');
    cy.get('.common > .xform').should('be.visible').click();
  });
});
