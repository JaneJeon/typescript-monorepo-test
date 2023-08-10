import * as z from 'zod'

import { BaseModel, NonEmptyString, CoercedBoolean } from './base.js'

// Object representation to be used as the shape of transport in the "API boundary".
// That means anything here must be "representable" as a regular ol' JSON.
export const UserSchemaZod = BaseModel.extend({
  id: NonEmptyString.describe(
    'The user ID (that is auto-generated from the backend).'
  ),
  name: NonEmptyString.describe('The username that is provided by the user.'),
  role: z
    .enum(['user', 'superuser'])
    .default('user')
    .describe(
      'The role for the user. Note that superuser status can only be set by another superuser/admin.'
    ),
  deactivated: z
    .boolean()
    .default(true)
    .describe(
      'Deleted users will be marked with the `deactivated` flag. Do not set directly.'
    )
}).describe('The shape of a User object')

export const UsersQueryZod = UserSchemaZod.omit({
  createdAt: true,
  updatedAt: true
}).partial()

export const UserPathParamZod = UserSchemaZod.pick({ id: true })

// Object representation of the payload that is allowed (coming into the backend) when creating a user
export const CreateUserBodyZod = UserSchemaZod.pick({
  id: true,
  name: true
})

// Object representation of the payload that is allowed (coming into the backend) when updating a user
export const UpdateUserBodyZod = UserSchemaZod.pick({
  name: true,
  role: true,
  deactivated: true
}).partial()

// The .coerce is needed for querystring, as it's in form of key=value pairs
// and the resulting object is always going to be Map<string, string>.
// It is theoretically not needed for body, as it's JSON.parse'ing it.
// TODO: fix in OAS UI
export const DeleteUserQueryZod = z
  .object({
    hardDelete: CoercedBoolean
  })
  .partial()
  .optional()
