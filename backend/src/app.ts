import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
import { fastifyRequestContext } from '@fastify/request-context'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'

import type { FastifyPluginAsync } from 'fastify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // Plug in zod type provider
  fastify.setSerializerCompiler(serializerCompiler)
  fastify.setValidatorCompiler(validatorCompiler)

  fastify.register(fastifyRequestContext)

  // Make zod type provider work with OpenAPI
  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'SampleApi',
        description: 'Sample backend service',
        version: '1.0.0'
      },
      servers: []
    },
    transform: jsonSchemaTransform
  })

  fastify.register(fastifySwaggerUI, {
    routePrefix: '/api/docs'
  })

  fastify.after(() => {
    // We need to load the routes *after* the swagger stuff has been installed.
    fastify.register(AutoLoad, {
      dir: join(__dirname, 'routes'),
      options: opts
    })
  })
}

export default app
export { app, options }
