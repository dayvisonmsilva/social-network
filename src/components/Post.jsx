import React from 'react';

const Post = ({ post }) => {
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="user">@{post.user}</span>
        <span className="timestamp">{formatDate(post.timestamp)}</span>
      </div>

      <p className="post-content">{post.content}</p>

      <div className="post-actions">
        <button>
          <span role="img" aria-label="Comentários">💬</span>
          {post.comments?.length || 0}
        </button>

        <button>
          <span role="img" aria-label="Compartilhar">🔄</span>
        </button>

        <button>
          <span role="img" aria-label="Curtir">❤️</span>
          {post.likes}
        </button>
      </div>
    </div>
  );
};

// Exportação padrão obrigatória
export default Post;