import { STANDARD_TEST_TYPES, YOUTUBE_ONLY_TEST_TYPES } from './test-enums';
import assert from 'assert';
import { extractUser } from '../src';
import testUtils from './utils';

describe('extractUser(url, singleOperation=false)', () => {
    describe('FACEBOOK urls', () => {
        Object.keys(STANDARD_TEST_TYPES).forEach((key) => {
            describe(STANDARD_TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'facebook',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = extractUser(test.args[0]);

                        assert.strictEqual(extractedUsername, test.expected);
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
                        const extractedUsername = extractUser(test.args[0]);

                        assert.strictEqual(extractedUsername, test.expected);
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
                        const extractedUsername = extractUser(test.args[0]);

                        assert.strictEqual(extractedUsername, test.expected);
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
                        const extractedUsername = extractUser(test.args[0]);

                        assert.strictEqual(extractedUsername, test.expected);
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
                        const extractedUsername = extractUser(test.args[0]);

                        assert.strictEqual(extractedUsername, test.expected);
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
                        const extractedUsername = extractUser(test.args[0]);

                        assert.strictEqual(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('SPOTIFY variant urls', () => {
        // TODO
    });
});

describe('extractUser, singleOperation)', () => {
    describe('FACEBOOK urls', () => {
        Object.keys(STANDARD_TEST_TYPES).forEach((key) => {
            describe(STANDARD_TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'facebook',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = extractUser(test.args[0], true);

                        assert.strictEqual(extractedUsername, test.expected);
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
                        const extractedUsername = extractUser(test.args[0], true);

                        assert.strictEqual(extractedUsername, test.expected);
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
                        const extractedUsername = extractUser(test.args[0], true);

                        assert.strictEqual(extractedUsername, test.expected);
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
                        const extractedUsername = extractUser(test.args[0], true);

                        assert.strictEqual(extractedUsername, test.expected);
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
                        const extractedUsername = extractUser(test.args[0], true);

                        assert.strictEqual(extractedUsername, test.expected);
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
                        const extractedUsername = extractUser(test.args[0], true);

                        assert.strictEqual(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('SPOTIFY variant urls', () => {
        // TODO
    });
});
