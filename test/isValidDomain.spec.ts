import assert from 'assert';
import { isValidDomain } from '../src';

describe('isValidDomain(url)', () => {
    describe('valid domains', () => {
        [
            'facebook.com',
            'instagram.com',
            'twitter.com',
            'soundcloud.com',
            'youtube.com',
            'open.spotify.com',
            'play.spotify.com',
        ].forEach((domain) => {
            it(`${domain} should be a valid domain`, () => {
                assert.strictEqual(isValidDomain(domain), true);
            });
        });
    });

    describe('invalid domains', () => {
        [
            'totallyLegit.com',
            'google.com',
            'bing.com',
            'notEvenADomain',
            'spotify.com',
        ].forEach((domain) => {
            it(`${domain} should be an invalid domain`, () => {
                assert.strictEqual(isValidDomain(domain), false);
            });
        });
    });
});
