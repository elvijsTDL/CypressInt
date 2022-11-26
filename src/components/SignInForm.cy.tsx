import { mount } from "@cypress/react";
import { MemoryRouter } from "react-router-dom";
import { interpret } from "xstate";
import { authMachine } from "../machines/authMachine";
import SignInForm from "./SignInForm";

describe("Sign in form component tests", () => {
  let authService: any;
  beforeEach(() => {
    authService = interpret(authMachine);
    authService.start();
    expect(authService.state.value).to.equal("unauthorized");
  });

  it("Verifying that sign in form sends an api request to the backend", () => {
    cy.intercept("POST", "http://localhost:3001/login", {
      user: {
        avatar: "https://cypress-realworld-app-svgs.s3.amazonaws.com/t45AiwidW.svg",
        balance: 168137,
        createdAt: "2019-08-27T23:47:05.637Z",
        defaultPrivacyLevel: "public",
        email: "Norene39@yahoo.com",
        firstName: "Edgar",
        id: "t45AiwidW",
        lastName: "Johns",
        modifiedAt: "2020-05-21T11:02:22.857Z",
        password: "$2a$10$5PXHGtcsckWtAprT5/JmluhR13f16BL8SIGhvAKNP.Dhxkt69FfzW",
        phoneNumber: "625-316-9882",
        username: "Katharina_Bernier",
        uuid: "6383f84e-b511-44c5-a835-3ece1d781fa8",
      },
    }).as("loginPost");
    mount(
      <MemoryRouter>
        <SignInForm authService={authService} />
      </MemoryRouter>
    );
    cy.get("#username").type("Katharina_Bernier");
    cy.get("#password").type("s3cret");
    cy.get("[data-test=signin-submit]").click();
    cy.wait("@loginPost");
    cy.get("[data-test=signin-error]").should("not.exist");
  });
});
