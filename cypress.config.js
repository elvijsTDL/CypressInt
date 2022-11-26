import { defineConfig } from "cypress";
import axios from "axios";
import dotenv from "dotenv";
import _ from "lodash";
import Promise from "bluebird";
const { devServer } = require("@cypress/react/plugins/react-scripts");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

dotenv.config();

module.exports = defineConfig({
  component: {
    devServer,
  },
  env: {
    apiUrl: "http://localhost:3001",
    defaultPassword: process.env.SEED_DEFAULT_USER_PASSWORD,
    paginationPageSize: process.env.PAGINATION_PAGE_SIZE,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/features/**.feature",
    viewportHeight: 1000,
    viewportWidth: 1280,
    async setupNodeEvents(on, config) {
      const testDataApiEndpoint = `${config.env.apiUrl}/testData`;
      const queryDatabase = ({ entity, query }, callback) => {
        const fetchData = async (attrs) => {
          const { data } = await axios.get(`${testDataApiEndpoint}/${entity}`);
          return callback(data, attrs);
        };
        return Array.isArray(query) ? Promise.map(query, fetchData) : fetchData(query);
      };

      await preprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        browserify.default(config, { typescript: require.resolve("typescript") })
      );

      on("task", {
        async "db:seed"() {
          const { data } = await axios.post(`${testDataApiEndpoint}/seed`);
          return data;
        },
        "filter:database"(queryPayload) {
          return queryDatabase(queryPayload, (data, attrs) => _.filter(data.results, attrs));
        },
        "find:database"(queryPayload) {
          return queryDatabase(queryPayload, (data, attrs) => _.find(data.results, attrs));
        },
      });
      return config;
    },
  },
});
