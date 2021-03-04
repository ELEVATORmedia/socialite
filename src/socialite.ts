import {
    isSupportedSocial,
    isValidSpotifyLink,
    Social,
    SpotifyLink,
} from './types/socials';
import { ALL_SOCIALS } from './enums';
import {
    optionalProtocol,
    optionalWWW,
    specialCharacters,
    socialPrefix,
    allSupportedDomains,
    nonOptionalWWW,
    nonOptionalProtocol,
    validSpotifyId,
} from './expressions';
import validator from 'validator';
import { BuildUrl, ExtractUser, IsValidDomain } from 'types/functions';

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
 // TODO: Build spotify docs/comments
 * Interpolates the type of username to figure out which algorithm
 * to use in returning the absolute URL. if the username begins with
 */
const buildSpotifyVariantURL = (id: string, linkType: SpotifyLink) => {
    // Check for valid link type
    // If not a user link, check for a valid id
    if (
        !isValidSpotifyLink(linkType) ||
        (linkType !== 'user' && !id.match(validSpotifyId))
    ) {
        return '';
    }
    // Url can not contain 'www'
    return `https://open.spotify.com/${linkType}/${id}`;
};

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
 * Validates that a url string is from a valid domain.
 */
const isValidDomain: IsValidDomain = (input) => {
    const supportedDomainRegex = new RegExp(allSupportedDomains, 'gmi');

    if (supportedDomainRegex.exec(input) !== null) {
        return true;
    }

    return false;
};

/**
 * Using a regular expression, a target string, and a replace with delimeter,
 * replace all instances of said expression in string and return the result;
 */
const findAndReplace = (expression: RegExp, targetString: string, replaceWith = '') => {
    return targetString.replace(expression, replaceWith);
};

/**
 * Using a rawStr and character delimiter, split the string by the delimeter,
 * filter out empty slots and return the first instance of the string.
 */
const getUnique = (rawStr: string, delimiter = '<') => {
    const delimitedValues = rawStr.split(delimiter);

    const dups = delimitedValues.filter((value) => value !== '');

    if (!dups.length) return '';

    return dups[0];
};

/**
 * Finds instances of url-like prefixes such as 'http' or 'www.' as well as
 * domain paths such as 'youtube.com/c'
 *
 * Notes that this algorithm offers two approaches:
 *
 * - single operation: Will build a singular regular expression to use in parsing out
 * url-like properties. This operation has a more narrow scope and may be unable to parse out
 * instances such as https://www.youtube.com/userhttps://www.youtube.com/user
 *
 * - multi-operation: Will build regular expressions in smaller chunks to parse out url-like
 * properties in stages. This operation has a broader scope and can accommodate more
 * use-cases with the trade-off of potential performance hits.
 */
const parseOutURLPrefix = (str: string, singleOperation: boolean) => {
    if (!singleOperation) {
        /**
         * Use parts of regular expressions to parse out username in stages
         * This approach assures greater coverage of cases than a single operation
         *
         * but requires more operations and possible performance hits
         */

        let compoundedResult = str;

        // Stage 1: Find & Replace all instances of protocols with '<' this delimeter
        // assures that we can later identify duplicate instances of a username later.
        const protocolRegex = new RegExp(nonOptionalProtocol, 'gi');
        compoundedResult = findAndReplace(protocolRegex, str, '<');

        // // Stage 2: Find & Replace all instances of 'www.'
        const wwwRegex = new RegExp(nonOptionalWWW, 'gmi');
        compoundedResult = findAndReplace(wwwRegex, compoundedResult, '<');

        // // Stage 3: Find & Replace all instances of domains
        const supportedDomainsRegex = new RegExp(socialPrefix, 'gmi');
        compoundedResult = findAndReplace(supportedDomainsRegex, compoundedResult, '<');

        // // Stage 4: test for duplicate patterns and return the first unique instance
        return getUnique(compoundedResult);
    } else {
        /**
         * Generates the single regular expression, is more performant but covers less
         * use-cases
         */
        const regularExp = new RegExp(
            [optionalProtocol, optionalWWW, socialPrefix].join(''),
            'gmi',
        );
        const res = str.replace(regularExp, '<');

        return getUnique(res);
    }
};

/**
 * Attempts to extract the username from a social media url by parsing out
 * social media url prefixes and blacklisted characters
 */
const extractUser: ExtractUser = (url, singleOperation = false) => {
    // if no url is supplied we return an empty string.
    if (!url) {
        return '';
    }

    // Stage 1: Remove whitespace to better match regexes
    const noWhiteSpaceUrl = url.replace(/\s/g, '');

    // Stage 2: Validate domain: Only applied if the string
    // resembles a url. If so, must be a supported domain
    // to continue
    if (
        validator.isURL(noWhiteSpaceUrl, {
            require_host: true,
            require_valid_protocol: false,
        }) &&
        !isValidDomain(url)
    ) {
        return '';
    }

    // Stage 3: Parse out URL Prefix
    const noPrefixURL = parseOutURLPrefix(noWhiteSpaceUrl, singleOperation);

    // Stage 4: Remove Special Characters
    const specialCharsRegex = new RegExp(specialCharacters, 'gmi');
    return noPrefixURL.replace(specialCharsRegex, '');
};

export { extractUser, buildUrl, isValidDomain };
