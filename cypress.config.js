const { defineConfig } = require("cypress");
import fs from 'fs-extra'
import path from 'path'

const getConfigurationByFile = (file) => {
  const pathToConfigFile = path.resolve('config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true,
    reportFilename: 'report'
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    pageLoadTimeout: 5000,
    defaultCommandTimeout: 300,
    setupNodeEvents(on, config) {
      const file = config.env.configFile || 'qauto'
      return getConfigurationByFile(file)
    },
  },
});
