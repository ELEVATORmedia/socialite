const { TEST_TYPES } = require('./enums');

/**
 * Utility function to retrieve a standardized description for tests
 */
const getDescription = ({ arg, expected }) => {
    return `should output "${expected}" when given "${arg}"`;
};

/**
 * Retrieves an array of test cases per the enumeration type specified.
 *
 *
 *
 * @param {*} site e.g., "facebook"
 * @param {*} type  - enumaration of type see TEST_TYPES
 * @param {*} defaultUser  - expected user to use in test case.
 */
const getExtractUsernameTestCase = (site, type, defaultUser = 'myUser') => {
    const tests = [];

    switch (type) {
        case TEST_TYPES.ABSOLUTE_URLS:
            tests.push({
                arg: `https://www.${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `http://www.${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case TEST_TYPES.NO_PROTOCOL:
            tests.push({
                arg: `www.${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case TEST_TYPES.NO_WWW:
            tests.push({
                arg: `https://${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            tests.push({
                arg: `http://${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case TEST_TYPES.NAKED_DOMAIN:
            tests.push({
                arg: `${site}.com/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case TEST_TYPES.NO_INPUT:
            tests.push({
                arg: '',
                expected: '',
            });
            break;
        case TEST_TYPES.SPECIAL_CHARS:
            tests.push({
                arg: `${site}.com/@${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case TEST_TYPES.WRONG_DOMAIN:
            tests.push({
                arg: `https://www.totallylegit.com/${defaultUser}`,
                expected: defaultUser,
            });
            break;
        case TEST_TYPES.USERNAME_ONLY:
            tests.push({
                arg: defaultUser,
                expected: defaultUser,
            });
            break;
        case TEST_TYPES.SPACES:
            tests.push({
                arg: `https://w ww. ${site}.com/ ${defaultUser} `,
                expected: defaultUser,
            });
            break;
        default:
            break;
    }

    return tests;
};

exports.getDescription = getDescription;
exports.getExtractUsernameTestCase = getExtractUsernameTestCase;
