import path from 'path';
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
import { assert } from 'chai';

describe('UnitTestCategory', () => {
    it('UnitTestOne()', async () => {
        // done(); // Only needed if not using an async callback and not returning a resolved promise.
        assert.strictEqual(2, 2);
    });
});
