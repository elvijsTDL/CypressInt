import { mount } from "@cypress/react";
import TransactionDateRangeFilter from "./TransactionDateRangeFilter";
import { format as formatDate } from "date-fns";

describe("Date filter test cases", () => {
  it("Date filter shows ALL , by default", () => {
    const filterDataRangeSpy = cy.spy();
    const resetDateRangeSpy = cy.spy();
    mount(
      <TransactionDateRangeFilter
        filterDateRange={filterDataRangeSpy}
        dateRangeFilters={{}}
        resetDateRange={resetDateRangeSpy}
      />
    );
    cy.get("[data-test=transaction-list-filter-date-range-button]").should("contain", "ALL");
  });

  it("Filter shows chosen range filters", () => {
    const filterDataRangeSpy = cy.spy();
    const resetDateRangeSpy = cy.spy();
    const dateRangeFilters = {
      dateRangeStart: new Date("Jan 01 2020").toISOString(),
      dateRangeEnd: new Date("Jan 01 2030").toISOString(),
    };
    mount(
      <TransactionDateRangeFilter
        filterDateRange={filterDataRangeSpy}
        dateRangeFilters={dateRangeFilters}
        resetDateRange={resetDateRangeSpy}
      />
    );
    cy.get("[data-test=transaction-list-filter-date-range-button]")
      .should("contain", formatDate(new Date(dateRangeFilters.dateRangeEnd), "MMM, d yyyy"))
      .and("contain", formatDate(new Date(dateRangeFilters.dateRangeStart), "MMM, d yyyy"));
  });

  it("Reset function is called when user clicks on the X button", () => {
    const filterDataRangeSpy = cy.spy();
    const resetDateRangeSpy = cy.spy().as("resetSpy");
    const dateRangeFilters = {
      dateRangeStart: new Date("Jan 01 2020").toISOString(),
      dateRangeEnd: new Date("Jan 01 2030").toISOString(),
    };
    mount(
      <TransactionDateRangeFilter
        filterDateRange={filterDataRangeSpy}
        dateRangeFilters={dateRangeFilters}
        resetDateRange={resetDateRangeSpy}
      />
    );
    cy.get("[data-test=transaction-list-filter-date-clear-button]").click();
    cy.get("@resetSpy").should("have.been.called");
  });

  it.only("Should set the date range correctly", () => {
    const log = Cypress.log({
      name: "pickingDateRange",
      displayName: "DATE RANGE",
      message: "Picking a range for the filter to be used",
      autoEnd: false,
      consoleProps() {
        return {
          something: "something can be put here for debugging if you want to",
        };
      },
    });
    const filterDataRangeSpy = cy.spy();
    const resetDateRangeSpy = cy.spy();
    mount(
      <TransactionDateRangeFilter
        filterDateRange={filterDataRangeSpy}
        dateRangeFilters={{}}
        resetDateRange={resetDateRangeSpy}
      />
    );
    log.snapshot("before");
    cy.get("[data-test=transaction-list-filter-date-range-button]").click();
    cy.get("[data-date=2022-11-26]").click();
    cy.get("[data-date=2022-11-30]")
      .click()
      .then(() => {
        log.snapshot("after");
        log.end();
      });
  });
});
