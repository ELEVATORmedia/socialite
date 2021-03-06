const STANDARD_TEST_TYPES: Record<string, string> = {
    ABSOLUTE_URLS: 'ABSOLUTE_URLS',
    NO_PROTOCOL: 'NO_PROTOCOL',
    NO_WWW: 'NO_WWW',
    NAKED_DOMAIN: 'NAKED_DOMAIN',
    NO_INPUT: 'NO_INPUT',
    SPECIAL_CHARS: 'SPECIAL_CHARS',
    WRONG_DOMAIN: 'WRONG_DOMAIN',
    USERNAME_ONLY: 'USERNAME_ONLY',
    DUPLICATE_INPUT: 'DUPLICATE_INPUT',
    PARTIAL_INPUT: 'PARTIAL_INPUT',
    SPACES: 'SPACES',
};

const YOUTUBE_ONLY_TEST_TYPES: Record<string, string> = {
    LEGACY_USER: 'LEGACY_USER',
    CHANNEL_SHORTHAND: 'CHANNEL_SHORTHAND',
    CHANNEL_FULL: 'CHANNEL_FULL',
    STACKED_PATH: 'STACKED_PATH',
};

const SPOTIFY_ONLY_TEST_TYPES: Record<string, string> = {
    USER: 'USER',
    ARTIST: 'ARTIST',
    TRACK: 'TRACK',
    PLAYLIST: 'PLAYLIST',
    STANDARD: 'STANDARD',
};

Object.freeze(STANDARD_TEST_TYPES);
Object.freeze(YOUTUBE_ONLY_TEST_TYPES);
Object.freeze(SPOTIFY_ONLY_TEST_TYPES);

export { STANDARD_TEST_TYPES, YOUTUBE_ONLY_TEST_TYPES, SPOTIFY_ONLY_TEST_TYPES };
