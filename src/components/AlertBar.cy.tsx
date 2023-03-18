import AlertBar from "./AlertBar";
import * as React from "react";
import { Severities, snackbarMachine } from "../machines/snackbarMachine";
import { mount } from "@cypress/react";
import { interpret } from "xstate";

describe("Alert bar states", () => {
  const SeverityValues = Object.values(Severities);
  let snackbarService: any;
  beforeEach(() => {
    snackbarService = interpret(snackbarMachine);
    snackbarService.start();
  });

  SeverityValues.forEach((severity) => {
    it("Alert bar shows a " + severity + " message", () => {
      const payload = { type: "SHOW", severity, message: "Testing" };
      snackbarService.send(payload);
      expect(snackbarService.state.value).to.equal("visible");
      mount(<AlertBar snackbarService={snackbarService} />);
      cy.get("[data-test*=alert-bar]").should("be.visible");
    });
  });

  it("Alert bar dissapears after 3 seconds", () => {
    const payload = { type: "SHOW", severity: "error", message: "Testing" };
    snackbarService.send(payload);
    expect(snackbarService.state.value).to.equal("visible");
    mount(<AlertBar snackbarService={snackbarService} />);
    cy.get("[data-test*=alert-bar]").should("be.visible");
    cy.get("[data-test*=alert-bar]").should("not.exist");
  });
});
