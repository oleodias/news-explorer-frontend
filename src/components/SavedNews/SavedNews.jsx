import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.jsx';
import NewsCardList from '../NewsCardList/NewsCardList.jsx';
import './SavedNews.css';

// Página dos artigos salvos: a saudação com as palavras-chave e todos os
// cartões salvos, cada um com a sua palavra-chave e a lixeira.
function SavedNews({ userName, savedArticles, onDeleteClick }) {
  return (
    <main className='saved-news'>
      <SavedNewsHeader savedArticles={savedArticles} userName={userName} />
      {savedArticles.length > 0 && (
        <section className='saved-news__cards'>
          <NewsCardList
            articles={savedArticles}
            isLoggedIn
            savedArticles={savedArticles}
            variant='saved'
            onDeleteClick={onDeleteClick}
          />
        </section>
      )}
    </main>
  );
}

export default SavedNews;
