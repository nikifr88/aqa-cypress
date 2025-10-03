const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    pageLoadTimeout: 5000,
    defaultCommandTimeout: 300,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
