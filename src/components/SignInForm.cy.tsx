import SignInForm from "./SignInForm";
import { MemoryRouter } from "react-router-dom";
import * as React from "react";
import { authMachine } from "../machines/authMachine";
import { mount } from "@cypress/react";
import { interpret } from "xstate";

describe("Sign in form component level tests", () => {
  let authService: any;
  beforeEach(() => {
    authService = interpret(authMachine);
    authService.start();
  });

  it("Verifying that sign in form sends an api request to the BE", () => {
    cy.intercept("POST", "http://localhost:3001/login", {
      user: {
        id: "t45AiwidW",
        uuid: "6383f84e-b511-44c5-a835-3ece1d781fa8",
        firstName: "Edgar",
        lastName: "Johns",
        username: "Katharina_Bernier",
        password: "$2a$10$5PXHGtcsckWtAprT5/JmluhR13f16BL8SIGhvAKNP.Dhxkt69FfzW",
        email: "Norene39@yahoo.com",
        phoneNumber: "625-316-9882",
        avatar: "https://cypress-realworld-app-svgs.s3.amazonaws.com/t45AiwidW.svg",
        defaultPrivacyLevel: "public",
        balance: 168137,
        createdAt: "2019-08-27T23:47:05.637Z",
        modifiedAt: "2020-05-21T11:02:22.857Z",
      },
    }).as("loginPost");
    mount(
      <MemoryRouter>
        <SignInForm authService={authService} />
      </MemoryRouter>
    );
    cy.get("#username").type("Katharina_Bernier");
    cy.get("#password").type("s3cret");
    cy.get("[data-test=signin-submit").click();
    cy.wait("@loginPost");
    cy.get("[data-test=signin-error").should("not.exist");
  });
});
