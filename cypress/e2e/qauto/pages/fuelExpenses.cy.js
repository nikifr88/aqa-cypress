/// <reference types="cypress" />

import FuelExpenses from "../../../support/pageObjects/FuelExpenses";
import Garage from "../../../support/pageObjects/Garage";

const tFuelExpenses = new FuelExpenses;
const tGarage = new Garage;

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
        tGarage.removeCar()
    });

    it('Create car and expense', () => {
        cy.visit('/panel/garage')
        tGarage.addCar()
        cy.visit(expensesPage)

        tFuelExpenses.addExpense()
        tFuelExpenses.expenseTableTr.first().should('include.text', tFuelExpenses.currDateUI)
        tGarage.alertDiv.should('have.text', 'Fuel expense added')
    })

    it('Check created car', () => tGarage.checkCreatedCarAPI())
    it('Add expense via api', () => cy.createExpenseAPI(
        tFuelExpenses.currDateAPI,
        65,
        13,
        13,
        false
    ))

    it('Find car and check expense', () => {
        const trs = tFuelExpenses.expenseTableTr.first();

        trs.get('td').eq(0).should('have.text', tFuelExpenses.currDateUI)
        trs.get('td').eq(1).should('have.text', 65)
        trs.get('td').eq(2).should('have.text', '13L')
        trs.get('td').eq(3).should('have.text', '13.00 USD')

        cy.visit('/panel/garage')
        tGarage.carListUl.get('.car_name.h2').should('have.text', "BMW X5");
        tGarage.carListUl.get('.car_update-mileage').should('include.text', tFuelExpenses.currDateUI);
        tGarage.mileageUpdateInput.should('have.value', 65);
    })

    it('Edit expense', () => {
        tFuelExpenses.editExpense()
        tFuelExpenses.expenseTableTr.first().should('include.text', tFuelExpenses.currDateUI)
        tGarage.alertDiv.should('have.text', 'Fuel expense edited')
    })

    it('Delete first expense', () => {
        tFuelExpenses.removeExpense()
        cy.wait(1000)
        tGarage.alertDiv.should('have.text', 'Fuel expense entry removed')
    })

    it('Delete second expense', () => {
        tFuelExpenses.removeExpense()
        cy.wait(1000)
        tGarage.alertDiv.should('have.text', 'Fuel expense entry removed')
        tFuelExpenses.emptyExpensesDiv
    })
})