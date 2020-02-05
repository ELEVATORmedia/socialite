/**
 * Standard Social Domains refer to those that do not require special parsing
 * These urls are typically formatted as https://www.socialMediaSiteDomain.com/username
 */
const STANDARD_SOCIAL_DOMAINS = ['facebook', 'instagram', 'twitter', 'soundcloud'];
const SUPPORTED_SOCIAL_DOMAINS = ['youtube', ...STANDARD_SOCIAL_DOMAINS];

/**
 * Iteratively builds the final regular expression to be used in the replace operation.
 */
const getRegex = () => {
    // Matches https:// or http:// if available
    // eslint-disable-next-line no-useless-escape
    const optionalProtocol = `(https?:\/\/)?`;

    // Matches on www. if supplied
    const optionalWWW = `(www\\.)?`;

    // Matches on a domain containing {socialMediaSite}.com/
    // eslint-disable-next-line no-useless-escape
    const standardDomains = `((${STANDARD_SOCIAL_DOMAINS.join('|')})\\.com\/)`;

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

    if (!SUPPORTED_SOCIAL_DOMAINS.includes(type)) {
        return '';
    }

    switch (type) {
        case SUPPORTED_SOCIAL_DOMAINS.FACEBOOK:
        case SUPPORTED_SOCIAL_DOMAINS.INSTAGRAM:
        case SUPPORTED_SOCIAL_DOMAINS.TWITTER:
        case SUPPORTED_SOCIAL_DOMAINS.SOUNDCLOUD:
            return buildStandardURL(username, type);

        case SUPPORTED_SOCIAL_DOMAINS.YOUTUBE:
            return buildYoutubeVariantURL(username);
    }
};

/**
 * Attempts to extract the username from a social media url by parsing out
 * social media url prefixes and blacklisted characters
 */
const plunge = (url) => {
    const socialRegex = getRegex();
    return url.replace(socialRegex, '');
};

exports.plunge = plunge;
exports.getRegex = getRegex;
exports.unbrew = unbrew;
