import { User } from "../../src/models"
export class Common {
    static openMainPage() {
        cy.visit("/");
    }

    static seedDatabase() {
        console.log(Cypress.env("defaultPassword"))
        cy.task("db:seed")
    }

    static loginUserWithxState() {
        cy.database("find", "users").then((user:User)=> {
           return cy.loginByXstate(user.username)
        })
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(10000)
    }
}