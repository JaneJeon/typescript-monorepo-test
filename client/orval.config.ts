import { defineConfig } from 'orval'

export default defineConfig({
  service: {
    input: '../openapi.yaml',
    output: {
      target: './src/index.ts',
      client: 'react-query'
    }
  }
})
