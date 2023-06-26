import { writeFile } from 'fs/promises'
import { fastify } from 'fastify'
import { app } from '../dist/app-zod.js'

const server = fastify().register(app)
await server.listen({ port: 3000 })

const response = await server.inject().get('/api/docs/yaml')
await writeFile('../openapi.yaml', response.body)

await server.close()
