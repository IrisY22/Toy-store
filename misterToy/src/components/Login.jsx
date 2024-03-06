import { useState } from "react"
import { login } from "../services/userServices"

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function onLogin() {
    if (!username || !password) return
    const user = {
      username,
      password
    }

    const loggedUser = await login(user)
    localStorage.setItem('user', JSON.stringify(loggedUser));
  }

  return (
    <div className="max-w-xs mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2">
          Username:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={onLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Login
        </button>
      </div>
    </div>
  )
}