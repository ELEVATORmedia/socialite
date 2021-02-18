import { Socials, SocialsUpperCase } from 'types/socials';

/**
 * Standard Social Domains refer to those that do not require special parsing
 * These urls are typically formatted as https://www.socialMediaSiteDomain.com/username
 */
const STANDARD_SOCIAL_DOMAINS: Record<Exclude<SocialsUpperCase, 'YOUTUBE'>, Socials> = {
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    TWITTER: 'twitter',
    SOUNDCLOUD: 'soundcloud',
};

const ALL_SOCIAL_DOMAINS: Record<SocialsUpperCase, Socials> = {
    ...STANDARD_SOCIAL_DOMAINS,
    YOUTUBE: 'youtube',
};

Object.freeze(STANDARD_SOCIAL_DOMAINS);
Object.freeze(ALL_SOCIAL_DOMAINS);

export { STANDARD_SOCIAL_DOMAINS, ALL_SOCIAL_DOMAINS };
