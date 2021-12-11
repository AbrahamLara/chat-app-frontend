module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  // If there are cases in which we need to transpile code from /node_modules because of a library see this link to
  // learn how: https://cli.vuejs.org/core-plugins/unit-jest.html#transform-dependencies-from-node-modules
  transformIgnorePatterns: ['/node_modules/'], // Default value
  setupFiles: ['<rootDir>/src/test/setupFile.ts'],
  moduleNameMapper: {
    '\\.temp\\.sass$': '<rootDir>/__mocks__/tempStylesMock.ts',
  },
  resetMocks: false,
};
