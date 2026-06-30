/**
 * Fastify preHandler hooks for JWT authentication and role authorization.
 */

/**
 * Authenticates a request by verifying the JWT token in the Authorization header.
 * Decorates request.user with the verified payload on success.
 */
export const authenticate = async (request, reply) => {
  try {
    // request.jwtVerify() searches for the authorization header in the format "Bearer <token>"
    await request.jwtVerify();
  } catch (error) {
    reply.status(401).send({
      status: 'error',
      message: 'Unauthorized: Access token is missing, invalid, or expired',
    });
  }
};

/**
 * Restricts access to specific user roles.
 * Must be executed after the authenticate middleware.
 * @param {...string} allowedRoles - List of roles permitted to access the route
 */
export const authorize = (...allowedRoles) => {
  return async (request, reply) => {
    if (!request.user) {
      return reply.status(401).send({
        status: 'error',
        message: 'Unauthorized: User authentication required',
      });
    }

    if (!allowedRoles.includes(request.user.role)) {
      return reply.status(403).send({
        status: 'error',
        message: 'Forbidden: You do not have permission to access this resource',
      });
    }
  };
};
