module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['@testing-library/jest-dom/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|scss)$': '<rootDir>/config/jestCssStub.ts',
        'uuid': require.resolve('uuid'),
    },
    testEnvironment: 'jsdom'
};
