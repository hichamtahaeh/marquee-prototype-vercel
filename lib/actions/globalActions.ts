/**
 * Global config for user dispatch actions.
 *
 * @param {object} user Marquee app user object.
 * @returns Payload for dispatching a user to the global context.
 */
export function setUser(user) {
    return {
        type: 'SET_USER',
        payload: user,
    };
}
