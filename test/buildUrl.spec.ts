import assert from 'assert';
import buildUrl from '../src/buildUrl';
import { Social, SpotifyLink } from '../src/types/socials';
import { getBuildUrlTestCase, getDescription } from './utils';

describe('buildUrl(username, type, linkType?)', () => {
    ([
        'facebook',
        'instagram',
        'twitter',
        'soundcloud',
        'youtube',
        'spotify',
    ] as Social[]).forEach((key: Social) => {
        describe(`buildUrl ${key}`, () => {
            var testCases = getBuildUrlTestCase('myUser', key);

            testCases.forEach((test) => {
                it(getDescription(test), () => {
                    let builtUrl = '';
                    if (key === 'spotify') {
                        builtUrl = buildUrl(
                            test.args[0],
                            key,
                            test.args[1] as SpotifyLink,
                        );
                    } else {
                        builtUrl = buildUrl(test.args[0], key);
                    }
                    assert.strictEqual(builtUrl, test.expected);
                });
            });
        });
    });
});
