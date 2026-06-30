import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import healthRoutes from './routes/health.js';
import authRoutes from './routes/authRoutes.js';

/**
 * Initializes and configures the Fastify app.
 */
export const buildApp = async (options = {}) => {
  const fastify = Fastify(options);

  // Register Global Plugins
  await fastify.register(cors, {
    origin: '*', // Customize this for production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Register JWT Plugin
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'default_secret_for_local_dev_only_replace_in_production',
  });

  // Register Routes
  await fastify.register(healthRoutes);
  await fastify.register(authRoutes, { prefix: '/api/auth' });

  // Custom 404 handler
  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      status: 'error',
      message: 'Route not found'
    });
  });

  // Global Error Handler
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error);
    reply.status(error.statusCode || 500).send({
      status: 'error',
      message: error.message || 'Internal Server Error'
    });
  });

  return fastify;
};
