const { ALL_SOCIAL_DOMAINS } = require('./enums');
const {
    optionalProtocol,
    optionalWWW,
    specialCharacters,
    socialPrefix,
    allSupportedDomains,
} = require('./expressions');
const validator = require('validator');

/**
 * Returns a template-filled string based on the pattern:
 * https://www.socialMediaSite.com/username
 */
const buildStandardURL = (domain, username) => {
    return `https://www.${domain}.com/${username}`;
};

/**
 * Interpolates the type of username to figure out which algorithm
 * to use in returning the absolute URL. if the username begins with
 * 'UC' or 'HC', we use a channel template string, otherwise we
 * default to the standard URL pattern
 */
const buildYoutubeVariantURL = (username) => {
    if (username.startsWith('UH') || username.startsWith('HC')) {
        return `https://www.youtube.com/c/${username}`;
    } else {
        return buildStandardURL('youtube', username);
    }
};

/**
 * Attempts to build an absolute url from a username and its mapped type for
 * a social media site. for example, if given 'username' and 'facebook' the output
 * will be 'https://www.facebook.com/username'
 */
const unbrew = (username, type) => {
    if (!username) {
        return '';
    }

    // Validate that the requested type is a supported domain type
    if (!Object.keys(ALL_SOCIAL_DOMAINS).includes(type.toUpperCase())) {
        return '';
    }

    switch (type.toUpperCase()) {
        case ALL_SOCIAL_DOMAINS.FACEBOOK:
        case ALL_SOCIAL_DOMAINS.INSTAGRAM:
        case ALL_SOCIAL_DOMAINS.TWITTER:
        case ALL_SOCIAL_DOMAINS.SOUNDCLOUD:
            return buildStandardURL(type, username);

        case ALL_SOCIAL_DOMAINS.YOUTUBE:
            return buildYoutubeVariantURL(username);
        default:
            return '';
    }
};

/**
 * Validates that a url string is from a valid domain.
 */
const isValidDomain = (input) => {
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
const findAndReplace = (expression, targetString, replaceWith = '') => {
    return targetString.replace(expression, replaceWith);
};

/**
 * Finds instances of url-like prefixes such as 'http' or 'www.' as well as
 * domain paths such as 'youtube.com/c'
 *
 * Notes that this algorithm offers two approaches:
 * - single operation: Will build a singular regular expression to use in parsing out
 * url-like properties. This operation has a more narrow scope and may be unable to parse out
 * instances such as https://www.youtube.com/userhttps://www.youtube.com/user
 * - multi-operation: Will build regular expressions in smaller chunks to parse out url-like
 * properties in stages. This operation has a broader scope and can accomodate more
 * use-cases with the trade-off of performance hits
 */
const parseOutURLPrefix = (string, singleOperation) => {
    if (!singleOperation) {
        /**
         * Use parts of regular expressions to parse out username in stages
         * This approach assures greater coverage of cases than a single operation
         *
         * but requires more operations and possible performance hits
         */

        let compoundedResult = string;

        // Stage 1: Find & Replace all instances of protocols
        const protocolRegex = new RegExp(optionalProtocol, 'gmi');
        compoundedResult = findAndReplace(protocolRegex, compoundedResult);

        // Stage 2: Find & Replace all instances of 'www.'
        const wwwRegex = new RegExp(optionalWWW, 'gmi');
        compoundedResult = findAndReplace(wwwRegex, compoundedResult);

        // Stage 3: Find & Replace all instances of domains
        const supportedDomainsRegex = new RegExp(socialPrefix, 'gmi');
        compoundedResult = findAndReplace(supportedDomainsRegex, compoundedResult);

        return compoundedResult;
    } else {
        const regularExp = new RegExp(
            [optionalProtocol, optionalWWW, socialPrefix].join(''),
            'gmi',
        );
        return string.replace(regularExp, '');
    }
};

/**
 * Attempts to extract the username from a social media url by parsing out
 * social media url prefixes and blacklisted characters
 */
const plunge = (url, singleOperation = false) => {
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

exports.plunge = plunge;
exports.unbrew = unbrew;
exports.isValidDomain = isValidDomain;
