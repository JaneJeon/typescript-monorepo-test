import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { getSampleApi } from 'client/axios'
import { useGetUsers, useGetUsersId } from 'client/react-query'
import { CreateUserBodyZod } from 'shared'

axios.defaults.baseURL = 'http://localhost:3000'

const { getUsersId } = getSampleApi()

function App() {
  const [count, setCount] = useState(0)

  getUsersId('id').then(val => val.data.createdAt)

  const { data, isLoading } = useGetUsers()
  data?.data[0].createdAt

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <p>Loaded users: {JSON.stringify(data, null, 2)}</p>
      )}
    </>
  )
}

export default App
