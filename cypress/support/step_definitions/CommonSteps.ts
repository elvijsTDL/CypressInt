import {Given} from "@badeball/cypress-cucumber-preprocessor";
import {Common} from "../../pageObjects/Common";

Given(/^Base page is open$/, function () {
    Common.openMainPage();
});
Given(/^the database is seeded$/, function () {
    Common.seedDatabase()
});
Given(/^User is logged in with xState$/, function () {
    Common.loginUserWithxState()
});
Given(/^Notifications are mocked to an empty state$/, function () {
    Common.mockEmptyNotificationsState()
});