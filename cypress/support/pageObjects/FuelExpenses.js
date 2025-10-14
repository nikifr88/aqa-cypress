/// <reference types="cypress" />

class FuelExpenses {
    get carSelectDropdown() {
        return cy.get('#carSelectDropdown')
    }

    get addAnExpenseButton() {
        return cy.get('.item-group > .btn.btn-primary')
    }

    get vehicleSelect() {
        return cy.get('#addExpenseCar')
    }

    get reportExpenseDateInput() {
        return cy.get('#addExpenseDate')
    }

    get expenseMileageInput() {
        return cy.get('#addExpenseMileage')
    }

    get expenseLitersInput() {
        return cy.get('#addExpenseLiters')
    }

    get totalCostInput() {
        return cy.get('#addExpenseTotalCost')
    }

    get addExpenseButton(){
        return cy.get('.modal-footer.d-flex.justify-content-end > .btn.btn-primary')
    }

    get emptyExpensesDiv() {
        return cy.get('.panel-page_empty.panel-empty')
    }

    get expenseTableTr() {
        return cy.get('.table.expenses_table > tbody')
    }

    get deleteExpenseButton() {
        return cy.get('.btn.btn-delete')
    }

    get approveDeleteButton() {
        return cy.get('.modal-footer > .btn.btn-danger')
    }

    get editExpenseButton() {
        return cy.get('.btn.btn-edit')
    }

    get currDate() {
        return new Date().toLocaleDateString('ru-RU').replace(/\//g, '.');
    }

    addExpense(vehicle = 0, mileage = 60, numOfLiters = 10, cost = 10){
        this.addAnExpenseButton.click()
        this.vehicleSelect.select(vehicle)
        this.reportExpenseDateInput.clear().type(this.currDate)
        this.expenseMileageInput.clear().type(mileage)
        this.expenseLitersInput.clear().type(numOfLiters)
        this.totalCostInput.clear().type(cost)
        this.addExpenseButton.click()
    }

    editExpense(vehicle = 0, mileage = 70, numOfLiters = 15, cost = 15){
        this.editExpenseButton.first().click({force: true})
        this.vehicleSelect.select(vehicle)
        this.reportExpenseDateInput.clear().type(this.currDate)
        this.expenseMileageInput.clear().type(mileage)
        this.expenseLitersInput.clear().type(numOfLiters)
        this.totalCostInput.clear().type(cost)
        this.addExpenseButton.click()
    }

    removeExpense(){
        this.deleteExpenseButton.first().click({force: true});
        this.approveDeleteButton.click()
    }
}

export default new FuelExpenses;