module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
    transform: {
        '^.+\\.tsx?$': 'babel-jest',
    },
}
