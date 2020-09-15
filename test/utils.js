const { STANDARD_TEST_TYPES, YOUTUBE_ONLY_TEST_TYPES } = require('./test-enums');

const { ALL_SOCIAL_DOMAINS } = require('../src/enums');

/**
 * Utility function to retrieve a standardized description for tests
 */
const getDescription = ({ arg, expected }) => {
    return `should output "${expected}" when given "${arg}"`;
};

/**
 * Retrieves an array of test cases per the enumeration type specified.
 *
 * @param {*} site e.g., "facebook"
 * @param {*} type  - enumaration of type see STANDARD_TEST_TYPES
 * @param {*} defaultUser  - expected user to use in test case.
 */
const getExtractUsernameTestCase = (site, type, defaultUser = 'myUser') => {
    const tests = [];

    switch (type) {
        case STANDARD_TEST_TYPES.ABSOLUTE_URLS:
            tests.push({
                arg: `https://www.${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `http://www.${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.NO_PROTOCOL:
            tests.push({
                arg: `www.${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.NO_WWW:
            tests.push({
                arg: `https://${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `http://${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.NAKED_DOMAIN:
            tests.push({
                arg: `${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.NO_INPUT:
            tests.push({
                arg: '',
                expected: '',
            });
            break;
        case STANDARD_TEST_TYPES.SPECIAL_CHARS:
            tests.push({
                arg: `${site}.com/@${defaultUser}`,
                expected: defaultUser,
            });
            /**
             * https://stackoverflow.com/questions/4364881/inserting-string-at-position-x-of-another-string
             */
            tests.push({
                arg: `${site}.com/@${[
                    defaultUser.slice(0, 1),
                    '@',
                    defaultUser.slice(1),
                ].join('')}`,
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.WRONG_DOMAIN:
            tests.push({
                arg: `https://www.totallylegit.com/${defaultUser}`,
                expected: '',
            });
            break;
        case STANDARD_TEST_TYPES.USERNAME_ONLY:
            tests.push({
                arg: defaultUser,
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.SPACES:
            tests.push({
                arg: `https://w ww. ${site}.com/ ${defaultUser} `,
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.DUPLICATE_INPUT:
            tests.push({
                arg: `${site}.com/@${defaultUser}${site}.com/@${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.PARTIAL_INPUT:
            tests.push({
                arg: `http://${site}.com/`,
                expected: '',
            });
            break;
        case YOUTUBE_ONLY_TEST_TYPES.CHANNEL_FULL:
            tests.push({
                arg: `https://www.youtube.com/channel/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `http://www.youtube.com/channel/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `www.youtube.com/channel/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `youtube.com/channel/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case YOUTUBE_ONLY_TEST_TYPES.CHANNEL_SHORTHAND:
            tests.push({
                arg: `https://www.youtube.com/c/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `http://www.youtube.com/c/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `www.youtube.com/c/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `youtube.com/c/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case YOUTUBE_ONLY_TEST_TYPES.LEGACY_USER:
            tests.push({
                arg: `https://www.youtube.com/user/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `http://www.youtube.com/user/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `www.youtube.com/user/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `youtube.com/user/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        // case YOUTUBE_ONLY_TEST_TYPES.STACKED_PATH:
        //     tests.push({
        //         arg: `youtube.com/user/c/channel/${defaultUser}`,
        //         expected: defaultUser,
        //     });
        //     tests.push({
        //         arg: `youtube.com/c/channel/user/${defaultUser}`,
        //         expected: defaultUser,
        //     });
        //     tests.push({
        //         arg: `youtube.com/c/user/channel/${defaultUser}`,
        //         expected: defaultUser,
        //     });
        //     tests.push({
        //         arg: `youtube.com/channel/user/c/${defaultUser}`,
        //         expected: defaultUser,
        //     });
        //     break;
        default:
            break;
    }

    return tests;
};

/**
 * Retrieves an array of test cases per the enumeration type specified.
 * These test cases pertain to rebuilding an absolute url path from a username
 *
 * @param {*} username e.g., "MyUser"
 * @param {*} type  - enumaration of type see ALL_SOCIAL_MEDIA
 */
const getBuildAbsoluteURLTestCase = (username = 'myUser', type) => {
    const tests = [];
    const domainPrefix = `https://www.${type.toLowerCase()}.com/`;
    switch (type) {
        case ALL_SOCIAL_DOMAINS.FACEBOOK:
        case ALL_SOCIAL_DOMAINS.INSTAGRAM:
        case ALL_SOCIAL_DOMAINS.TWITTER:
        case ALL_SOCIAL_DOMAINS.SOUNDCLOUD:
            tests.push({
                arg: username,
                expected: `${domainPrefix}${username}`,
            });
            tests.push({
                arg: '',
                expected: '',
            });
            tests.push({
                arg: `@${username}`,
                expected: `${domainPrefix}${username}`,
            });
            break;
        case ALL_SOCIAL_DOMAINS.YOUTUBE:
            tests.push({
                arg: username,
                expected: `${domainPrefix}${username}`,
            });
            tests.push({
                arg: `UC${username}`,
                expected: `${domainPrefix}channel/UC${username}`,
            });
            tests.push({
                arg: `HC${username}`,
                expected: `${domainPrefix}channel/HC${username}`,
            });
            tests.push({
                arg: `@HC${username}`,
                expected: `${domainPrefix}channel/HC${username}`,
            });
            tests.push({
                arg: `@UC${username}`,
                expected: `${domainPrefix}channel/UC${username}`,
            });
            tests.push({
                arg: '',
                expected: '',
            });
            break;
        default:
            break;
    }

    return tests;
};

exports.getDescription = getDescription;
exports.getExtractUsernameTestCase = getExtractUsernameTestCase;
exports.getBuildAbsoluteURLTestCase = getBuildAbsoluteURLTestCase;
