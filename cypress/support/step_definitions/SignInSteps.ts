import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { SignInPage } from "../../pageObjects/SignInPage";

Given(/^Main page is visited$/, function () {
  SignInPage.visitBasePage();
});
Given(/^User inputs their login details$/, function () {
  SignInPage.inputUserDetails();
});
Given(/^User clicks on the sign in button$/, function () {
  SignInPage.clickSignIn();
});
Then(/^User is redirected to the home page$/, function () {
  SignInPage.verifyHomePageUrl();
});
Given(/^User clicks on the sign up link$/, function () {
  SignInPage.clickSignUp();
});
Given(/^User inputs new user details$/, function () {
  SignInPage.inputNewUserDetails();
});
Given(/^User clicks on the sign up button$/, function () {
  SignInPage.clickSubmitSignUp();
});
Then(/^The new user can log into their account$/, function () {
  SignInPage.logInWithNewAccount();
  SignInPage.verifyHomePageUrl();
});
Given(/^User clicks on the "([^"]*)"$/, function (field: string) {
  SignInPage.clickOnField(field);
});
Then(/^(.*) has an error message saying (.*)$/, function (field: string, error: string) {
  SignInPage.validateFieldError(field, error);
});
Given(/^User clicks on the disabled sign up button$/, function () {
  SignInPage.clickOnDisabledSignUpButton();
});
