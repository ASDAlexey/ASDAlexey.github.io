import { pathsToModuleNameMapper } from 'ts-jest';

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/app/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: true,
  coverageThreshold: { global: { branches: 50, functions: 45, lines: 50, statements: -55 } },
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  coverageDirectory: 'coverage/currency-angular',
  moduleNameMapper: pathsToModuleNameMapper(
    // get data paths from tsconfig.json, ES modules can't import json compilerOptions.paths
    {
      '@app/*': ['app/*'],
      '@env/*': ['app/environments/*'],
      'ui-kit-lib': ['dist/ui-kit-lib'],
    },
    { prefix: '<rootDir>/' },
  ),
  globals: {
    $ENV: {
      ENVIRONMENT: '',
      SIGNALING_URL: '',
      API_URL: '',
      AUTH_TYPE: 'application',
    },
  },
};
