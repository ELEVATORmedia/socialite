/**
 * Standard Social Domains refer to those that do not require special parsing
 * These urls are typically formatted as https://www.socialMediaSiteDomain.com/username
 */
const STANDARD_SOCIAL_DOMAINS = {
    FACEBOOK: 'FACEBOOK',
    INSTAGRAM: 'INSTAGRAM',
    TWITTER: 'TWITTER',
    SOUNDCLOUD: 'SOUNDCLOUD',
};

const ALL_SOCIAL_DOMAINS = {
    ...STANDARD_SOCIAL_DOMAINS,
    YOUTUBE: 'YOUTUBE',
};

Object.freeze(STANDARD_SOCIAL_DOMAINS);
Object.freeze(ALL_SOCIAL_DOMAINS);

module.exports = {
    STANDARD_SOCIAL_DOMAINS,
    ALL_SOCIAL_DOMAINS,
};
