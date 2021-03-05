import { allSupportedDomains } from 'expressions';
import { IsValidDomain } from 'types/functions';

/**
 * Validates that a url string is from a valid domain.
 */
const isValidDomain: IsValidDomain = (input) => {
    if (!isSupportedDomain(input)) {
        return false;
    }
    // TODO: Check other cases
    // - Duplicate
    // - www. or missing open/play for spotify
    return true;
};

export const isSupportedDomain: IsValidDomain = (input) => {
    const supportedDomainRegex = new RegExp(allSupportedDomains, 'gmi');

    if (supportedDomainRegex.exec(input) !== null) {
        return true;
    }

    return false;
};

export default isValidDomain;
