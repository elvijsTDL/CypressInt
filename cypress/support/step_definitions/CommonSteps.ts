import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { Common } from "../../pageObjects/Common";

Given(/^Base page is open$/, function () {
  Common.openMainPage();
});
Given(/^the database is seeded$/, function () {
  Common.seedDatabase();
});
Given(/^User is logged in with xState$/, function () {
  Common.loginUserWithxState();
});
Given(/^Notifications are mocked to an empty state$/, function () {
  Common.mockEmptyNotificationsState();
});
Given(/^Notifications counter does not show a number$/, function () {
  Common.notificationCounterDoesNotExist();
});
Given(/^User opens the notifications page$/, function () {
  Common.openNotificationPage();
});
Given(/^Logged in user gets switched to User B$/, function () {
  Common.switchToUserB();
});
Given(/^User intercepts the notification requests$/, function () {
  Common.interceptNotificationApiCalls();
});
Given(/^User intercepts the payment requests$/, function () {
  Common.interceptPaymentRequests();
});
