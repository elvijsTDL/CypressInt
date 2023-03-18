import Stepper from "./Stepper";
import * as React from "react";
import { mount } from "@cypress/react";

describe("Stepper tests", () => {
  it("Should increment and decrement", () => {
    mount(<Stepper />);
    cy.get("[data-cy=count]").should("have.text", 0);
    cy.get("[data-cy=increment]").click();
    cy.get("[data-cy=count]").should("have.text", 1);
    cy.get("[data-cy=decrement]").click();
    cy.get("[data-cy=count]").should("have.text", 0);
  });

  it("stepper can be initialized with an initial value", () => {
    mount(<Stepper initial={100} />);
    cy.get("[data-cy=count]").should("have.text", 100);
  });

  it("click on + calls the onChange react event and increments the value", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    mount(<Stepper onChange={onChangeSpy} />);
    cy.get("[data-cy=increment]").click();
    cy.get("[data-cy=count]").should("have.text", 1);
    cy.get("@onChangeSpy").should("have.been.calledWith", 1);
  });
});
