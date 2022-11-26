import {Then} from "@badeball/cypress-cucumber-preprocessor";
import {MainPage} from "../../pageObjects/MainPage";

Then(/^User goes to the bank accounts section$/, function () {
    MainPage.goToBankAccountsSection()
});