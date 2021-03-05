import {
    STANDARD_TEST_TYPES,
    YOUTUBE_ONLY_TEST_TYPES,
    SPOTIFY_ONLY_TEST_TYPES,
} from './test-enums';
import { ALL_SOCIALS } from '../src/enums';
import { Social } from '../src/types/socials';

interface TestCase {
    expected: string;
    args: string[];
}
// args: string[]; expected: string; args: [ never };

/**
 * Utility function to retrieve a standardized description for tests
 */
const getDescription = ({ args, expected }: TestCase) => {
    return `should output "${expected}" when given "${args.join(', ')}"`;
};

/**
 * Retrieves an array of test cases per the enumeration type specified.
 *
 * @param {*} site e.g., "facebook"
 * @param {*} type  - enumaration of type see STANDARD_TEST_TYPES
 * @param {*} defaultUser  - expected user to use in test case.
 */
const getExtractUsernameTestCase = (
    site: Social,
    testType: string,
    defaultUser = 'myUser',
) => {
    const tests: TestCase[] = [];
    const spotifyDomainPrefix = `https://open.spotify.com/`;

    switch (testType) {
        case STANDARD_TEST_TYPES.ABSOLUTE_URLS:
            tests.push({
                args: [`https://www.${site}.com/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`http://www.${site}.com/${defaultUser}`],
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.NO_PROTOCOL:
            tests.push({
                args: [`www.${site}.com/${defaultUser}`],
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.NO_WWW:
            tests.push({
                args: [`https://${site}.com/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`http://${site}.com/${defaultUser}`],
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.NAKED_DOMAIN:
            tests.push({
                args: [`${site}.com/${defaultUser}`],
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.NO_INPUT:
            tests.push({
                args: [''],
                expected: '',
            });
            break;
        case STANDARD_TEST_TYPES.SPECIAL_CHARS:
            tests.push({
                args: [`${site}.com/@${defaultUser}`],
                expected: defaultUser,
            });
            /**
             * https://stackoverflow.com/questions/4364881/inserting-string-at-position-x-of-another-string
             */
            tests.push({
                args: [
                    `${site}.com/@${[
                        defaultUser.slice(0, 1),
                        '@',
                        defaultUser.slice(1),
                    ].join('')}`,
                ],
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.WRONG_DOMAIN:
            tests.push({
                args: [`https://www.totallylegit.com/${defaultUser}`],
                expected: '',
            });
            break;
        case STANDARD_TEST_TYPES.USERNAME_ONLY:
            tests.push({
                args: [defaultUser],
                expected: '',
            });
            break;
        case STANDARD_TEST_TYPES.SPACES:
            tests.push({
                args: [`https://w ww. ${site}.com/ ${defaultUser} `],
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.DUPLICATE_INPUT:
            tests.push({
                args: [`${site}.com/@${defaultUser}${site}.com/@${defaultUser}`],
                expected: defaultUser,
            });
            break;
        case STANDARD_TEST_TYPES.PARTIAL_INPUT:
            tests.push({
                args: [`http://${site}.com/`],
                expected: '',
            });
            break;
        case YOUTUBE_ONLY_TEST_TYPES.CHANNEL_FULL:
            tests.push({
                args: [`https://www.youtube.com/channel/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`http://www.youtube.com/channel/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`www.youtube.com/channel/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`youtube.com/channel/${defaultUser}`],
                expected: defaultUser,
            });
            break;
        case YOUTUBE_ONLY_TEST_TYPES.CHANNEL_SHORTHAND:
            tests.push({
                args: [`https://www.youtube.com/c/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`http://www.youtube.com/c/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`www.youtube.com/c/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`youtube.com/c/${defaultUser}`],
                expected: defaultUser,
            });
            break;
        case YOUTUBE_ONLY_TEST_TYPES.LEGACY_USER:
            tests.push({
                args: [`https://www.youtube.com/user/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`http://www.youtube.com/user/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`www.youtube.com/user/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`youtube.com/user/${defaultUser}`],
                expected: defaultUser,
            });
            break;
        // TODO:
        case SPOTIFY_ONLY_TEST_TYPES.STANDARD:
            tests.push({
                args: [`https://spotify.com/user/${defaultUser}/`],
                expected: defaultUser,
            });
            tests.push({
                args: [`spotify.com/user/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [
                    `https://spotify.com/user/${defaultUser}/spotify.com/user/${defaultUser}`,
                ],
                expected: defaultUser,
            });
            tests.push({
                args: [`https://spotify.com/artist/${defaultUser}`],
                expected: defaultUser,
            });
            tests.push({
                args: [`https://www.open.spotify.com/artist/${defaultUser}`],
                expected: defaultUser,
            });
            break;
        case SPOTIFY_ONLY_TEST_TYPES.USER:
            tests.push({
                args: [`${spotifyDomainPrefix}user/${defaultUser}`],
                expected: defaultUser,
            });
            break;
        case SPOTIFY_ONLY_TEST_TYPES.ARTIST:
            tests.push({
                args: [`${spotifyDomainPrefix}artist/${defaultUser}`],
                expected: defaultUser,
            });
            break;
        case SPOTIFY_ONLY_TEST_TYPES.TRACK:
            tests.push({
                args: [`${spotifyDomainPrefix}track/${defaultUser}`],
                expected: defaultUser,
            });
            break;
        case SPOTIFY_ONLY_TEST_TYPES.PLAYLIST:
            tests.push({
                args: [`${spotifyDomainPrefix}playlist/${defaultUser}`],
                expected: defaultUser,
            });
            break;
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
const getBuildUrlTestCase = (username = 'myUser', type: Social) => {
    const tests: TestCase[] = [];
    const domainPrefix = `https://www.${type.toLowerCase()}.com/`;
    switch (type) {
        case ALL_SOCIALS.FACEBOOK:
        case ALL_SOCIALS.INSTAGRAM:
        case ALL_SOCIALS.TWITTER:
        case ALL_SOCIALS.SOUNDCLOUD:
            tests.push({
                args: [username],
                expected: `${domainPrefix}${username}`,
            });
            tests.push({
                args: [''],
                expected: '',
            });
            tests.push({
                args: [`@${username}`],
                expected: `${domainPrefix}${username}`,
            });
            break;
        case ALL_SOCIALS.YOUTUBE:
            tests.push({
                args: [username],
                expected: `${domainPrefix}${username}`,
            });
            tests.push({
                args: [`UC${username}`],
                expected: `${domainPrefix}channel/UC${username}`,
            });
            tests.push({
                args: [`HC${username}`],
                expected: `${domainPrefix}channel/HC${username}`,
            });
            tests.push({
                args: [`@HC${username}`],
                expected: `${domainPrefix}channel/HC${username}`,
            });
            tests.push({
                args: [`@UC${username}`],
                expected: `${domainPrefix}channel/UC${username}`,
            });
            tests.push({
                args: [''],
                expected: '',
            });
            break;
        case ALL_SOCIALS.SPOTIFY:
            // Test requires multiple args
            // [0]: Username/Id
            // [1]: Spotify Link Type
            const spotifyDomainPrefix = `https://open.spotify.com/`;
            const spotifyId = '31jkZXTNwXu0QNvAIG4psQ';
            // Artist
            tests.push({
                args: [spotifyId, 'artist'],
                expected: `${spotifyDomainPrefix}artist/${spotifyId}`,
            });
            tests.push({
                args: [username, 'artist'],
                expected: '',
            });
            // User
            tests.push({
                args: [username, 'user'],
                expected: `${spotifyDomainPrefix}user/${username}`,
            });
            // Track
            tests.push({
                args: [spotifyId, 'track'],
                expected: `${spotifyDomainPrefix}track/${spotifyId}`,
            });
            tests.push({
                args: [username, 'track'],
                expected: '',
            });
            // Playlist
            tests.push({
                args: [spotifyId, 'playlist'],
                expected: `${spotifyDomainPrefix}playlist/${spotifyId}`,
            });
            tests.push({
                args: [username, 'playlist'],
                expected: '',
            });
            tests.push({
                args: ['', ''],
                expected: '',
            });
            tests.push({
                args: [spotifyId, 'invalidType'],
                expected: '',
            });
            break;
        default:
            break;
    }

    return tests;
};

export default {
    getDescription,
    getExtractUsernameTestCase,
    getBuildUrlTestCase,
};
