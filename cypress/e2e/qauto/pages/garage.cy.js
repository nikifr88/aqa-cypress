/// <reference types="cypress" />

import Garage from "../../../support/pageObjects/Garage"

describe('Check garage options', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login(Cypress.env().user.email, Cypress.env().user.password)
        cy.wait(1000);
    })

    it('Add car', () => {
        Garage.addCar('Ford', 'Fusion', 55);
        Garage.carListUl.contains('p', 'Ford Fusion')
        Garage.alertDiv.eq(1).should('have.text', 'Car added')
    })

    it('Update mileage car', () => {
        Garage.updateMileage(56);
        Garage.mileageUpdateInput.first().should('have.value', 56)
    })

    it('Update car data', () => {
        Garage.updateCar('Audi', 'TT', 59, '11.10.2025')
        Garage.carListUl.contains('p', 'Audi TT')
        Garage.mileageUpdateInput.first().should('have.value', 59)
        Garage.alertDiv.eq(1).should('have.text', 'Car updated')
    })

    it('Remove car', () => {
        Garage.removeCar();
        Garage.emptyCarListDiv;
        Garage.alertDiv.eq(1).should('have.text', 'Car removed')
    })
})