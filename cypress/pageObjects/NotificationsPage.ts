import { EMPTY_LIST_MESSAGE, NOTIFICATION_BADGE } from "./Common";
import { User, Transaction } from "../../src/models";

const LIKE_BUTTON = "transaction-like-button";
const DISMISS_BUTTONS = "notification-mark-read";

export class NotificationsPage {
  static validateEmptyNotificationsScreen() {
    cy.getBySel(EMPTY_LIST_MESSAGE).should("have.text", "No Notifications");
  }

  static visitUserBTransaction() {
    let userB: User;
    cy.database("filter", "users").then((users: User[]) => {
      userB = users[1];
      cy.database("find", "transactions", { senderId: userB.id }).then(
        (transaction: Transaction) => {
          cy.visit("/transaction/" + transaction.id);
        }
      );
    });
  }

  static clickLikeButton() {
    cy.getByWildSel(LIKE_BUTTON).click();
  }

  static switchToUserB() {
    cy.logOutByXState();
    cy.database("filter", "users").then((users: User[]) => {
      cy.loginByXState(users[1].username);
    });
  }

  static verifyNotificationBadgeCount() {
    cy.wait("@notificationsList")
      .its("response.body.results.length")
      .then((count) => {
        cy.getBySel(NOTIFICATION_BADGE).should("have.text", count + 1);
        cy.wrap(count).as("countBeforeDismissal");
      });
  }

  static dismissLastNotification() {
    cy.getByWildSel(DISMISS_BUTTONS)
      .its("length")
      .then((lengthBeforeClick) => {
        cy.getByWildSel(DISMISS_BUTTONS).first().click({ scrollBehavior: "center" });
        cy.getByWildSel(DISMISS_BUTTONS)
          .its("length")
          .then((lengthAfterClick) => {
            if (lengthBeforeClick === lengthAfterClick) {
              // eslint-disable-next-line cypress/no-unnecessary-waiting
              cy.wait(500);
              cy.getByWildSel(DISMISS_BUTTONS).first().click({ scrollBehavior: "center" });
            }
          });
      });
    cy.getByWildSel(DISMISS_BUTTONS).first().click({ scrollBehavior: "center" });
    cy.wait("@updateNotification");
    cy.get("@countBeforeDismissal").then((count) => {
      cy.getBySel(NOTIFICATION_BADGE).should("have.text", Number(count).toString());
    });
  }
}
