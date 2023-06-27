#!/usr/bin/env zx
import 'zx/globals'

import { writeFile } from 'fs/promises'
import { fastify } from 'fastify'
import { app } from '../dist/app-zod.js'

const FILE_PATH = '../openapi.yml'

const server = fastify().register(app)
await server.listen({ port: 3000 })

const response = await server.inject().get('/api/docs/yaml')
await writeFile(FILE_PATH, response.body)
await $`prettier --write ${FILE_PATH}` // format file for caching

await server.close()
