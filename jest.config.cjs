// jest.config.cjs
const { createCjsPreset } = require('jest-preset-angular/presets');

module.exports = {
  ...createCjsPreset(),
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  testMatch: ['**/?(*.)+(spec).ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'mjs', 'json'],
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/polyfills.ts', '!src/environments/**'],
};