import { User } from "../../src/models";
import Dinero from "dinero.js";

const SIDEBAR_USER_NAME = "sidenav-user-full-name";
const SIDE_BAR_BANK_ACCOUNT_BUTTON = "sidenav-bankaccounts";
const NEW_TRANSACTION_BUTTON = "nav-top-new-transaction";
const CONTACT_SEARCH_RESULTS = "user-list-item-";
const TX_AMOUNT_FIELD = "transaction-create-amount-input";
const TX_NOTE_FIElD = "transaction-create-description-input";
const PAY_BUTTON = "transaction-create-submit-payment";
const USER_BALANCE = "sidenav-user-balance";
const TRANSACTION_AMOUNTS = "transaction-amount";

//Not selectors
const apiUrl = `${Cypress.env("apiUrl")}/graphql`;

export class MainPage {
  static verifyNewUserLoggedIn(name: string) {
    cy.getBySel(SIDEBAR_USER_NAME).should("have.text", name);
  }

  static goToBankAccountsSectionAndMockEmptyList() {
    cy.intercept("POST", apiUrl, (req) => {
      const { body } = req;
      if (body.hasOwnProperty("operationName") && body.operationName === "ListBankAccount") {
        req.alias = "ListBankAccountQuery";
        req.continue((res) => {
          res.body.data.listBankAccount = [];
        });
      }
    });
    cy.getBySel(SIDE_BAR_BANK_ACCOUNT_BUTTON).click();
  }

  static createTransactionToUserB() {
    cy.getBySel(NEW_TRANSACTION_BUTTON).click();
    cy.database("filter", "users").then((users: User[]) => {
      cy.wrap(users[1].balance).as("userBBalanceBefore");
      cy.getBySel(CONTACT_SEARCH_RESULTS + users[1].id).click();
    });
    cy.getBySel(TX_AMOUNT_FIELD).type("100");
    cy.getBySel(TX_NOTE_FIElD).type("Hello");
    cy.getBySel(USER_BALANCE).then((balance) => {
      let balanceBefore = parseInt(balance.text().replace(/\D/g, ""));
      cy.getBySel(PAY_BUTTON).click();
      cy.wait("@createTransaction");
      cy.getBySel(USER_BALANCE).should(
        "have.text",
        Dinero({ amount: balanceBefore - 10000 }).toFormat()
      );
    });
  }

  static validateSuccessfulPaymentTransaction() {
    cy.get("@userBBalanceBefore").then((balance: any) => {
      cy.getBySel(USER_BALANCE).should("have.text", Dinero({ amount: balance + 10000 }).toFormat());
    });
    cy.getByWildSel(TRANSACTION_AMOUNTS).first().should("have.text", "-$100.00");
  }
}
