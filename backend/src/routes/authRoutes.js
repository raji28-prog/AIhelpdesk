import { register, login, getProfile } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

/**
 * Fastify routes plugin mapping authentication endpoints.
 * Registering prefix /api/auth in app.js will direct here.
 */
async function authRoutes(fastify, options) {
  // Public registration endpoint
  fastify.post('/register', register);

  // Public login endpoint
  fastify.post('/login', login);

  // Protected user profile details endpoint
  fastify.get('/profile', { preHandler: [authenticate] }, getProfile);
}

export default authRoutes;
