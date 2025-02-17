import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser') || 'Usuário';

  const handleLogout = () => {
    // Simulação de logout
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="logo" onClick={() => navigate('/feed')}>
          SocialVite
        </h1>
        
        <div className="user-actions">
          <span className="username">@{currentUser}</span>
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;