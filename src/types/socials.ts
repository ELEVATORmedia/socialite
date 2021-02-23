import { ALL_SOCIAL_DOMAINS } from '../enums';

export type Social = 'facebook' | 'instagram' | 'twitter' | 'soundcloud' | 'youtube';

export const isSupportedSocial = (key: string): key is Social =>
    Object.values(ALL_SOCIAL_DOMAINS as Record<string, string>).includes(key);

export type SocialsUpperCase =
    | 'FACEBOOK'
    | 'INSTAGRAM'
    | 'TWITTER'
    | 'SOUNDCLOUD'
    | 'YOUTUBE';
