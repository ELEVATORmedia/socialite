import {
    isSupportedSocial,
    isValidSpotifyLink,
    Social,
    SpotifyLink,
} from './types/socials';
import { ALL_SOCIALS } from './enums';
import { specialCharacters, validSpotifyId } from './expressions';
import { BuildUrl } from './types/functions';

/**
 * Attempts to build an absolute url from a username and its mapped type for
 * a social media site. for example, if given 'username' and 'facebook' the output
 * will be 'https://www.facebook.com/username'
 */
const buildUrl: BuildUrl = (username: string, type: Social, linkType?: SpotifyLink) => {
    if (!username) {
        return '';
    }

    // Validate that the requested type is a supported domain type
    if (!isSupportedSocial(type)) {
        return '';
    }

    // Using a special character's regex, parse out special characters from username
    const specialCharsRegex = new RegExp(specialCharacters, 'gmi');
    const noSpecialChars = username.replace(specialCharsRegex, '');

    // Otherwise switch through the requested url type and return the
    // absolute url
    switch (type) {
        // All of these domain follow the same standard URL pattern
        case ALL_SOCIALS.FACEBOOK:
        case ALL_SOCIALS.INSTAGRAM:
        case ALL_SOCIALS.TWITTER:
        case ALL_SOCIALS.SOUNDCLOUD:
            return buildStandardURL(noSpecialChars, type);

        // YouTube has variants for their urls and must be interpolated
        case ALL_SOCIALS.YOUTUBE:
            return buildYoutubeVariantURL(noSpecialChars);
        // Spotify has many variants for content and urls, so a linkType must be specified
        case ALL_SOCIALS.SPOTIFY:
            return buildSpotifyVariantURL(username, linkType);
        default:
            // Signifies that we do not accommodate this type of domain.
            return '';
    }
};

/**
 * Returns a template-filled string based on the pattern:
 * https://www.socialMediaSite.com/username
 */
const buildStandardURL = (username: string, domain: Social) => {
    return `https://www.${domain}.com/${username}`;
};

/**
 * Interpolates the type of username to figure out which algorithm
 * to use in returning the absolute URL. if the username begins with
 * 'UC' or 'HC', we use a channel template string, otherwise we
 * default to the standard URL pattern
 *
 * NOTES:
 * There are two kinds of YouTube channel names (non-id based):
 * - Legacy UserNames: Denoted by youtube.com/user/username
 * - Custom Channel Names: Denoted by youtube.com/c/customChannelName
 *
 * Both of these URLs can be shortened to youtube.com/username and will be
 * redirected to the proper channel (assuming no-one else has claimed that url as
 * a custom channel link).
 *
 * As such, we make the assumption that if a username is provided in place of an
 * ID-based channel, we can redirect the user to a short-link (as there is no
 * way to properly figure out if the username was a legacy channel or a
 * custom channel name)
 */
const buildYoutubeVariantURL = (username: string) => {
    if (username.startsWith('UC') || username.startsWith('HC')) {
        return `https://www.youtube.com/channel/${username}`;
    } else {
        return buildStandardURL(username, 'youtube');
    }
};

/**
 * Builds a spotify url of the specified `linkType`
 *
 * NOTES:
 * - There are 4 types of Spotify link artist, user, track, & playlist
 * - Besides user, all links must be valid Spotify ids or will return ''
 */
const buildSpotifyVariantURL = (id: string, linkType: SpotifyLink) => {
    // Check for valid link type
    // If not a user link, check for a valid id
    const isValidId = new RegExp(`^(${validSpotifyId})$`, 'i');
    if (!isValidSpotifyLink(linkType) || (linkType !== 'user' && !isValidId.test(id))) {
        return '';
    }
    // Url can not contain 'www'
    return `https://open.spotify.com/${linkType}/${id}`;
};

export default buildUrl;
