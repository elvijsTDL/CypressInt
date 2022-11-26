const SIDEBAR_USER_NAME = "sidenav-user-full-name";
const SIDE_BAR_BANK_ACCOUNT_BUTTON = "sidenav-bankaccounts"
export class MainPage {
  static verifyNewUserLoggedIn(name: string) {
    cy.getBySel(SIDEBAR_USER_NAME).should("have.text", name);
  }

  static goToBankAccountsSection() {
    cy.getBySel(SIDE_BAR_BANK_ACCOUNT_BUTTON).click()
  }
}
