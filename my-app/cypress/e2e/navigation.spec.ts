describe('Navigation to About Page', () => {
    beforeEach(() => {
        // Visiting the base URL (replace with your actual URL)
        cy.visit('/');
    });

    it('should expand the sidebar and navigate to the About page', () => {
        // Click the toggle button to expand the sidebar
        cy.get('button[data-cy="expand"]').click();

        // Wait for the sidebar animation to complete
        cy.get('div')
            .should('have.class', 'w-64') // Ensure the sidebar is expanded
            .and('be.visible');

        // Log the state of the About button
        cy.get('button')
            .contains('About')
            .then($button => {
                console.log($button);
                expect($button).to.be.visible;
            });

        // Take a screenshot before clicking
        cy.screenshot('before-click-about');

        // Click the About button using a more specific selector
        cy.get('button')
            .contains('About')
            .should('be.visible')
            .click();

        // Take a screenshot after clicking
        cy.screenshot('after-click-about');

        // Verify that the URL is correct
        cy.url().should('include', '/about');

        // Verify that the About page content is loaded
        cy.contains('About QuietQuill'); // Adjust this line to match specific content in your About page
    });
});
