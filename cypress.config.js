import { defineConfig } from "cypress";
const { devServer } = require("@cypress/react/plugins/react-scripts");

module.exports = defineConfig({
  component: {
    devServer,
  },
});
