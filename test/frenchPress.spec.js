const { TEST_TYPES } = require('./enums');
const assert = require('assert');
const frenchPress = require('../src');
const testUtils = require('./utils');

describe('frenchPress.extractUsername(url)', () => {
    describe('FACEBOOK urls', () => {
        Object.keys(TEST_TYPES).map((key) => {
            describe(TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'facebook',
                    TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = frenchPress.extractUsername(test.arg);

                        assert.equal(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('INSTRAGRAM urls', () => {
        Object.keys(TEST_TYPES).map((key) => {
            describe(TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'instragram',
                    TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = frenchPress.extractUsername(test.arg);

                        assert.equal(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('TWITTER urls', () => {
        Object.keys(TEST_TYPES).map((key) => {
            describe(TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'twitter',
                    TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = frenchPress.extractUsername(test.arg);

                        assert.equal(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('SOUNDCLOUD urls', () => {
        Object.keys(TEST_TYPES).map((key) => {
            describe(TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'soundcloud',
                    TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = frenchPress.extractUsername(test.arg);

                        assert.equal(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('YOUTUBE standard urls ("youtube.com/username")', () => {
        Object.keys(TEST_TYPES).map((key) => {
            describe(TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'youtube',
                    TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = frenchPress.extractUsername(test.arg);

                        assert.equal(extractedUsername, test.expected);
                    });
                });
            });
        });
    });
});
