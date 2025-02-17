import { useState, useEffect } from 'react'
import Post from './Post'
import Header from './Header'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const currentUser = localStorage.getItem('currentUser') || 'Anônimo'

  useEffect(() => {
    // Mock de dados iniciais
    const mockPosts = [
      {
        id: 1,
        content: 'Bem-vindo ao SocialVite! 🚀',
        user: 'admin',
        likes: 42,
        timestamp: '2024-01-01T12:00:00Z'
      }
    ]
    setPosts(mockPosts)
  }, [])

  const handleNewPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        content: newPost,
        user: currentUser,
        likes: 0,
        timestamp: new Date().toISOString()
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  return (
    <div className="feed-container">
      <Header />  {/* Substitui o header antigo */}

      <div className="new-post">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Compartilhe algo..."
          rows={3}
        />
        <div className="post-actions">
          <button onClick={handleNewPost} disabled={!newPost.trim()}>
            <svg className="icon" viewBox="0 0 24 24" fill="none">
              <path d="M3 20.5V4L21 12L3 20.5ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17Z" fill="currentColor" />
            </svg>
            Publicar
          </button>
        </div>
      </div>

      <div className="posts-list">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Feed