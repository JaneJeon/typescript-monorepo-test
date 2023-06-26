import { Type, FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

const plugin: FastifyPluginAsyncTypebox = async function (fastify, _opts) {
  fastify.post(
    '/foo',
    {
      schema: {
        body: Type.Object({
          x: Type.String(),
          y: Type.Number(),
          z: Type.Boolean()
        }),
        response: {
          200: Type.Object({
            field: Type.String()
          })
        }
      }
    },
    async req => {
      /// The `x`, `y`, and `z` types are automatically inferred
      const { x, y, z } = req.body

      // return { foo: 'bar' }
    }
  )
}

export default plugin
