module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'dist/config',
    'dist/tests',
    'dist/app.js',
    'lib/assets',
    'docs',
    'app.js',
    'config.ts',
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  modulePathIgnorePatterns: ['dist', 'docs'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  transform: { '\\.ts$': ['ts-jest'] },
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
};
