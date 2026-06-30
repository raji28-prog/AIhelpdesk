/**
 * Token signing utility functions.
 * Keeps JWT signature options modular and extensible for future Refresh Token mechanisms.
 */

/**
 * Generates an Access Token for a user.
 * Typically short-lived (e.g., 15m to 1h).
 * @param {object} fastify - Fastify instance holding the jwt decorator
 * @param {object} payload - User properties to embed (e.g., id, role)
 * @returns {string} Signed JWT Access Token
 */
export const generateAccessToken = (fastify, payload) => {
  return fastify.jwt.sign(payload, {
    expiresIn: '1h', // Standard access token expiration
  });
};

/**
 * Placeholder for future Refresh Token generation.
 * Currently returns a signed token with longer expiry, preparing database/cookies storage in later phases.
 * @param {object} fastify - Fastify instance
 * @param {object} payload - User properties to embed
 * @returns {string} Signed JWT Refresh Token
 */
export const generateRefreshToken = (fastify, payload) => {
  return fastify.jwt.sign(payload, {
    expiresIn: '7d', // Longer expiration for refresh tokens
  });
};
