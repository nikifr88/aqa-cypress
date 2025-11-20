/// <reference types="cypress" />

export default class Garage {
    get addCarButton() {
        return cy.get('.panel-page_heading > .btn')
    }

    get choseBrandSelect() {
        return cy.get('#addCarBrand')
    }

    get choseModelSelect() {
        return cy.get('#addCarModel')
    }

    get mileageInput() {
        return cy.get('#addCarMileage')
    }

    get createCarButton() {
        return cy.get('.modal-footer > .btn-primary')
    }

    get saveCarButton() {
        return cy.contains('button', 'Save')
    }

    get mileageUpdateInput() {
        return cy.get('.update-mileage-form_input.form-control');
    }

    get mileageUpdateButton() {
        return cy.get('.update-mileage-form_submit')
    }

    get carEditButton() {
        return cy.get('.car_edit.btn.btn-edit')
    }

    get carCreationDateInput() {
        return cy.get('#carCreationDate')
    }

    get removeCarButton() {
        return cy.contains('button', 'Remove car')
    }

    get carListUl() {
        return cy.get('.car-list')
    }

    get approveRemoveCarButton() {
        return cy.get('.btn.btn-danger')
    }

    get emptyCarListDiv() {
        return cy.get('.panel-page_empty.panel-empty')
    }

    get alertDiv() {
        return cy.get('.alert')
    }

    addCar(brand = 'BMW', model = 'X5', mileage = 1) {
        this.addCarButton.click()
        cy.wait(3000)
        this.choseBrandSelect.select(brand)
        this.choseModelSelect.select(model)
        this.mileageInput.type(mileage)

        cy.intercept('POST', '/api/cars').as('carCreateReq');

        this.createCarButton.click()

        cy.wait('@carCreateReq').then((interception) => {
            Cypress.env('carId', interception.response.body.data.id);

            expect(interception.response.statusCode).to.eq(201);
        })
    }

    checkCreatedCarAPI(brand = 'BMW', model = 'X5', mileage = 1){
        cy.request({
            url: `api/cars/${Cypress.env('carId')}`,
            method: 'GET',
            headers: {
                Cookie: `sid=${Cypress.env('sid')}`
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.eq(Cypress.env('carId'));
            expect(response.body.data.brand).to.eq(brand);
            expect(response.body.data.model).to.eq(model);
            expect(response.body.data.initialMileage).to.eq(mileage);
        })
    }

    updateMileage(mileage = 2) {
        this.mileageUpdateInput.first().clear().type(mileage)
        this.mileageUpdateButton.first().click()
    }

    updateCar(brand = 'Audi', model = 'Q7', mileage = 3, date = '12.10.2025') {
        this.carEditButton.first().click()
        this.choseBrandSelect.select(brand)
        this.choseModelSelect.select(model)
        this.mileageInput.clear()
        this.mileageInput.type(mileage)
        this.saveCarButton.click()
        this.carCreationDateInput.type(date)
    }

    removeCar() {
        this.carEditButton.first().click()
        this.removeCarButton.click()
        this.approveRemoveCarButton.click()
    }
}