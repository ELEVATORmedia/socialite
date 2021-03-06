import { ALL_SOCIALS } from '../enums';

export type Social =
    | 'facebook'
    | 'instagram'
    | 'twitter'
    | 'soundcloud'
    | 'youtube'
    | 'spotify';

export type SocialsUpperCase =
    | 'FACEBOOK'
    | 'INSTAGRAM'
    | 'TWITTER'
    | 'SOUNDCLOUD'
    | 'YOUTUBE'
    | 'SPOTIFY';

export type SpotifyLink = 'artist' | 'user' | 'track' | 'playlist';

export const isSupportedSocial = (key: string): key is Social =>
    Object.values(ALL_SOCIALS as Record<string, string>).includes(key);

export const isValidSpotifyLink = (key: string): key is SpotifyLink =>
    ['artist', 'user', 'track', 'playlist'].includes(key);
