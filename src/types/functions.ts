import { Social, SpotifyLink } from './socials';

export interface BuildUrl {
    (username: string, socialType: Exclude<Social, 'spotify'>): string;
    (username: string, socialType: 'spotify', linkType: SpotifyLink): string;
}

export interface ExtractUser {
    (url: string, singleOperation?: boolean): string;
}

export interface IsValidDomain {
    (input: string): boolean;
}
