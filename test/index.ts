import path from 'path';
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
import { assert } from 'chai';

describe('E2ECategory', () => {
    it('E2ETestOne()', async () => {
        // done(); // Only needed if not using an async callback and not returning a resolved promise.
        assert.strictEqual(2, 2);
    });
});
