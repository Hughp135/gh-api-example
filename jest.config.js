module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/src/config/CssStub.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
