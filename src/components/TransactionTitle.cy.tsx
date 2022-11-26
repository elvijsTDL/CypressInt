import * as React from "react";
import { mount } from "@cypress/react";
import TransactionTitle from "./TransactionTitle";

it("Transaction title", () => {
  cy.fixture("public-transactions.json").then((transactions) => {
    mount(<TransactionTitle transaction={transactions.results[0]} />);
    cy.get("[data-test*=transaction-sender").should(
      "have.text",
      transactions.results[0].senderName
    );
  });
});
