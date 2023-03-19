import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Common } from "../../pageObjects/Common";

Given(/^User is logged in with xState$/, function () {
  Common.loginWithXState();
});
Then(/^User goes to the bank accounts section$/, function () {
  Common.goToBankAccountSection();
});
Then(/^Bank account requests are mocked to an empty state$/, function () {
  Common.mockBankAccountRequestsToEmptyState();
});
Given(/^The database is seeded$/, function () {
  Common.seedDatabase();
});
Given(/^Notifications are mocked to an empty state$/, function () {
  Common.mockNotificationsToEmptyState();
});
Given(/^Notifications counter is not visible by the bell$/, function () {
  Common.validateNoNotificationCounter();
});
Given(/^User opens the notifications page$/, function () {
  Common.openNotificationsPage();
});
Given(/^User intercepts the notification requests$/, function () {
  Common.interceptNotificationRequests();
});
