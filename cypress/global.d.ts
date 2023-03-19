/// <reference types="cypress" />

declare namespace Cypress {
  import { authService } from "../src/machines/authMachine";

  interface CustomWindow extends Window {
    authService: typeof authService;
  }
  interface Chainable {
    /**
     * Window object with custom properties for test cases with cy.window()
     */
    window(options?: Partial<Loggable & Timeoutable>): Chainable<CustomWindow>;

    /**
     * Get an element with data-test selector
     */
    getBySel(selector: string, args?: any): Chainable<JQuery<HTMLElement>>;

    /**
     * Get an element with a wildcard data-test*= selector
     */
    getByWildSel(selector: string, args?: any): Chainable<JQuery<HTMLElement>>;

    /**
     * Finding a single entity from the database
     */
    database(operation: "find", entity: string, query?: object): Chainable<any>;

    /**
     * Filtering for data entities from the database
     */
    database(operation: "filter", entity: string, query?: object): Chainable<any>;

    /**
     * Task to filter the data from the database while running the tests
     */
    task(
      event: "filter:database",
      arg: dbQueryArg,
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<any[]>;

    /**
     * Task to find some data from the database while running the tests
     */
    task(
      event: "find:database",
      arg: dbQueryArg,
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<any[]>;

    /**
     *  Logging in with Xstate by bypassing the UI and trigger Xstate login event
     */
    loginByXState(username: string, password?: string): Chainable<any>;

    /**
     *  Logging in with Xstate by bypassing the UI and trigger Xstate login event
     */
    logOutByXState(): Chainable<any>;
  }
}
