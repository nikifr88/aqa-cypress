/// <reference types="cypress" />

import Garage from "../../../support/pageObjects/Garage"

const tGarage = new Garage;

describe('Check garage options', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login(Cypress.env().user.email, Cypress.env().user.password)
        cy.wait(1000);
    })

    it('Add car', () => {
        tGarage.addCar('Ford', 'Fusion', 55);
        tGarage.carListUl.contains('p', 'Ford Fusion')
        tGarage.alertDiv.eq(1).should('have.text', 'Car added')
    })

    it('Update mileage car', () => {
        tGarage.updateMileage(56);
        tGarage.mileageUpdateInput.first().should('have.value', 56)
    })

    it('Update car data', () => {
        tGarage.updateCar('Audi', 'TT', 59, '11.10.2025')
        tGarage.carListUl.contains('p', 'Audi TT')
        tGarage.mileageUpdateInput.first().should('have.value', 59)
        tGarage.alertDiv.eq(1).should('have.text', 'Car updated')
    })

    it('Remove car', () => {
        tGarage.removeCar();
        tGarage.emptyCarListDiv;
        tGarage.alertDiv.eq(1).should('have.text', 'Car removed')
    })
})