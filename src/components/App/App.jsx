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

  // Estado da busca (cartão 10 liga à News API).
  const [searchStatus] = useState('idle');
  const [articles] = useState([]);
  const [keyword] = useState('');
  const [savedArticles] = useState([]);

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

  function handleSearch(newKeyword) {
    // A busca na News API entra no cartão 10.
    console.log(newKeyword);
  }

  function handleSaveClick(article) {
    // Salvar artigos depende do back-end (Fases 2 e 3).
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
    </div>
  );
}

export default App;
