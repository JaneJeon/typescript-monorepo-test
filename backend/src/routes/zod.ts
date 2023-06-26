import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  UserSchemaZod,
  UsersQueryZod,
  CreateUserBodyZod,
  UpdateUserBodyZod,
  DeleteUserQueryZod,
  LinkSchemaZod,
  LinksQueryZod,
  CreateLinkBodyZod,
  UpdateLinkBodyZod
} from 'shared'

// Note that none of the create/update schema have "transform" function.
// Even defaults are not exposed to end users (in fact, we have no "defaults" in schema).
// In other words, transform/defaults should only be used on server side where possible,
// because anything that hits the server should already have the correct payload!

const testRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/users',
      {
        schema: {
          summary: 'Create user',
          description: 'You can use this endpoint to create users.',
          body: CreateUserBodyZod,
          // Response is checked as well
          response: {
            201: UserSchemaZod.describe('The created user')
          }
        }
      },
      async req => {
        // "Merge" the sub-schema with the whole schema
        // to create a "whole" instance,
        // with stuff like default values baked in.
        return UserSchemaZod.parse(req.body)
      }
    )
    .get(
      '/users',
      {
        schema: {
          summary: 'Get users',
          description: 'Use this endpoint to get a list of users.',
          querystring: UsersQueryZod,
          response: {
            200: UserSchemaZod.array().describe('The list of users')
            // TODO: 401/403
          }
        }
      },
      async req => {
        //
      }
    )
    .get(
      '/users/:id',
      {
        schema: {
          summary: 'Get user',
          description: 'Fetch a single, specific user.',
          response: {
            200: UserSchemaZod.describe('The user with the matching id')
            // TODO: 404:
          }
        }
      },
      async req => {
        //
      }
    )
    .patch(
      '/users/:id',
      {
        schema: {
          summary: 'Update user',
          description: "Update a user's details.",
          body: UpdateUserBodyZod,
          response: {
            200: UserSchemaZod.describe('The updated user details')
          }
        }
      },
      async req => {
        //
      }
    )
    .delete(
      '/users/:id',
      {
        schema: {
          summary: 'Delete user',
          description: 'Delete a user. Can soft-delete or hard-delete.',
          querystring: DeleteUserQueryZod
          // response: {
          //   // TODO: 204:
          // }
        }
      },
      async req => {
        //
      }
    )
}

export default testRoute
