module.exports = {
    testEnvironment: "node",
    roots: ["./src"],
    setupFiles: ["<rootDir>/src/setupTests.js"],
    restoreMocks: true,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.js"],
    coveragePathIgnorePatterns: [
        "node_modules/",
        "src/index.js",
        "env"
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
