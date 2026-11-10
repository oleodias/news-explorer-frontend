import SearchForm from '../SearchForm/SearchForm.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import NewsCardList from '../NewsCardList/NewsCardList.jsx';
import About from '../About/About.jsx';
import {
  NOT_FOUND_MESSAGE,
  NOT_FOUND_TITLE,
  SEARCH_ERROR_MESSAGE,
} from '../../utils/constants.js';
import './Main.css';

// Página principal. O bloco de resultados depende do estado da busca, que
// o App controla: 'idle' (nenhuma busca ainda: nada aparece), 'loading',
// 'success', 'not-found' ou 'error'.
function Main({
  searchStatus,
  articles,
  keyword,
  isLoggedIn,
  savedArticles,
  onSearch,
  onSaveClick,
}) {
  return (
    <main className='main'>
      <SearchForm
        initialKeyword={keyword}
        isLoading={searchStatus === 'loading'}
        onSearch={onSearch}
      />
      {searchStatus === 'loading' && <Preloader />}
      {searchStatus === 'not-found' && (
        <NotFound message={NOT_FOUND_MESSAGE} title={NOT_FOUND_TITLE} />
      )}
      {searchStatus === 'error' && <NotFound message={SEARCH_ERROR_MESSAGE} />}
      {searchStatus === 'success' && (
        <section className='results'>
          <h2 className='results__title'>Procurar resultados</h2>
          <NewsCardList
            key={keyword}
            articles={articles}
            isLoggedIn={isLoggedIn}
            isPaginated
            savedArticles={savedArticles}
            variant='search'
            onSaveClick={onSaveClick}
          />
        </section>
      )}
      <About />
    </main>
  );
}

export default Main;
