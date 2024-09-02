describe('Open TestZootopia Website', () => {
    it('should open the website', () => {
      // Visit the URL
      cy.visit('https://testzootopia.loremipsum.ge/ka');
  
      // Optionally, add assertions or interactions here
      cy.url().should('include', 'testzootopia.loremipsum.ge');
    });
  });
  