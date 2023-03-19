import { EMPTY_LIST_MESSAGE } from "./Common";
export class BankAccountPage {
  static validateEmptyBankState() {
    cy.getBySel(EMPTY_LIST_MESSAGE).should("have.text", "No Bank Accounts");
  }
}
