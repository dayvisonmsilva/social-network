import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const USER_API = 'https://206sbfe9yh.execute-api.us-east-1.amazonaws.com/dev/users'

const Login = () => {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (username.trim()) {
      try {
        await fetch(USER_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: username,
            name: username
          })
        })
      } catch (error) {
        console.error("Erro ao criar usuário:", error)
      }
      localStorage.setItem('currentUser', username)
      navigate('/feed')
    }
  }

  return (
    <div className="login-container">
      <h1>SocialVite</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escolha seu username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <button type="submit">Acessar</button>
      </form>
    </div>
  )
}

export default Login
