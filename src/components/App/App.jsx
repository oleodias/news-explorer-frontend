import { useEffect, useState } from 'react';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import LoginPopup from '../LoginPopup/LoginPopup.jsx';
import RegisterPopup from '../RegisterPopup/RegisterPopup.jsx';
import InfoPopup from '../InfoPopup/InfoPopup.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { getArticles } from '../../utils/NewsApi.js';
import {
  getCurrentUser,
  getSavedArticles,
  signin,
  signup,
} from '../../utils/MainApi.js';
import {
  SEARCH_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
  UNAUTHORIZED_STATUS,
} from '../../utils/constants.js';
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

// O estado inicial da busca a partir do que foi guardado: nada guardado é
// 'idle'; com artigos é 'success'; uma busca sem artigos é 'not-found'.
function getInitialStatus(storedSearch) {
  if (!storedSearch) {
    return 'idle';
  }
  return storedSearch.articles?.length > 0 ? 'success' : 'not-found';
}

// Os dados de quem entrou e os artigos salvos, pedidos juntos: o
// Promise.all espera as duas respostas (e rejeita se qualquer uma falhar).
function getUserData(token) {
  return Promise.all([getCurrentUser(token), getSavedArticles(token)]);
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Enquanto o token guardado é conferido no servidor, ainda não se sabe se
  // a pessoa está logada. Sem token, não há o que conferir: começa false.
  const [isCheckingAuth, setIsCheckingAuth] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_STORAGE_KEY)),
  );
  // Os dados de quem está logado ({ name, email }), que o Provider entrega
  // aos componentes. Objeto vazio enquanto ninguém entrou.
  const [currentUser, setCurrentUser] = useState({});

  // A busca começa com o que estiver guardado no localStorage: ao reabrir a
  // aba, os resultados voltam já na montagem do App. A função passada ao
  // useState roda só no primeiro render, e não a cada atualização.
  // Uma busca guardada sem artigos volta como "Nada encontrado", e não
  // como a busca anterior a ela.
  const [storedSearch] = useState(getStoredSearch);
  const [searchStatus, setSearchStatus] = useState(
    getInitialStatus(storedSearch),
  );
  const [articles, setArticles] = useState(storedSearch?.articles ?? []);
  const [keyword, setKeyword] = useState(storedSearch?.keyword ?? '');
  const [savedArticles, setSavedArticles] = useState([]);

  // Qual pop-up está aberto: null, 'login', 'register' ou 'success'. Um só
  // estado garante que nunca haja dois abertos ao mesmo tempo.
  const [activePopup, setActivePopup] = useState(null);
  // A mensagem de erro que o servidor mandou ao cadastrar ou entrar
  // ("Este e-mail já está cadastrado"), mostrada no formulário.
  const [serverError, setServerError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // Na principal o cabeçalho é claro, sobre a foto; na de salvos, escuro.
  const headerTheme = location.pathname === '/saved-news' ? 'dark' : 'light';

  // A rota protegida mandou para / porque a pessoa não estava logada (ver
  // ProtectedRoute): enquanto o aviso estiver no state da navegação, o
  // pop-up de login aparece. É um valor derivado, calculado a cada render,
  // e não um estado a mais sincronizado por efeito.
  const isLoginRequired = Boolean(location.state?.isLoginRequired);
  const shownPopup = isLoginRequired ? 'login' : activePopup;

  // Ao abrir (ou reabrir) a aba: se há um token guardado, ele é conferido
  // no servidor e, se valer, a sessão volta com o nome e os artigos salvos.
  // Roda uma vez só, na montagem do App (lista de dependências vazia).
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      return;
    }
    getUserData(token)
      .then(([user, userArticles]) => {
        setCurrentUser(user);
        setSavedArticles(userArticles);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        // Só um 401 (token vencido ou inválido) apaga o token. Se a API
        // estiver fora do ar, o token continua para a próxima visita.
        if (error.status === UNAUTHORIZED_STATUS) {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      })
      .finally(() => setIsCheckingAuth(false));
  }, []);

  // Toda troca de pop-up limpa o erro do servidor: a mensagem do login não
  // pode aparecer no cadastro, nem continuar lá ao reabrir.
  function openPopup(popupName) {
    setServerError('');
    setActivePopup(popupName);
    // Fechar ou trocar o pop-up aberto pela rota protegida apaga o aviso
    // do state da navegação (replace: sem criar outra entrada no
    // histórico), senão o pop-up de login continuaria aberto.
    if (isLoginRequired) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }

  function handleSignInClick() {
    openPopup('login');
  }

  function handleClosePopup() {
    openPopup(null);
  }

  function handleSwitchToRegister() {
    openPopup('register');
  }

  function handleSwitchToLogin() {
    openPopup('login');
  }

  // Cadastro: sucesso abre o aviso "Cadastro concluído com sucesso!" (como
  // no Figma), que tem o link para entrar.
  function handleRegister(values) {
    signup(values)
      .then(() => openPopup('success'))
      .catch((error) => setServerError(error.message));
  }

  // Login: guarda o token, busca os dados de quem entrou e os artigos
  // salvos, e só então troca o cabeçalho e fecha o pop-up.
  function handleLogin(values) {
    signin(values)
      .then(({ token }) => {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
        return getUserData(token);
      })
      .then(([user, userArticles]) => {
        setCurrentUser(user);
        setSavedArticles(userArticles);
        setIsLoggedIn(true);
        openPopup(null);
      })
      .catch((error) => setServerError(error.message));
  }

  // Sair apaga o token: sem ele, a próxima visita começa deslogada.
  function handleSignOut() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setCurrentUser({});
    setSavedArticles([]);
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
        // Toda busca que a API respondeu é guardada, mesmo sem artigos.
        // Se só as buscas com resultado fossem gravadas, uma busca vazia
        // não substituiria a anterior, e ao recarregar a página a busca
        // antiga reapareceria. Com erro de conexão não há busca concluída,
        // então o que estava guardado fica como está.
        localStorage.setItem(
          SEARCH_STORAGE_KEY,
          JSON.stringify({ keyword: newKeyword, articles: foundArticles }),
        );
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
      openPopup('register');
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

  // O Provider entrega o currentUser (estado do App) a todos os componentes
  // de dentro dele, que o leem com useContext.
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          isLoggedIn={isLoggedIn}
          theme={headerTheme}
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
              <ProtectedRoute
                isCheckingAuth={isCheckingAuth}
                isLoggedIn={isLoggedIn}
              >
                <SavedNews
                  savedArticles={savedArticles}
                  onDeleteClick={handleDeleteClick}
                />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        <Footer />
        {shownPopup === 'login' && (
          <LoginPopup
            serverError={serverError}
            onClose={handleClosePopup}
            onLogin={handleLogin}
            onSwitchToRegister={handleSwitchToRegister}
          />
        )}
        {shownPopup === 'register' && (
          <RegisterPopup
            serverError={serverError}
            onClose={handleClosePopup}
            onRegister={handleRegister}
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
        {shownPopup === 'success' && (
          <InfoPopup
            onClose={handleClosePopup}
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
