/// <reference types="cypress" />

declare namespace Cypress {
  import { authService } from "../src/machines/authMachine"

  interface CustomWindow extends Window {
    authService: typeof authService;
  }

  interface Chainable {
    /**
     * Window object with custom properties during test cases for cy.window()
     */
    window(options?: Partial<Loggable & Timeoutable>): Chainable<CustomWindow>

    /**
     * Get an element with data-test selector
     */
    getBySel(selector: string, args?: any): Chainable<JQuery<HTMLElement>>;

    /**
     * Task to filter data from the database while running the tests
     */
    task(
        event: "filter:database",
        arg: dbQueryArg,
        options?: Partial<Loggable & Timeoutable>
    ): Chainable<any[]>

    /**
     * Task to find data from the database while running the tests
     */
    task(
        event: "find:database",
        arg: dbQueryArg,
        options?: Partial<Loggable & Timeoutable>
    ): Chainable<any[]>

    /**
     * Finding a single entity via database
     */
    database(operation: "find",entity:string,query?: object): Chainable<any>

    /**
     * Filtering for data entities via database query
     */
    database(operation: "filter",entity:string,query?: object): Chainable<any>

    /**
     * Logs in bypassing the UI by triggering an XState login event
     */
     loginByXstate(username:string,password?:string): Chainable<any>
  }
}
