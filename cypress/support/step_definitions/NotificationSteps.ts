import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { NotificationsPage } from "../../pageObjects/NotificationsPage";

Given(/^Empty notifications screen is visible$/, function () {
  NotificationsPage.validateEmptyNotificationsScreen();
});
Given(/^User visits the transaction with User B$/, function () {
  NotificationsPage.visitUserBTransaction();
});
Given(/^User likes the transaction$/, function () {
  NotificationsPage.clickLikeButton();
});
Given(/^Logged in user gets switched to User B$/, function () {
  NotificationsPage.switchToUserB();
});
Given(/^The notification badge count is shown correctly$/, function () {
  NotificationsPage.verifyNotificationBadgeCount();
});
Given(/^User dismisses the notification$/, function () {
  NotificationsPage.dismissLastNotification();
});
