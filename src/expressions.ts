import { ALL_SUPPORTED_DOMAINS, STANDARD_SOCIAL_DOMAINS } from './enums';

// Matches https:// or http:// if available

// eslint-disable-next-line no-useless-escape
const optionalProtocol = `(https?:\/\/)?`;
// eslint-disable-next-line no-useless-escape
const nonOptionalProtocol = `(https?:\/\/)`;

// Matches on www. if supplied
const optionalWWW = `(www\\.)?`;
const nonOptionalWWW = `(www\\.)`;

// Matches on a domain containing {socialMediaSite}.com/
// Note that this exclude youtube & spotify patterns due to variants in the url pattern.
const standardSocialPrefix = `((${Object.values(STANDARD_SOCIAL_DOMAINS).join(
    '|',
)})\\.com\/)`; // eslint-disable-line no-useless-escape

// Matches on any supported domain
// No forward slash
const allSupportedDomains = `((${Object.values(ALL_SUPPORTED_DOMAINS).join('|')})\\.com)`;

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

/*
    Spotify linkVariations:
    Accounts for variations in user, artist, track, playlist, and legacy URLS if the matched 
	patterns are:
    - open.spotify.com/artist/spotifyId
    - open.spotify.com/user/spotifyId
    - open.spotify.com/track/spotifyId
    - open.spotify.com/playlist/spotifyId
		-- Legacy urls --
    - play.spotify.com/artist/spotifyId
    - play.spotify.com/user/spotifyId
    - play.spotify.com/track/spotifyId
    - play.spotify.com/playlist/spotifyId
*/
// Spotify URL handling
// eslint-disable-next-line no-useless-escape
const spotifyPrefix = `((open.|play.)spotify.com\/(artist|user|track|playlist)\/)`;

// Can't verify it's always 10-22 (i.e. doesn't specify in docs), but most are 22 or 10
const validSpotifyId = `^\([0-9A-Za-z]{10,30})$`;

/**
 * Merge the standard domain pattern to the more complex youtube & spotify patterns to generate
 * the overall social domain prefix pattern
 */
const socialPrefix = `(${standardSocialPrefix}|${youtubeSocialPrefix}|${spotifyPrefix})`;

export {
    optionalProtocol,
    optionalWWW,
    specialCharacters,
    socialPrefix,
    nonOptionalWWW,
    allSupportedDomains,
    nonOptionalProtocol,
    spotifyPrefix,
    validSpotifyId,
};
