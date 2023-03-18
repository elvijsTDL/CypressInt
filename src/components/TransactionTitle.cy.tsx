import TransactionTitle from "./TransactionTitle";
import * as React from "react";
import { mount } from "@cypress/react";

it("Transaction titles are generated correctly", () => {
  cy.fixture("transactions").then((transactions) => {
    mount(<TransactionTitle transaction={transactions.results[0]} />);
  });
});
