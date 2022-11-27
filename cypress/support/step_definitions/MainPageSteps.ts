import { Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { MainPage } from "../../pageObjects/MainPage";
import { BankAccountPage } from "../../pageObjects/BankAccountPage";
import { Common } from "../../pageObjects/Common";

Then(/^User goes to the bank accounts section while mocking empty bank account list$/, function () {
  MainPage.goToBankAccountsSectionAndMockEmptyList();
});
Then(/^Empty bank account onboarding view is visible$/, function () {
  BankAccountPage.validateNoBankAccountOnboarding();
});
Given(/^I intercept the calls$/, function () {
  Common.interceptNotificationApiCalls();
});
Given(/^User creates a transaction to User B with UI$/, function () {
  MainPage.createTransactionToUserB();
});
Given(
  /^The User B has received the payment and the transaction is visible in the main page$/,
  function () {
    MainPage.validateSuccessfulPaymentTransaction();
  }
);
