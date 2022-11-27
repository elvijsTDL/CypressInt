const SIDEBAR_USER_NAME = "sidenav-user-full-name";
const SIDE_BAR_BANK_ACCOUNT_BUTTON = "sidenav-bankaccounts"
//Not selectors
const apiUrl = `${Cypress.env("apiUrl")}/graphql`

export class MainPage {
  static verifyNewUserLoggedIn(name: string) {
    cy.getBySel(SIDEBAR_USER_NAME).should("have.text", name);
  }

  static goToBankAccountsSectionAndMockEmptyList() {
    cy.intercept("POST",apiUrl, (req) => {
      const { body } = req;
      if(body.hasOwnProperty("operationName") && body.operationName === "ListBankAccount"){
        req.alias = "ListBankAccountQuery"
        req.continue((res) => {
            res.body.data.listBankAccount = []
        })
      }
    })
    cy.getBySel(SIDE_BAR_BANK_ACCOUNT_BUTTON).click()
  }
}
