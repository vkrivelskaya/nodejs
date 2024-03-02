module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ["<rootDir>"],
    silent: false,
    verbose: true,
    collectCoverageFrom: ['src/**'],
    coverageReporters: ['text'],
    coverageThreshold: {
        global: {
          lines: 85
        }
      }
  };