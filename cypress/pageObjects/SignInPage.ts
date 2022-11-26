const USERNAME_FIELD = "#username";
const PASSWORD_FIELD = "#password";
const SIGN_IN_BUTTON = "signin-submit";
const SIGN_UP_HREF = "signup";
const FIRST_NAME_FIELD = "#firstName";
const LAST_NAME_FIELD = "#lastName";
const CONFIRM_PASSWORD_FIELD = "#confirmPassword";
const SIGN_UP_BUTTON = "signup-submit";

export class SignInPage {
  static inputUserDetails() {
    cy.get(USERNAME_FIELD).type("Katharina_Bernier");
    cy.get(PASSWORD_FIELD).type("s3cret");
  }

  static clickSignIn() {
    cy.getBySel(SIGN_IN_BUTTON).click();
  }

  static verifyHomePageUrl() {
    cy.url().should("be.equal", Cypress.config("baseUrl") + "/");
  }

  static clickSignUpLink() {
    cy.getBySel(SIGN_UP_HREF).click();
  }

  static inputNewUserDetails() {
    cy.get(FIRST_NAME_FIELD).type("Tester");
    cy.get(LAST_NAME_FIELD).type("Tdler");
    cy.get(USERNAME_FIELD).type("amigo");
    cy.get(PASSWORD_FIELD).type("password123");
    cy.get(CONFIRM_PASSWORD_FIELD).type("password123");
  }

  static submitSigningUp() {
    cy.getBySel(SIGN_UP_BUTTON).click();
  }

  static loginNewAccount() {
    cy.get(USERNAME_FIELD).type("amigo");
    cy.get(PASSWORD_FIELD).type("password123");
    cy.getBySel(SIGN_IN_BUTTON).click();
  }

  static clickOnSignUpField(field: string) {
    cy.get("#" + field).click()
  }

  static verifySignUpFieldErrors(field: string, message: string) {
    cy.get("#" + field + "-helper-text").should("have.text",message)
  }

  static clickOnDisabledSignUpButton() {
    cy.getBySel(SIGN_UP_BUTTON).click({force:true});
  }
}
