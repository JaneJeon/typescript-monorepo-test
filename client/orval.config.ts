import { defineConfig } from 'orval'

export default defineConfig({
  service: {
    input: '../openapi.yml',
    output: {
      target: './src/index.ts',
      client: 'react-query'
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write'
    }
  }
})
