import { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard.jsx';
import { CARDS_PER_PAGE } from '../../utils/constants.js';
import './NewsCardList.css';

// A grade de cartões. Nos resultados da busca (isPaginated) mostra 3 de
// cada vez e o botão "Mostrar mais"; na página de salvos mostra todos.
// Uma busca nova recebe outra key no Main, então o React cria a lista do
// zero e a contagem volta para 3 sem precisar de efeito.
function NewsCardList({
  articles,
  variant,
  isPaginated,
  isLoggedIn,
  savedArticles,
  onSaveClick,
  onDeleteClick,
}) {
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  const visibleArticles = isPaginated
    ? articles.slice(0, visibleCount)
    : articles;
  const hasMore = isPaginated && visibleCount < articles.length;

  function handleShowMore() {
    setVisibleCount(visibleCount + CARDS_PER_PAGE);
  }

  // O mesmo artigo pode estar salvo: o link da notícia é o que os identifica.
  function checkIsSaved(article) {
    return savedArticles.some((saved) => saved.link === article.link);
  }

  return (
    <>
      <ul className='news-card-list'>
        {visibleArticles.map((article) => (
          <NewsCard
            key={article.link}
            article={article}
            isLoggedIn={isLoggedIn}
            isSaved={checkIsSaved(article)}
            variant={variant}
            onDeleteClick={onDeleteClick}
            onSaveClick={onSaveClick}
          />
        ))}
      </ul>
      {hasMore && (
        <button
          className='news-card-list__more'
          type='button'
          onClick={handleShowMore}
        >
          Mostrar mais
        </button>
      )}
    </>
  );
}

export default NewsCardList;
