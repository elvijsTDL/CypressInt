/// <reference types="cypress" />

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get("[data-test=" + selector + "]", ...args);
});

Cypress.Commands.add("getByWildSel", (selector, ...args) => {
  return cy.get("[data-test*=" + selector + "]", ...args);
});

Cypress.Commands.add("database", (operation, entity, query) => {
  const params = {
    entity,
    query,
  };

  const log = Cypress.log({
    name: "database",
    displayName: "DATABASE",
    message: ["🔎 " + operation + "ing withing " + entity + "data"],
    autoEnd: false,
    consoleProps() {
      return params;
    },
  });

  return cy.task(operation + ":database", params, { log: false }).then((data) => {
    log.snapshot();
    log.end();
    return data;
  });
});

Cypress.Commands.add("loginByXState", (username, password = "s3cret") => {
  const log = Cypress.log({
    name: "xStateLogin",
    displayName: "LOGIN BY XSTATE",
    message: ["Logging in with: " + username + " 🧑🏼‍🚀"],
    autoEnd: false,
  });

  cy.intercept("POST", "/login").as("loginUser");
  cy.visit("/signin", { log: false }).then(() => {
    log.snapshot("before");
  });

  cy.window({ log: false }).then((win) => {
    win.authService.send("LOGIN", { username, password });
  });

  cy.wait("@loginUser").then((loginUser) => {
    log.set({
      consoleProps() {
        return {
          username,
          password,
          userId: loginUser.response?.body.user.id,
        };
      },
    });
  });

  return cy
    .getBySel("list-skeleton")
    .should("not.exist")
    .then(() => {
      log.snapshot("after");
      log.end();
    });
});

Cypress.Commands.add("logOutByXState", () => {
  cy.window({ log: false }).then((win) => {
    win.authService.send("LOGOUT");
  });
  cy.location("pathname").should("equal", "/signin");
  //cy.url().should("equal", Cypress.config("baseUrl") + "/signin");
});
