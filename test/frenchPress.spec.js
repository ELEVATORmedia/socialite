const { STANDARD_TEST_TYPES, YOUTUBE_ONLY_TEST_TYPES } = require('./test-enums');
const { ALL_SOCIAL_DOMAINS } = require('../src/enums');
const assert = require('assert');
const frenchPress = require('../src');
const testUtils = require('./utils');

describe('frenchPress.plunge(url)', () => {
    describe('FACEBOOK urls', () => {
        Object.keys(STANDARD_TEST_TYPES).forEach((key) => {
            describe(STANDARD_TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'facebook',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = frenchPress.plunge(test.arg);

                        assert.equal(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('INSTAGRAM urls', () => {
        Object.keys(STANDARD_TEST_TYPES).forEach((key) => {
            describe(STANDARD_TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'instagram',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = frenchPress.plunge(test.arg);

                        assert.equal(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('TWITTER urls', () => {
        Object.keys(STANDARD_TEST_TYPES).forEach((key) => {
            describe(STANDARD_TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'twitter',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = frenchPress.plunge(test.arg);

                        assert.equal(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('SOUNDCLOUD urls', () => {
        Object.keys(STANDARD_TEST_TYPES).forEach((key) => {
            describe(STANDARD_TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'soundcloud',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = frenchPress.plunge(test.arg);

                        assert.equal(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('YOUTUBE standard urls ("youtube.com/username")', () => {
        Object.keys(STANDARD_TEST_TYPES).forEach((key) => {
            describe(STANDARD_TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'youtube',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = frenchPress.plunge(test.arg);

                        assert.equal(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('YOUTUBE variant urls ("youtube.com/c/", "youtube.com/channel", "youtube.com/user/)', () => {
        Object.keys(YOUTUBE_ONLY_TEST_TYPES).forEach((key) => {
            describe(YOUTUBE_ONLY_TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'youtube',
                    YOUTUBE_ONLY_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = frenchPress.plunge(test.arg);

                        assert.equal(extractedUsername, test.expected);
                    });
                });
            });
        });
    });
});

describe('frenchPress.unbrew(username, type)', () => {
    Object.keys(ALL_SOCIAL_DOMAINS).forEach((key) => {
        describe(`Build ${key} urls`, () => {
            var testCases = testUtils.getBuildAbsoluteURLTestCase('myUser', key);

            testCases.forEach((test) => {
                it(testUtils.getDescription(test), () => {
                    const extractedUsername = frenchPress.unbrew(
                        test.arg,
                        key.toLowerCase(),
                    );

                    assert.equal(extractedUsername, test.expected);
                });
            });
        });
    });
});

describe('frenchPress.isValidDomain(url)', () => {
    describe('valid domains', () => {
        [
            'facebook.com',
            'instagram.com',
            'twitter.com',
            'soundcloud.com',
            'youtube.com',
        ].forEach((domain) => {
            it(`${domain} should be a valid domain`, () => {
                assert.equal(frenchPress.isValidDomain(domain), true);
            });
        });
    });

    describe('invalid domains', () => {
        ['totallyLegit.com', 'google.com', 'bing.com', 'notEvenADomain'].forEach(
            (domain) => {
                it(`${domain} should be a valid domain`, () => {
                    assert.equal(frenchPress.isValidDomain(domain), false);
                });
            },
        );
    });
});
