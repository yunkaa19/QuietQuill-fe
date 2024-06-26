describe('Login Test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should navigate to the login page and log the user in', () => {
        // Intercept the login API call and mock the response
        cy.intercept('POST', '/api/Users/login', {
            statusCode: 200,
            body: {
                "Token": "mocked_token",
                "UserId": "mocked_user_id",
                "Email": "test@example.com",
                "Role": "user"
            }
        }).as('loginRequest');

        // Click on the login button in the navigation
        cy.get('[data-cy="expand"]').click();
        cy.get('[data-cy="login"]').click();

        // Assert that we are on the login page
        cy.url().should('include', '/login');

        // Fill in the login form
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('password123');

        // Submit the login form
        cy.get('button[type="submit"]').click();

        // Wait for the mocked login request to be called
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        // Assert that we are redirected to the home page after login
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        // Additional assertions to verify that the user is logged in
        cy.contains('Account').should('be.visible');
    });
});
