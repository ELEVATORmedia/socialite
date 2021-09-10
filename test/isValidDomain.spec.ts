import assert from 'assert';
import isValidDomain from '../src/isValidDomain';

describe('isValidDomain(url)', () => {
    describe('valid domains', () => {
        [
            'facebook.com/myUser',
            'instagram.com/myUser',
            'instagram.com/user.name',
            'instagram.com/user_name',
            'twitter.com/myUser',
            'https://twitter.com/myUser',
            'https://www.twitter.com/myUser',
            'twitter.com/_myUser',
            'soundcloud.com/myUser',
            'soundcloud.com/my-user',
            'youtube.com/myUser',
            'open.spotify.com/user/myUser',
            'play.spotify.com/artist/7wbpumCV5KWPutFg3Y8dnU',
            'https://open.spotify.com/user/7wbpumCV5KWPutFg3Y8dnU',
            'https://open.spotify.com/playlist/7wbpumCV5KWPutFg3Y8dnU',
            'https://www.youtube.com/channel/UC-test_IE3ga1dMfTUdA',
            'youtube.com/c/don',
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
            'twitter.com/not/a/user',
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
