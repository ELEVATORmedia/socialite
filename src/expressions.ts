import { ALL_SOCIAL_DOMAINS, STANDARD_SOCIAL_DOMAINS } from 'enums';

// Matches https:// or http:// if available

// eslint-disable-next-line no-useless-escape
const optionalProtocol = `(https?:\/\/)?`;
// eslint-disable-next-line no-useless-escape
const nonOptionalProtocol = `(https?:\/\/)`;

// Matches on www. if supplied
const optionalWWW = `(www\\.)?`;
const nonOptionalWWW = `(www\\.)`;

// Matches on a domain containing {socialMediaSite}.com/
// Note that this exclude youtube patterns due to variants in the url pattern.
const standardSocialPrefix = `((${Object.values(STANDARD_SOCIAL_DOMAINS).join(
    '|',
)})\\.com\/)`; // eslint-disable-line no-useless-escape

// Matches on any domain that takes the pattern {socialMediaSite.com}
// No forward slash
const allSupportedDomains = `((${Object.values(ALL_SOCIAL_DOMAINS).join('|')})\\.com)`;

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
const youtubeSocialPrefix = `((youtube\\.com\/)((c|user|channel)\/)?)`;

// Parse out one ore more instances of special characters
const specialCharacters = '@+';

/**
 * Merge the standard domain pattern to the more complex youtube pattern to generate
 * the overal social domain prefix pattern
 */
const socialPrefix = `(${standardSocialPrefix}|${youtubeSocialPrefix})`;

export {
    optionalProtocol,
    optionalWWW,
    specialCharacters,
    standardSocialPrefix,
    youtubeSocialPrefix,
    socialPrefix,
    nonOptionalWWW,
    allSupportedDomains,
    nonOptionalProtocol,
};
