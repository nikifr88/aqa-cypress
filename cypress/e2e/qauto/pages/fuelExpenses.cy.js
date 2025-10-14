/// <reference types="cypress" />

import FuelExpenses from "../../../support/pageObjects/FuelExpenses";
import Garage from "../../../support/pageObjects/Garage";

describe('Check fuel expenses options', () => {
    const expensesPage = '/panel/expenses'

    beforeEach(() => {
        cy.visit('/')
        cy.login(Cypress.env().user.email, Cypress.env().user.password)
        cy.wait(1000);
        cy.visit(expensesPage)
    })

    after(() => {
        cy.wait(500);
        cy.visit('/')
        Garage.removeCar()
    });

    it('Create car and expense', () => {
        cy.visit('/panel/garage')
        Garage.addCar()
        cy.visit(expensesPage)

        FuelExpenses.addExpense()
        FuelExpenses.expenseTableTr.first().should('include.text', FuelExpenses.currDate)
        Garage.alertDiv.should('have.text', 'Fuel expense added')
    })

    it('Edit expense', () => {
        FuelExpenses.editExpense()
        FuelExpenses.expenseTableTr.first().should('include.text', FuelExpenses.currDate)
        Garage.alertDiv.should('have.text', 'Fuel expense edited')
    })

    it('Delete expense', () => {
        FuelExpenses.removeExpense()
        cy.wait(1000)
        Garage.alertDiv.should('have.text', 'Fuel expense entry removed')
        FuelExpenses.emptyExpensesDiv
    })
})