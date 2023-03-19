import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { BankAccountPage } from "../../pageObjects/BankAccountPage";

Then(/^User can see an empty bank account screen$/, function () {
  BankAccountPage.validateEmptyBankState();
});
