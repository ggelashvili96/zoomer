describe('Open TestZootopia Website', () => {
    it('should log in and navigate to profile page', () => {
        cy.loginAndVisitProfile();
    });
  
    it('should register a user and display an alert if the record already exists', () => {
        cy.registerUserAndCheckAlert();
    });
  
    it('should add items to the cart and verify the cart contents', () => {
        cy.addItemToCartAndVerify();
    });
  
    it('should log in, change password, and close the popup', () => {
        cy.changePasswordAndClosePopup();
    });
    it('should search and cart item', () => {
        cy.searchAndCart();
    });
});