const USERNAME_FIELD = "#username";
const PASSWORD_FIELD = "#password";
const SIGN_IN_BUTTON = "[data-test=signin-submit]";
const SIGN_UP_LINK = "[data-test=signup]";
const FIRST_NAME_FIELD = "#firstName";
const LAST_NAME_FIELD = "#lastName";
const CONFIRM_PASSWORD_FIELD = "#confirmPassword";
const SIGN_UP_BUTTON = "[data-test=signup-submit]";

export class SignInPage {
  static visitBasePage() {
    cy.visit("/");
  }

  static inputUserDetails() {
    cy.get(USERNAME_FIELD).type("Katharina_Bernier");
    cy.get(PASSWORD_FIELD).type("s3cret");
  }

  static clickSignIn() {
    cy.get(SIGN_IN_BUTTON).click();
  }

  static verifyHomePageUrl() {
    cy.url().should("be.equal", Cypress.config("baseUrl") + "/");
  }

  static clickSignUp() {
    cy.get(SIGN_UP_LINK).click();
  }

  static inputNewUserDetails() {
    cy.get(FIRST_NAME_FIELD).type("Tester");
    cy.get(LAST_NAME_FIELD).type("Foo");
    cy.get(USERNAME_FIELD).type("user123");
    cy.get(PASSWORD_FIELD).type("password123");
    cy.get(CONFIRM_PASSWORD_FIELD).type("password123");
  }

  static clickSubmitSignUp() {
    cy.get(SIGN_UP_BUTTON).click();
  }

  static logInWithNewAccount() {
    cy.get(USERNAME_FIELD).type("user123");
    cy.get(PASSWORD_FIELD).type("password123");
    cy.get(SIGN_IN_BUTTON).click();
  }

  static clickOnField(field: string) {
    cy.get("#" + field).click();
  }

  static validateFieldError(field: string, error: string) {
    cy.get("#" + field + "-helper-text")
      .should("have.text", error)
      .and("be.visible");
  }

  static clickOnDisabledSignUpButton() {
    cy.get(SIGN_UP_BUTTON).click({ force: true });
  }
}
