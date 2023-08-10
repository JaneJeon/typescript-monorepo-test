import { FastifyPluginAsync } from 'fastify'

// TODO:
const linkRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/links', async function (request, reply) {
    return { root: true }
  })
}

export default linkRoutes
