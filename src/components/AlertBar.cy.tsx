import { mount } from "@cypress/react";
import AlertBar from "./AlertBar";
import { Severities, snackbarMachine } from "../machines/snackbarMachine";
import { interpret } from "xstate";

describe("Alert bar states", () => {
  const SeverityValues = Object.values(Severities);
  let snackbarService: any;
  beforeEach(() => {
    snackbarService = interpret(snackbarMachine);
    snackbarService.start();
    expect(snackbarService.state.value).to.equal("invisible");
  });

  SeverityValues.forEach((severity) => {
    it("Alert bar shows " + severity + " message", () => {
      const payload = { type: "SHOW", severity, message: "Testing" };
      snackbarService.send(payload);
      expect(snackbarService.state.value).to.equal("visible");
      mount(<AlertBar snackbarService={snackbarService} />);
    });
  });
});
