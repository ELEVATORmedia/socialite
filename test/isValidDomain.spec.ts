import assert from 'assert';
import { isValidDomain } from '../src';

describe('isValidDomain(url)', () => {
    describe('valid domains', () => {
        [
            'facebook.com/myUser',
            'instagram.com/myUser',
            'twitter.com/myUser',
            'soundcloud.com/myUser',
            'youtube.com/myUser',
            'open.spotify.com/user/myUser',
            'play.spotify.com/artist/7wbpumCV5KWPutFg3Y8dnU',
            'https://open.spotify.com/user/7wbpumCV5KWPutFg3Y8dnU',
            'https://open.spotify.com/playlist/7wbpumCV5KWPutFg3Y8dnU',
        ].forEach((domain) => {
            it(`${domain} should be a valid domain`, () => {
                assert.strictEqual(isValidDomain(domain), true);
            });
        });
    });

    describe('invalid domains', () => {
        [
            'https://www.open.spotify.com/playlist/7wbpumCV5KWPutFg3Y8dnU',
            'https://spotify.com/playlist/7wbpumCV5KWPutFg3Y8dnU',
            'https://open.spotify.com/playlist/7wbp?si=BvazP92NSS2zIvgA8_l4kA',
            'totallyLegit.com',
            'google.com',
            'bing.com',
            'notEvenADomain',
            'twitter .com',
            'twitter.com',
            'spotify.com',
            'youtube.com',
            'www.open.spotify.com',
            'youtube.com/@myUseryoutube.com/@myUser',
        ].forEach((domain) => {
            it(`${domain} should be an invalid domain`, () => {
                assert.strictEqual(isValidDomain(domain), false);
            });
        });
    });
});
