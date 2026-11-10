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
import { getArticles } from '../../utils/NewsApi.js';
import { SEARCH_STORAGE_KEY } from '../../utils/constants.js';
import './App.css';

// A última busca guardada no localStorage, ou null. O try protege contra
// um valor corrompido (JSON.parse lançaria um erro e a página não abriria).
function getStoredSearch() {
  try {
    return JSON.parse(localStorage.getItem(SEARCH_STORAGE_KEY));
  } catch {
    return null;
  }
}

function App() {
  // Fase 1: o login ainda não fala com a API (isso é a Fase 3). O estado
  // existe para montar as duas versões do cabeçalho e a página de salvos.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser] = useState({ name: 'Leonardo' });

  // A busca começa com o que estiver guardado no localStorage: ao reabrir a
  // aba, os resultados voltam já na montagem do App. A função passada ao
  // useState roda só no primeiro render, e não a cada atualização.
  const [storedSearch] = useState(getStoredSearch);
  const [searchStatus, setSearchStatus] = useState(
    storedSearch ? 'success' : 'idle',
  );
  const [articles, setArticles] = useState(storedSearch?.articles ?? []);
  const [keyword, setKeyword] = useState(storedSearch?.keyword ?? '');
  const [savedArticles, setSavedArticles] = useState([]);

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
    setKeyword(newKeyword);
    setSearchStatus('loading');

    getArticles(newKeyword)
      .then((foundArticles) => {
        setArticles(foundArticles);
        setSearchStatus(foundArticles.length > 0 ? 'success' : 'not-found');
        // Só uma busca com resultados é guardada para a próxima visita.
        if (foundArticles.length > 0) {
          localStorage.setItem(
            SEARCH_STORAGE_KEY,
            JSON.stringify({ keyword: newKeyword, articles: foundArticles }),
          );
        }
      })
      .catch((error) => {
        console.error(error);
        setArticles([]);
        setSearchStatus('error');
      });
  }

  function handleSaveClick(article) {
    // Deslogado, o clique em salvar abre o cadastro (pedido do checklist).
    if (!isLoggedIn) {
      setActivePopup('register');
      return;
    }
    // Fase 1: salvar e remover só no estado (some ao recarregar). Na Fase
    // 3 as duas ações passam a chamar a API própria.
    const isSaved = savedArticles.some((saved) => saved.link === article.link);
    if (isSaved) {
      handleDeleteClick(article);
    } else {
      setSavedArticles([article, ...savedArticles]);
    }
  }

  function handleDeleteClick(article) {
    setSavedArticles(
      savedArticles.filter((saved) => saved.link !== article.link),
    );
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
        <Route
          path='/saved-news'
          element={
            <SavedNews
              savedArticles={savedArticles}
              userName={currentUser.name}
              onDeleteClick={handleDeleteClick}
            />
          }
        />
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
