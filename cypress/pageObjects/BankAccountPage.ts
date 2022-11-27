const NO_BANK_ACCOUNT_MESSAGE = "empty-list-header"

export class BankAccountPage {

    static validateNoBankAccountOnboarding() {
        cy.getBySel(NO_BANK_ACCOUNT_MESSAGE).should("have.text", "No Bank Accounts")
    }
}