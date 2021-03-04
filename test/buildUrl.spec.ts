import { ALL_SOCIALS } from '../src/enums';
import assert from 'assert';
import { buildUrl, Social, SpotifyLink } from '../src';
import testUtils from './utils';

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
            var testCases = testUtils.getBuildUrlTestCase('myUser', key);

            testCases.forEach((test) => {
                it(testUtils.getDescription(test), () => {
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
