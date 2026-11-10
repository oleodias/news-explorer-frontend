import { useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import SavedNews from '../SavedNews/SavedNews.jsx';
import Footer from '../Footer/Footer.jsx';
import LoginPopup from '../LoginPopup/LoginPopup.jsx';
import RegisterPopup from '../RegisterPopup/RegisterPopup.jsx';
import InfoPopup from '../InfoPopup/InfoPopup.jsx';
import './App.css';

function App() {
  // Fase 1: o login ainda não fala com a API (isso é a Fase 3). O estado
  // existe para montar as duas versões do cabeçalho e a página de salvos.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser] = useState({ name: 'Leonardo' });

  // Estado da busca (cartão 10 liga à News API).
  const [searchStatus] = useState('idle');
  const [articles] = useState([]);
  const [keyword] = useState('');
  const [savedArticles] = useState([]);

  // Qual pop-up está aberto: null, 'login', 'register' ou 'success'. Um só
  // estado garante que nunca haja dois abertos ao mesmo tempo.
  const [activePopup, setActivePopup] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Na principal o cabeçalho é claro, sobre a foto; na de salvos, escuro.
  const headerTheme = location.pathname === '/saved-news' ? 'dark' : 'light';

  function handleSignInClick() {
    setActivePopup('login');
  }

  function handleClosePopup() {
    setActivePopup(null);
  }

  function handleSwitchToRegister() {
    setActivePopup('register');
  }

  function handleSwitchToLogin() {
    setActivePopup('login');
  }

  // Fase 1: login e cadastro ainda sem a API própria (Fase 3). O login só
  // troca o cabeçalho; o cadastro mostra o aviso de sucesso.
  function handleLogin() {
    setIsLoggedIn(true);
    setActivePopup(null);
  }

  function handleRegister() {
    setActivePopup('success');
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    navigate('/');
  }

  function handleSearch(newKeyword) {
    // A busca na News API entra no cartão 10.
    console.log(newKeyword);
  }

  function handleSaveClick(article) {
    // Deslogado, o clique em salvar abre o cadastro (pedido do checklist).
    if (!isLoggedIn) {
      setActivePopup('register');
      return;
    }
    // Salvar de verdade depende do back-end (Fases 2 e 3).
    console.log(article.link);
  }

  return (
    <div className='page'>
      <Header
        isLoggedIn={isLoggedIn}
        theme={headerTheme}
        userName={currentUser.name}
        onSignInClick={handleSignInClick}
        onSignOut={handleSignOut}
      />
      <Routes>
        <Route
          path='/'
          element={
            <Main
              articles={articles}
              isLoggedIn={isLoggedIn}
              keyword={keyword}
              savedArticles={savedArticles}
              searchStatus={searchStatus}
              onSaveClick={handleSaveClick}
              onSearch={handleSearch}
            />
          }
        />
        <Route path='/saved-news' element={<SavedNews />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Footer />
      {activePopup === 'login' && (
        <LoginPopup
          onClose={handleClosePopup}
          onLogin={handleLogin}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}
      {activePopup === 'register' && (
        <RegisterPopup
          onClose={handleClosePopup}
          onRegister={handleRegister}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
      {activePopup === 'success' && (
        <InfoPopup
          onClose={handleClosePopup}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </div>
  );
}

export default App;
