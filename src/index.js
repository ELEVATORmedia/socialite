const SPECIAL_CHARS_TO_REMOVE = '@';
const { STANDARD_SOCIAL_DOMAINS, ALL_SOCIAL_DOMAINS } = require('./enums');

/**
 * Iteratively builds the final regular expression to be used in the replace operation.
 */
const getSocialPrefixRegex = () => {
    // Matches https:// or http:// if available
    // eslint-disable-next-line no-useless-escape
    const optionalProtocol = `(https?:\/\/)?`;

    // Matches on www. if supplied
    const optionalWWW = `(www\\.)?`;

    // Matches on a domain containing {socialMediaSite}.com/
    const domains = Object.values(STANDARD_SOCIAL_DOMAINS).map((value) =>
        value.toLowerCase(),
    );
    // eslint-disable-next-line no-useless-escape
    const standardDomains = `((${domains.join('|')})\\.com\/)`;

    /*
          Youtube userVariation:
          Accounts for variations in user and channel name urls for legacy URLS if the previously
          matched patterns are:
          - youtube.com/username
          - youtube.com/c/channel_id
          - youtube.com/user/username -> this is a legacy url
          - youtube.com/channel/channel_id
      */
    // eslint-disable-next-line no-useless-escape
    const youtubeOnlyVariantMapping = `((youtube\\.com\/)((c|user|channel)\/)?)`;

    /**
     * Merge the standard domain pattern to the more complex youtube pattern to generate
     * the overal social domain prefix pattern
     */
    const socialDomainPrefix = `(${standardDomains}|${youtubeOnlyVariantMapping})`;

    const regularExp = new RegExp(
        [optionalProtocol, optionalWWW, socialDomainPrefix].join(''),
        'gmi',
    );

    return regularExp;
};

/**
 * Returns a template-filled string based on the batter
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
 * a social media. for example, if given 'username' and 'facebook' the output
 * will be 'https://www.facebook.com/username'
 */
const unbrew = (username, type) => {
    if (!username) {
        return '';
    }

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
            return 'UNSPPORTED TYPE: ' + type;
    }
};

const getSpecialCharRegex = () => {
    // Simple for right now
    return new RegExp(`${SPECIAL_CHARS_TO_REMOVE}+`, 'gmi');
};

const isValidDomain = (input) => {
    // eslint-disable-next-line no-useless-escape
    const domains = Object.values(ALL_SOCIAL_DOMAINS).map((value) => value.toLowerCase());
    const standardDomains = `((${domains.join('|')})\\.com)`;
    const supportedDomainRegex = new RegExp(standardDomains, 'gmi');

    if (supportedDomainRegex.exec(input) !== null) {
        return true;
    }

    return false;
};

/**
 * Attempts to extract the username from a social media url by parsing out
 * social media url prefixes and blacklisted characters
 */
const plunge = (url) => {
    // if no url is supplied we return an empty string.
    if (!url) {
        return '';
    }

    //TODO: should we check for valid domains? is this possible?

    // Stage 1: Remove whitespace
    const noWhiteSpaceUrl = url.replace(/\s/g, '');

    // Stage 2: Parse out URL Prefix
    const socialRegex = getSocialPrefixRegex();
    const noPrefixURL = noWhiteSpaceUrl.replace(socialRegex, '');

    // Stage 3: Remove Special Characters
    const specialCharsRegex = getSpecialCharRegex();
    return noPrefixURL.replace(specialCharsRegex, '');
};

exports.plunge = plunge;
exports.getSocialPrefixRegex = getSocialPrefixRegex;
exports.getSpecialCharRegex = getSpecialCharRegex;
exports.isValidDomain = isValidDomain;
exports.unbrew = unbrew;
