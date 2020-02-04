/**
 * Standard Social Domains refer to those that do not require special parsing
 * These urls are typically formatted as https://www.socialMediaSiteDomain.com/username
 */
const STANDARD_SOCIAL_DOMAINS = ['facebook', 'instagram', 'twitter', 'soundcloud'];

/**
 * Iteratively builds the final regular expression to be used in the replace operation.
 */
const buildRegex = () => {
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
 * Attempts to extract the username from a social media url by parsing out
 * social media url prefixes and blacklisted characters
 */
const extractUsername = (url) => {
    const socialRegex = buildRegex();
    return url.replace(socialRegex, '');
};

exports.extractUsername = extractUsername;
exports.buildRegex = buildRegex;
