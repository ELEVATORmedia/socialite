import {
    optionalProtocol,
    optionalWWW,
    specialCharacters,
    socialPrefix,
    nonOptionalWWW,
    nonOptionalProtocol,
} from './expressions';
import { ExtractUser } from './types/functions';
import { isSupportedDomain } from './isValidDomain';

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
    if (!isSupportedDomain(url)) {
        return '';
    }

    // Stage 3: Parse out URL Prefix
    const noPrefixURL = parseOutURLPrefix(noWhiteSpaceUrl, singleOperation);

    // Stage 4: Remove Special Characters
    const specialCharsRegex = new RegExp(specialCharacters, 'gmi');
    return noPrefixURL.replace(specialCharsRegex, '');
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
 * instances such as https://www.youtube.com/userhttps://www.youtube.com/user. Does not
 * support all spotify use cases
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

export default extractUser;
