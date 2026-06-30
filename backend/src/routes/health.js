/**
 * Health check routes for Fastify.
 * Defines the GET /health endpoint.
 */
async function healthRoutes(fastify, options) {
  fastify.get('/health', async (request, reply) => {
    return {
      status: 'success',
      message: 'Backend is running'
    };
  });
}

export default healthRoutes;
