import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { MainPage } from "../../pageObjects/MainPage";
import { SignInPage } from "../../pageObjects/SignInPage";

Given(/^User inputs their login details$/, function () {
  SignInPage.inputUserDetails();
});
Given(/^User clicks on the sign in$/, function () {
  SignInPage.clickSignIn();
});
Then(/^User is redirected to the home page$/, function () {
  SignInPage.verifyHomePageUrl();
});

Given(/^User clicks on the sign up link$/, function () {
  SignInPage.clickSignUpLink();
});
Given(/^User inputs new user details$/, function () {
  SignInPage.inputNewUserDetails();
});
Given(/^User clicks on the the sign up button$/, function () {
  SignInPage.submitSigningUp();
});
Then(/^The new user can log into their account$/, function () {
  SignInPage.loginNewAccount();
  MainPage.verifyNewUserLoggedIn("Tester T");
});
Given(/^User clicks on the "(.*)"$/, function (field: string) {
  SignInPage.clickOnSignUpField(field);
});
Then(/^The (.*) has an error message saying (.*)$/, function (field:string,message:string) {
  SignInPage.verifySignUpFieldErrors(field, message)
});
Given(/^User clicks on the the disabled sign up button$/, function () {
  SignInPage.clickOnDisabledSignUpButton()
});