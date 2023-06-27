import { defineConfig } from 'orval'

export default defineConfig({
  reactQueryClient: {
    input: '../openapi.yml',
    output: {
      target: './src/react-query.ts',
      client: 'react-query'
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write'
    }
  },
  axiosClient: {
    input: '../openapi.yml',
    output: {
      target: './src/axios.ts',
      client: 'axios-functions'
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write'
    }
  }
})
