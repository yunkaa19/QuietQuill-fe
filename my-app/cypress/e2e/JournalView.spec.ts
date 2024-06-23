describe('Navigation and Journal Entry Tests', () => {
    beforeEach(() => {
        // Visit the home page and mock the login API call
        cy.visit('/'); // Assuming the app starts at the home page

        cy.intercept('POST', '/api/Users/login', {
            statusCode: 200,
            body: {
                "Token": "mocked_token",
                "UserId": "mocked_user_id",
                "Email": "test@example.com",
                "Role": "user"
            }
        }).as('loginRequest');

        // Click login button
        cy.get('[data-cy="expand"]').click();
        cy.get('[data-cy="login"]').click();

        // Fill in the login form
        cy.get('input[type="email"]').type('test@example.com'); // Replace with a valid email
        cy.get('input[type="password"]').type('password123'); // Replace with a valid password

        // Submit the login form
        cy.get('button[type="submit"]').click();

        // Wait for the login request to complete
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        // Wait for redirection to the home page after login
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.intercept('POST', '/api/Journal/GetMonth', {
            statusCode: 200,
            body: {
                journals: [
                    {
                        id: '1',
                        userId: 'mocked_user_id',
                        content: 'Today I had a great day!',
                        day: '15',
                        month: '06',
                        year: '2024',
                        mood: 4,
                        tags: 'happy'
                    },
                    {
                        id: '2',
                        userId: 'mocked_user_id',
                        content: 'Today I had a bad day!',
                        day: '13',
                        month: '06',
                        year: '2024',
                        mood: 4,
                        tags: 'sad'
                    },
                    // Add more journal entries as needed
                ]
            }
        }).as('getJournalEntries');

        // Intercept the API call to get the journal entry details
        cy.intercept('POST', '/api/Journal/GetEntry', {
            statusCode: 200,
            body: {
                entry: {
                    id: '1',
                    userId: 'mocked_user_id',
                    content: 'Today I had a great day!',
                    day: '15',
                    month: '06',
                    year: '2024',
                    mood: 4,
                    tags: 'happy'
                }
            }
        }).as('getJournalEntry');

        // Click on the Journal button in the sidebar
        cy.contains('Journal').click();

        // Assert that we are on the journal page
        cy.url().should('include', '/journals');

        // Wait for the API call to fetch journal entries to complete
        cy.wait('@getJournalEntries').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.journals).to.have.length.greaterThan(0); // Ensure journals were returned
        });

    });

    it('should navigate to the journal page after login, load journal entries, and handle view entry button', () => {
        // Click on the "View" button for the first journal entry
        cy.contains('.day', '15').find('button').contains('View').click();

        // Wait for the navigation to the view entry page and the entry details to be fetched
        cy.url().should('include', '/journals/journal_page/view').then(() => {
            cy.wait('@getJournalEntry').then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                // Assert that the text area contains the correct content
                cy.get('textarea').should('have.value', 'Today I had a great day!');
            });
        });
    });

    it('should update a journal entry', () => {
        // Intercept the API call to update the journal entry
        cy.intercept('POST', '/api/Journal/Update', {
            statusCode: 200,
            body: {
                entry: {
                    id: '1',
                    userId: 'mocked_user_id',
                    content: 'Today I had an amazing day!',
                    day: '15',
                    month: '06',
                    year: '2024',
                    mood: 4,
                    tags: 'happy'
                }
            }
        }).as('updateJournalEntry');

        // Intercept the API call to get the journal entry details
        cy.intercept('POST', '/api/Journal/GetEntry', {
            statusCode: 200,
            body: {
                entry: {
                    id: '1',
                    userId: 'mocked_user_id',
                    content: 'Today I had a great day!',
                    day: '15',
                    month: '06',
                    year: '2024',
                    mood: 4,
                    tags: 'happy'
                }
            }
        }).as('getJournalEntry');

        // Navigate to the journal page and view an entry as done in the previous test
        cy.contains('Journal').click();
        cy.contains('.day', '15').find('button').contains('View').click();
        cy.wait('@getJournalEntry');

        // Update the content of the journal entry
        cy.get('textarea#content').clear().type('Today I had an amazing day!');
        cy.get('button[type="submit"]').click();

        // Wait for the update request to complete
        cy.wait('@updateJournalEntry').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.entry.content).to.equal('Today I had an amazing day!');
        });

        // Verify the success message
        cy.contains('Entry updated successfully!').should('be.visible');
    });

    it('should delete a journal entry', () => {
        // Intercept the API call to delete the journal entry with the Authorization header and the journalId in the body
        cy.intercept({
            method: 'DELETE',
            url: '/api/Journal/Delete'
        }, (req) => {
            req.headers['Authorization'] = 'Bearer mocked_token';
            req.body = { journalId: '1' };
            req.reply({
                statusCode: 200,
                body: true
            });
        }).as('deleteJournalEntry');

        // Intercept the API call to get the journal entry details
        cy.intercept('POST', '/api/Journal/GetEntry', {
            statusCode: 200,
            body: {
                entry: {
                    id: '1',
                    userId: 'mocked_user_id',
                    content: 'Today I had a great day!',
                    day: '15',
                    month: '06',
                    year: '2024',
                    mood: 4,
                    tags: 'happy'
                }
            }
        }).as('getJournalEntry');

        // Navigate to the journal page and view an entry as done in the previous test
        cy.contains('Journal').click();
        cy.contains('.day', '15').find('button').contains('View').click();
        cy.wait('@getJournalEntry');

        // Click the delete button and confirm the deletion
        cy.contains('button', 'Delete').click();
        cy.on('window:confirm', () => true);

        // Wait for the delete request to complete
        cy.wait('@deleteJournalEntry').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body).to.equal(true);
        });

        // Verify that the user is redirected to the journals page
        cy.url().should('include', '/journals');
    });
});
