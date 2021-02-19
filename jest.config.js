module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    moduleDirectories: ['node_modules', 'src'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
};
