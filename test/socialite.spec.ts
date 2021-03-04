import { STANDARD_TEST_TYPES, YOUTUBE_ONLY_TEST_TYPES } from './test-enums';
import { ALL_SOCIALS } from '../src/enums';
import assert from 'assert';
import socialite, { Social, SpotifyLink } from '../src';
import testUtils from './utils';

describe('socialite.extractUser(url, singleOperation=false)', () => {
    describe('FACEBOOK urls', () => {
        Object.keys(STANDARD_TEST_TYPES).forEach((key) => {
            describe(STANDARD_TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'facebook',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = socialite.extractUser(test.args[0]);

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
                        const extractedUsername = socialite.extractUser(test.args[0]);

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
                        const extractedUsername = socialite.extractUser(test.args[0]);

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
                        const extractedUsername = socialite.extractUser(test.args[0]);

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
                        const extractedUsername = socialite.extractUser(test.args[0]);

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
                        const extractedUsername = socialite.extractUser(test.args[0]);

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

describe('socialite.extractUser(url, singleOperation=true)', () => {
    describe('FACEBOOK urls', () => {
        Object.keys(STANDARD_TEST_TYPES).forEach((key) => {
            describe(STANDARD_TEST_TYPES[key], () => {
                var testCases = testUtils.getExtractUsernameTestCase(
                    'facebook',
                    STANDARD_TEST_TYPES[key],
                );

                testCases.forEach((test) => {
                    it(testUtils.getDescription(test), () => {
                        const extractedUsername = socialite.extractUser(
                            test.args[0],
                            true,
                        );

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
                        const extractedUsername = socialite.extractUser(
                            test.args[0],
                            true,
                        );

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
                        const extractedUsername = socialite.extractUser(
                            test.args[0],
                            true,
                        );

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
                        const extractedUsername = socialite.extractUser(
                            test.args[0],
                            true,
                        );

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
                        const extractedUsername = socialite.extractUser(
                            test.args[0],
                            true,
                        );

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
                        const extractedUsername = socialite.extractUser(
                            test.args[0],
                            true,
                        );

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

describe('socialite.buildUrl(username, type, linkType?)', () => {
    (Object.keys(ALL_SOCIALS) as Social[]).forEach((key: Social) => {
        describe(`Build ${key} urls`, () => {
            var testCases = testUtils.getBuildUrlTestCase('myUser', key);

            testCases.forEach((test) => {
                it(testUtils.getDescription(test), () => {
                    let builtUrl = '';
                    if (key === 'spotify') {
                        socialite.buildUrl(
                            test.args[0],
                            key,
                            test.args[1] as SpotifyLink,
                        );
                    } else {
                        builtUrl = socialite.buildUrl(test.args[0], key);
                    }
                    assert.strictEqual(builtUrl, test.expected);
                });
            });
        });
    });
});

describe('socialite.isValidDomain(url)', () => {
    describe('valid domains', () => {
        [
            'facebook.com',
            'instagram.com',
            'twitter.com',
            'soundcloud.com',
            'youtube.com',
            'open.spotify.com',
            'play.spotify.com',
        ].forEach((domain) => {
            it(`${domain} should be a valid domain`, () => {
                assert.strictEqual(socialite.isValidDomain(domain), true);
            });
        });
    });

    describe('invalid domains', () => {
        [
            'totallyLegit.com',
            'google.com',
            'bing.com',
            'notEvenADomain',
            'spotify.com',
        ].forEach((domain) => {
            it(`${domain} should be an invalid domain`, () => {
                assert.strictEqual(socialite.isValidDomain(domain), false);
            });
        });
    });
});
