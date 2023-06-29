import { NextRequest, NextResponse } from 'next/server';
const { sanityClient } = require('lib/sanity');
const { jsonResponse } = require('lib/utils');
const { USER_DATA } = require('lib/constants');

export const runtime = 'edge';

/**
 * Endpoint to delete an existing listing document in the sanity cms.
 */
export async function DELETE(request: NextRequest, { params }: { params: { _id: string } }) {
    const user = JSON.parse(request.headers.get('x-user-data'));
    const _id = params._id;

    // Delete listing if in listing table and within organization.
    try {
        const sanityResponse = await sanityClient.delete({
            query: `*[_type == 'listing' && _id == '${_id}' && organization._ref == '${user.organization._ref}' ][0]`,
        });
        if (!!sanityResponse === false) {
            return jsonResponse(200, { pass: false, data: 'Failed to delete listing.' });
        }
    } catch (err) {
        return jsonResponse(200, { pass: false, data: err.message });
    }
    return jsonResponse(200, { pass: true, data: 'Successfully deleted listing.' });
}
