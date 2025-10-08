/// <reference types="cypress" />

describe('Checking buttons in the header and footer', () => {
    const startPage = 'https://guest:welcome2qauto@qauto.forstudy.space/';
    
    beforeEach(() => {
        cy.visit(startPage)
    })

    it('All buttons in header be visible', () => {
        cy.get('.header_nav')
            .children()
            .should('be.visible');
        
        cy.get('.header_right')
            .children()
            .should('be.visible')
    })

    it('Nav buttons "About" and "Contacts" are clickable and scrolling is performed', () => {
        cy.window().then(win => {
            const initScroll = win.scrollY;

            cy.get('[appscrollto="aboutSection"]').click();
            cy.window().its('scrollY').should('be.gt', initScroll);

            cy.get('[appscrollto="contactsSection"]').click();
            cy.window().its('scrollY').should('be.gt', initScroll);
        })
    })

    it('The profile opens after clicking the "Guest log in" button.', () => {
        cy.get('.header_right > .header-link').click();
        cy.url().should('eql', 'https://qauto.forstudy.space/panel/garage');
    })

    it('An authorization window is displayed after clicking the "Sign in" button.', () => {
        cy.get('.header_right > .header_signin').click()
        cy.get('.modal-content').should('be.visible');
    })

    it('All buttons in footer be visible and have url', () => {
        cy.get('.contacts_socials')
            .children()
            .should('be.visible')
            .and('have.attr', 'target', '_blank')
            .should('have.attr', 'href')
            .and($href => {
                expect($href).to.not.be.empty;
                expect($href).to.match(/^https?:\/\/[\w.-]+/);
            });
        
        cy.get('.align-items-md-end')
            .children()
            .should('be.visible')
            .and('have.attr', 'target', '_blank')
            .should('have.attr', 'href')
            .and($href => {
                expect($href).to.not.be.empty;
                expect($href).to.match(/^https?:\/\/[\w.-]+/);
            });
    })
})