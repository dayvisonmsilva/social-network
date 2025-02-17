import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('currentUser', username)
    navigate('/feed')
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