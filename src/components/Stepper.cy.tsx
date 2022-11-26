import Stepper from "./Stepper";
import * as React from "react";
import { mount } from "@cypress/react";

describe("Stepper tests", () => {
  it("should increment and decrement", () => {
    mount(<Stepper />);
    cy.get('[data-cy="counter"]').should("contain", "0");
    cy.get('[data-cy="increment"]').click();
    cy.get('[data-cy="counter"]').should("contain", "1");
    cy.get('[data-cy="decrement"]').click();
    cy.get('[data-cy="counter"]').should("contain", "0");
  });

  it("stepper can be initialized with an initial value", () => {
    mount(<Stepper initial={100} />);
    cy.get('[data-cy="counter"]').should("contain", "100");
  });

  it("clicking on + calls the onChange event and increments the value", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    mount(<Stepper onChange={onChangeSpy} />);
    cy.get('[data-cy="increment"]').click();
    cy.get("@onChangeSpy").should("have.been.calledWith", 1);
  });
});
