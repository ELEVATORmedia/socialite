import { Social, SocialsUpperCase } from './types/socials';

/**
 * Standard Social Domains refer to those that do not require special parsing
 * These urls are typically formatted as https://www.socialMediaSiteDomain.com/username
 */
const STANDARD_SOCIAL_DOMAINS: Record<
    Exclude<SocialsUpperCase, 'YOUTUBE' | 'SPOTIFY'>,
    Social
> = {
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    TWITTER: 'twitter',
    SOUNDCLOUD: 'soundcloud',
};

const ALL_SUPPORTED_DOMAINS: Record<string, string> = {
    ...STANDARD_SOCIAL_DOMAINS,
    YOUTUBE: 'youtube',
    O_SPOTIFY: 'open.spotify',
    P_SPOTIFY: 'play.spotify',
};

const ALL_SOCIALS: Record<SocialsUpperCase, Social> = {
    ...STANDARD_SOCIAL_DOMAINS,
    YOUTUBE: 'youtube',
    SPOTIFY: 'spotify',
};

Object.freeze(STANDARD_SOCIAL_DOMAINS);
Object.freeze(ALL_SUPPORTED_DOMAINS);
Object.freeze(ALL_SOCIALS);

export { STANDARD_SOCIAL_DOMAINS, ALL_SUPPORTED_DOMAINS, ALL_SOCIALS };
