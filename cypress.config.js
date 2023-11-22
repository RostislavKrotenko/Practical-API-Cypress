const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  env: {
    username: "rostik.krotenko@gmail.com",
    password: "apple123",
    apiURL: "https://api.realworld.io"
  },
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/support'],
  },
})