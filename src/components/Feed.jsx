import { useState, useEffect } from 'react'
import Post from './Post'
import Header from './Header'

const POSTS_API = 'https://eql90qiekd.execute-api.us-east-1.amazonaws.com/dev/posts'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [likedPosts, setLikedPosts] = useState([]) // Armazena os IDs dos posts curtidos nesta sessão
  const currentUser = localStorage.getItem('currentUser') || 'Anônimo'

  // Busca os posts do banco via API
  const fetchPosts = async () => {
    try {
      const res = await fetch(POSTS_API);
      const data = await res.json();
      
      // Ordenar posts por data de criação (mais recente primeiro)
      const sortedPosts = data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts()
  }, [])

  // Criação de novo post via API
  const handleNewPost = async () => {
    if (newPost.trim()) {
      const postData = {
        content: newPost,
        authorId: currentUser
      }
      try {
        const res = await fetch(POSTS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        })
        if (res.ok) {
          const createdPost = await res.json()
          setPosts([createdPost, ...posts])
          setNewPost('')
        } else {
          console.error("Erro ao criar post:", res.statusText)
        }
      } catch (error) {
        console.error("Erro ao criar post:", error)
      }
    }
  }

  // Função para tratar likes (curtir/descurtir)
  const handleLike = async (post) => {
    // Definindo o id do post (a API retorna o campo 'postId')
    const postId = post.postId || post.id
    const isLiked = likedPosts.includes(postId)
    try {
      const res = await fetch(`${POSTS_API}/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: isLiked ? 'unlike' : 'like' })
      })
      if (res.ok) {
        // Atualiza o estado local para refletir o like/deslike
        if (isLiked) {
          setLikedPosts(likedPosts.filter(id => id !== postId))
          setPosts(posts.map(p => (p.postId === postId || p.id === postId)
            ? { ...p, likes: p.likes - 1 }
            : p))
        } else {
          setLikedPosts([...likedPosts, postId])
          setPosts(posts.map(p => (p.postId === postId || p.id === postId)
            ? { ...p, likes: p.likes + 1 }
            : p))
        }
      } else {
        console.error("Erro ao atualizar like:", res.statusText)
      }
    } catch (error) {
      console.error("Erro ao atualizar like:", error)
    }
  };

  return (
    <div className="feed-container">
      <Header />

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
        {posts.map((post) => {
          const postId = post.postId || post.id
          const liked = likedPosts.includes(postId)
          return (
            <Post key={postId} post={post} onLike={handleLike} liked={liked} />
          )
        })}
      </div>
    </div>
  )
}

export default Feed
