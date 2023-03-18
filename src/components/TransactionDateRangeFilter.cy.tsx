import { mount } from "@cypress/react";
import TransactionDateRangeFilter from "./TransactionDateRangeFilter";
import { format as formatDate } from "date-fns";

describe("Date filter test cases", () => {
  it("Date filter showing ALL if no dates are filtered", () => {
    const filterDateRangeSpy = cy.spy();
    const resetDateRangeSpy = cy.spy();
    mount(
      <TransactionDateRangeFilter
        filterDateRange={filterDateRangeSpy}
        dateRangeFilters={{}}
        resetDateRange={resetDateRangeSpy}
      />
    );
    cy.get('[data-test="transaction-list-filter-date-range-button"]').should("contain", "ALL");
  });

  it("Filter showing the chosen range filters", () => {
    const filterDateRangeSpy = cy.spy();
    const resetDateRangeSpy = cy.spy();
    const dateRangeFilters = {
      dateRangeStart: new Date("Jan 01 2020").toISOString(),
      dateRangeEnd: new Date("Jan 01 2030").toISOString(),
    };
    mount(
      <TransactionDateRangeFilter
        filterDateRange={filterDateRangeSpy}
        dateRangeFilters={dateRangeFilters}
        resetDateRange={resetDateRangeSpy}
      />
    );

    cy.get('[data-test="transaction-list-filter-date-range-button"]')
      .should("contain", formatDate(new Date(dateRangeFilters.dateRangeStart), "MMM, d yyyy"))
      .and("contain", formatDate(new Date(dateRangeFilters.dateRangeEnd), "MMM, d yyyy"));
  });

  it("Reset function is called when user clicks on the x button", () => {
    const filterDateRangeSpy = cy.spy();
    const resetDateRangeSpy = cy.spy().as("resetSpy");
    const dateRangeFilters = {
      dateRangeStart: new Date("Jan 01 2020").toISOString(),
      dateRangeEnd: new Date("Jan 01 2030").toISOString(),
    };
    mount(
      <TransactionDateRangeFilter
        filterDateRange={filterDateRangeSpy}
        dateRangeFilters={dateRangeFilters}
        resetDateRange={resetDateRangeSpy}
      />
    );
    cy.get('[data-test="transaction-list-filter-date-clear-button"]').click();
    cy.get("@resetSpy").should("have.been.called");
  });

  it.only("Should set the date range correctly", () => {
    const log = Cypress.log({
      name: "pickingDateRange",
      displayName: "DATE RANGE",
      message: "Picking a range for the filter to use",
      autoEnd: false,
      consoleProps() {
        return {
          something:
            "Something that might be worthwhile printing for debugging in dev tools if you need it",
        };
      },
    });
    const filterDateRangeSpy = cy.spy();
    const resetDateRangeSpy = cy.spy();
    mount(
      <TransactionDateRangeFilter
        filterDateRange={filterDateRangeSpy}
        dateRangeFilters={{}}
        resetDateRange={resetDateRangeSpy}
      />
    );
    log.snapshot("before");
    cy.get('[data-test="transaction-list-filter-date-range-button"]').click();
    cy.get("[data-date=2023-03-18]").click();
    cy.get("[data-date=2023-03-23]")
      .click()
      .then(() => {
        log.snapshot("after");
        log.end();
      });
  });
});
