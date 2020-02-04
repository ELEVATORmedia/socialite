const assert = require('assert');
const frenchPress = require('../src');

const getDescription = (siteName, withProtocol = false, withWWW = false) => {
    return `${siteName.toUpperCase()}: URLs with ${withProtocol ? 'Protocols' : ''}, ${
        withWWW ? 'WWW' : ''
    }`;
};

const expectedUsername = 'jmeza081';

describe(getDescription('facebook', true, true), () => {
    it('should result in ' + expectedUsername, () => {
        const url = 'https://www.facebook.com/jmeza081';
        const extractedUsername = frenchPress.extractUsername(url);

        assert.equal(extractedUsername, expectedUsername);
    });
});
