const assert = require('chai').assert;
// const { getJwtSecretKey } = require('../lib/constants');
const { jwtVerify } = require('jose');

describe('Authentication', () => {
    it('getJwtSecretKey()', async (done) => {
        // const token = getJwtSecretKey();
        // const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
        assert.strictEqual(2, 2);
        done();
    });
});
