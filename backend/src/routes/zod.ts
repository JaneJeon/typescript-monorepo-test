import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { CreateLinkSchemaZod, LinkSchemaZod } from 'shared'

// Note that none of the create/update schema have "transform" function.
// Even defaults are not exposed to end users (in fact, we have no "defaults" in schema).
// In other words, transform/defaults should only be used on server side where possible,
// because anything that hits the server should already have the correct payload!

const testRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/zod-test',
    {
      // .coerce is needed for querystring, as it's in form of key=value and is always going to be Map<string, string>.
      // It is theoretically not needed for body, as it's JSON.parse'ing it.
      schema: {
        // querystring: z.object({ boolField: z.coerce.boolean() }),
        body: CreateLinkSchemaZod,
        // Response is checked as well
        response: {
          200: LinkSchemaZod
        }
      }
    },
    async (req, res) => {
      res.send({ foo: 'bar' })
    }
  )
}

export default testRoute
