import { ALL_SOCIALS } from 'enums';
import {
    allSupportedDomains,
    optionalProtocol,
    optionalWWW,
    strictSpotifyPrefix,
    validSpotifyId,
    youtubeSocialPrefix,
} from 'expressions';
import { IsValidDomain } from 'types/functions';

/**
 * Validates that a url string is from a valid domain.
 */
const isValidDomain: IsValidDomain = (input) => {
    if (!isSupportedDomain(input)) {
        return false;
    }
    // Get type of url
    const type = input.match(`(${Object.values(ALL_SOCIALS).join('|')})`)[0];
    // Validate w/ specific validator
    switch (type) {
        // All of these domain follow the same standard URL pattern
        case ALL_SOCIALS.FACEBOOK:
            return isValidFacebook(input);
        case ALL_SOCIALS.INSTAGRAM:
            return isValidInstagram(input);
        case ALL_SOCIALS.TWITTER:
            return isValidTwitter(input);
        case ALL_SOCIALS.SOUNDCLOUD:
            return isValidSoundcloud(input);
        case ALL_SOCIALS.YOUTUBE:
            return isValidYoutube(input);
        case ALL_SOCIALS.SPOTIFY:
            return isValidSpotify(input);

        default:
            return false;
    }
};

export const isSupportedDomain: IsValidDomain = (input) => {
    const supportedDomainRegex = new RegExp(allSupportedDomains, 'gmi');

    if (supportedDomainRegex.exec(input) !== null) {
        return true;
    }

    return false;
};

const isValidFacebook = (url: string) => {
    //
    const validFacebookUrl = new RegExp(
        `^${optionalProtocol}${optionalWWW}(facebook.com\/).{1,}$`,
        'i',
    );
    return validFacebookUrl.test(url);
};
const isValidInstagram = (url: string) => {
    //
    const validInstagramUrl = new RegExp(
        `^${optionalProtocol}${optionalWWW}(instagram.com\/)\\w+$`,
        'i',
    );
    return validInstagramUrl.test(url);
};
const isValidTwitter = (url: string) => {
    //
    const validTwitterUrl = new RegExp(
        `^${optionalProtocol}${optionalWWW}(twitter.com\/)\\w+$`,
        'i',
    );
    return validTwitterUrl.test(url);
};
const isValidSoundcloud = (url: string) => {
    //
    const validSoundcloudUrl = new RegExp(
        `^${optionalProtocol}${optionalWWW}(soundcloud.com\/)\\w+$`,
        'i',
    );
    return validSoundcloudUrl.test(url);
};
const isValidYoutube = (url: string) => {
    //
    const validYoutubeUrl = new RegExp(
        `^${optionalProtocol}${optionalWWW}${youtubeSocialPrefix}\\w+$`,
        'i',
    );
    return validYoutubeUrl.test(url);
};
const isValidSpotify = (url: string) => {
    const validSpotifyUrl = new RegExp(
        `^(${optionalProtocol}${strictSpotifyPrefix}(${validSpotifyId}))|(${optionalProtocol}((open.|play.)spotify.com/user/)(\\w+))$`,
        'i',
    );
    return validSpotifyUrl.test(url);
};

export default isValidDomain;
