import Fastify from 'fastify';
import cors from '@fastify/cors';
import healthRoutes from './routes/health.js';

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

  // Register Routes
  await fastify.register(healthRoutes);

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
