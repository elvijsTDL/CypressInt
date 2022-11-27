import { Transaction } from "../../src/models";
import { User } from "../../src/models";

const NO_NOTIFICATIONS_MESSAGE = "empty-list-header";
const NO_NOTIFICATIONS_IMAGE = "empty-list-children";
const NOTIFICATIONS_LIST = "notifications-list";
const LIKE_COUNTER = "transaction-like-count";
const LIKE_BUTTON = "transaction-like-button";
const DISMISS_BUTTONS = "notification-mark-read";
const NOTIFICATION_BADGE = "nav-top-notifications-count";

export class NotificationsPage {
  static verifyEmptyNotificationScreen() {
    cy.getBySel(NO_NOTIFICATIONS_MESSAGE).should("be.visible").and("have.text", "No Notifications");
    cy.getBySel(NO_NOTIFICATIONS_IMAGE).should("be.visible");
    cy.getBySel(NOTIFICATIONS_LIST).should("not.exist");
  }

  static visitUserBTransaction() {
    let userB: User;
    cy.database("filter", "users").then((users: User[]) => {
      userB = users[1];
      cy.database("find", "transactions", { senderId: userB.id }).then(
        (transaction: Transaction) => {
          cy.visit(`/transaction/${transaction.id}`);
        }
      );
    });
  }

  static likeTransaction() {
    cy.getByWildSel(LIKE_COUNTER).should("contain.text", 0);
    cy.getByWildSel(LIKE_BUTTON).click();
    cy.getByWildSel(LIKE_COUNTER).should("contain.text", 1);
    cy.getByWildSel(LIKE_BUTTON).should("be.disabled");
    cy.wait("@notificationsList");
  }

  static dismissFirstNotification() {
    //No elements or requests to wait for , sadly using impilicits waits, feel free to shame me
    cy.wait(10000);
    cy.getByWildSel(DISMISS_BUTTONS).first().click({ force: true });

    cy.wait("@updateNotification");
    cy.get("@countBeforeDismissal").then((count) => {
      // @ts-ignore
      cy.getBySel(NOTIFICATION_BADGE).should("have.text", Number(count - 1).toString());
    });
  }
}
