import { defineConfig } from "cypress";
const { devServer } = require("@cypress/react/plugins/react-scripts");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

module.exports = defineConfig({
  component: {
    devServer,
  },

  e2e: {
    async setupNodeEvents(on, config) {
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        browserify.default(config, { typescript: require.resolve("typescript") })
      );
      return config;
    },
    specPattern: "cypress/features/**.feature",
    baseUrl: "http://localhost:3000",
  },
});
