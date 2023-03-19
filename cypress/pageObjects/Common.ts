import { User } from "../../src/models";

export const EMPTY_LIST_MESSAGE = "empty-list-header";
export const NOTIFICATION_BADGE = "nav-top-notifications-count";
const NAVIGATION_BANK_ACCOUNT = "sidenav-bankaccounts";
const NOTIFICATION_BUTTON = "nav-top-notifications-link";
export class Common {
  static loginWithXState() {
    cy.database("find", "users").then((user: User) => {
      return cy.loginByXState(user.username);
    });
  }

  static goToBankAccountSection() {
    cy.getBySel(NAVIGATION_BANK_ACCOUNT).click();
  }

  static mockBankAccountRequestsToEmptyState() {
    cy.intercept("POST", Cypress.env("apiUrl") + "/graphql", (req) => {
      const { body } = req;
      if (body.hasOwnProperty("operationName") && body.operationName === "ListBankAccount") {
        req.alias = "ListBankAccountQuery";
        req.continue((res) => {
          res.body.data.listBankAccount[0] = [];
        });
      }
    });
  }

  static seedDatabase() {
    cy.task("db:seed");
  }

  static mockNotificationsToEmptyState() {
    cy.intercept("GET", Cypress.env("apiUrl") + "/notifications", {
      results: [],
    });
  }

  static validateNoNotificationCounter() {
    cy.getBySel(NOTIFICATION_BADGE).find("span").should("not.visible").and("have.text", 0);
  }

  static openNotificationsPage() {
    cy.getBySel(NOTIFICATION_BUTTON).click();
  }

  static interceptNotificationRequests() {
    cy.intercept("GET", "/notifications").as("notificationsList");
    cy.intercept("PATCH", "/notifications/*").as("updateNotification");
  }
}
