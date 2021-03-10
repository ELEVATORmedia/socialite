import {
    SPOTIFY_ONLY_TEST_TYPES,
    STANDARD_TEST_TYPES,
    YOUTUBE_ONLY_TEST_TYPES,
} from './test-enums';
import assert from 'assert';
import { extractUser } from '../src';
import { getDescription, getExtractUsernameTestCase } from './utils';

describe('extractUser(url, singleOperation = false)', () => {
    describe('FACEBOOK urls', () => {
        Object.keys(STANDARD_TEST_TYPES).forEach((key) => {
            describe(STANDARD_TEST_TYPES[key], () => {
                var testCases = getExtractUsernameTestCase(
                    'facebook',
                    STANDARD_TEST_TYPES[key],
                );
                testCases.forEach((test) => {
                    it(getDescription(test), () => {
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
                var testCases = getExtractUsernameTestCase(
                    'instagram',
                    STANDARD_TEST_TYPES[key],
                );
                testCases.forEach((test) => {
                    it(getDescription(test), () => {
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
                var testCases = getExtractUsernameTestCase(
                    'twitter',
                    STANDARD_TEST_TYPES[key],
                );
                testCases.forEach((test) => {
                    it(getDescription(test), () => {
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
                var testCases = getExtractUsernameTestCase(
                    'soundcloud',
                    STANDARD_TEST_TYPES[key],
                );
                testCases.forEach((test) => {
                    it(getDescription(test), () => {
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
                var testCases = getExtractUsernameTestCase(
                    'youtube',
                    STANDARD_TEST_TYPES[key],
                );
                testCases.forEach((test) => {
                    it(getDescription(test), () => {
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
                var testCases = getExtractUsernameTestCase(
                    'youtube',
                    YOUTUBE_ONLY_TEST_TYPES[key],
                );
                testCases.forEach((test) => {
                    it(getDescription(test), () => {
                        const extractedUsername = extractUser(test.args[0]);
                        assert.strictEqual(extractedUsername, test.expected);
                    });
                });
            });
        });
    });
    describe('SPOTIFY variant urls', () => {
        const spotifyId = '31jkZXTNwXu0QNvAIG4psQ';
        Object.keys(SPOTIFY_ONLY_TEST_TYPES).forEach((key) => {
            describe(SPOTIFY_ONLY_TEST_TYPES[key], () => {
                var testCases = getExtractUsernameTestCase(
                    'spotify',
                    SPOTIFY_ONLY_TEST_TYPES[key],
                    key !== SPOTIFY_ONLY_TEST_TYPES.USER ? spotifyId : undefined,
                );

                testCases.forEach((test) => {
                    it(getDescription(test), () => {
                        const extractedUsername = extractUser(test.args[0]);

                        assert.strictEqual(extractedUsername, test.expected);
                    });
                });
            });
        });
    });
});

describe('extractUser(url, singleOperation = true)', () => {
    describe('FACEBOOK urls', () => {
        Object.keys(STANDARD_TEST_TYPES).forEach((key) => {
            describe(STANDARD_TEST_TYPES[key], () => {
                var testCases = getExtractUsernameTestCase(
                    'facebook',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(getDescription(test), () => {
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
                var testCases = getExtractUsernameTestCase(
                    'instagram',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(getDescription(test), () => {
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
                var testCases = getExtractUsernameTestCase(
                    'twitter',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(getDescription(test), () => {
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
                var testCases = getExtractUsernameTestCase(
                    'soundcloud',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(getDescription(test), () => {
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
                var testCases = getExtractUsernameTestCase(
                    'youtube',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(getDescription(test), () => {
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
                var testCases = getExtractUsernameTestCase(
                    'youtube',
                    YOUTUBE_ONLY_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(getDescription(test), () => {
                        const extractedUsername = extractUser(test.args[0], true);

                        assert.strictEqual(extractedUsername, test.expected);
                    });
                });
            });
        });
    });

    describe('SPOTIFY variant urls', () => {
        describe('SPOTIFY variant urls', () => {
            const spotifyId = '31jkZXTNwXu0QNvAIG4psQ';
            Object.keys(SPOTIFY_ONLY_TEST_TYPES).forEach((key) => {
                describe(SPOTIFY_ONLY_TEST_TYPES[key], () => {
                    var testCases = getExtractUsernameTestCase(
                        'spotify',
                        SPOTIFY_ONLY_TEST_TYPES[key],
                        key !== SPOTIFY_ONLY_TEST_TYPES.USER ? spotifyId : undefined,
                    );

                    testCases.forEach((test) => {
                        it(getDescription(test), () => {
                            const extractedUsername = extractUser(test.args[0], true);

                            assert.strictEqual(extractedUsername, test.expected);
                        });
                    });
                });
            });
        });
    });
});
