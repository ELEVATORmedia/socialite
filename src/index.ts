import buildUrl from './buildUrl';
import extractUser from './extractUser';
import isValidDomain from './isValidDomain';

export * from './types/socials';
export { buildUrl, extractUser, isValidDomain };
const socialite = { buildUrl, extractUser, isValidDomain };
export default socialite;
