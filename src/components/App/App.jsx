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
import './App.css';

function App() {
  // Fase 1: o login ainda não fala com a API (isso é a Fase 3). O estado
  // existe para montar as duas versões do cabeçalho e a página de salvos.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser] = useState({ name: 'Leonardo' });

  const location = useLocation();
  const navigate = useNavigate();

  // Na principal o cabeçalho é claro, sobre a foto; na de salvos, escuro.
  const headerTheme = location.pathname === '/saved-news' ? 'dark' : 'light';

  // Provisório: o pop-up de login entra no cartão 8.
  function handleSignInClick() {
    setIsLoggedIn(true);
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    navigate('/');
  }

  function handleSearch(keyword) {
    // A busca na News API entra no cartão 10.
    console.log(keyword);
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
        <Route path='/' element={<Main onSearch={handleSearch} />} />
        <Route path='/saved-news' element={<SavedNews />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
