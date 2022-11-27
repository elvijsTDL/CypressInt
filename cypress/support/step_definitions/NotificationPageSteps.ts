import {Given} from "@badeball/cypress-cucumber-preprocessor";
import {NotificationsPage} from "../../pageObjects/NotificationsPage";
import {Common} from "../../pageObjects/Common";

Given(/^Empty notifications screen is visible$/, function () {
    NotificationsPage.verifyEmptyNotificationScreen()
});
Given(/^User visits the transaction with User B$/, function () {
    NotificationsPage.visitUserBTransaction()
});
Given(/^The user likes the transaction$/, function () {
    NotificationsPage.likeTransaction()
});
Given(/^The notification badge count is shown correctly$/, function () {
    Common.verifyNotificationBadgeCount()
});
Given(/^User dismisses the notification$/, function () {
    NotificationsPage.dismissFirstNotification()
});