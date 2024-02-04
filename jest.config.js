module.exports = {
    setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/config/jestCssStub.js'
    },
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        'node_modules/(?!uuid)'
    ]
};
