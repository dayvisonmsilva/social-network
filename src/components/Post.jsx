const Post = ({ post, onLike, liked }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return isNaN(date) ? 'Data inválida' : date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="user">@{post.authorId}</span>
        <span className="timestamp">{formatDate(post.createdAt)}</span>
      </div>
      
      <p className="post-content">{post.content}</p>

      <div className="post-actions">
        <button 
          onClick={() => onLike(post)}
          className={`like-button ${liked ? 'liked' : ''}`}
        >
          ❤️ {post.likes || 0}
        </button>
      </div>
    </div>
  );
};

// Exportação padrão obrigatória
export default Post;