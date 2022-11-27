import {Then} from "@badeball/cypress-cucumber-preprocessor";
import {MainPage} from "../../pageObjects/MainPage";
import {BankAccountPage} from "../../pageObjects/BankAccountPage";

Then(/^User goes to the bank accounts section while mocking empty bank account list$/, function () {
    MainPage.goToBankAccountsSectionAndMockEmptyList()
});
Then(/^Empty bank account onboarding view is visible$/, function () {
    BankAccountPage.validateNoBankAccountOnboarding()
});