import { getKeywordsByPopularity, getSavedWord } from '../../utils/keywords.js';
import './SavedNewsHeader.css';

// Até 3 palavras-chave aparecem todas; com mais de 3, as 2 primeiras e
// "e N outras" (como no layout).
function SavedNewsHeader({ userName, savedArticles }) {
  const count = savedArticles.length;
  const keywords = getKeywordsByPopularity(savedArticles);
  const shownKeywords = keywords.length > 3 ? keywords.slice(0, 2) : keywords;
  const hiddenCount = keywords.length - shownKeywords.length;

  return (
    <section className='saved-news-header'>
      <p className='saved-news-header__label'>Artigos salvos</p>
      <h1 className='saved-news-header__title'>
        {count > 0
          ? `${userName}, você tem ${count} ${getSavedWord(count)}`
          : `${userName}, você ainda não tem artigos salvos`}
      </h1>
      {count > 0 && (
        <p className='saved-news-header__keywords'>
          Por palavras-chave:{' '}
          {shownKeywords.map((keyword, index) => (
            <span key={keyword}>
              {index > 0 &&
                (index === shownKeywords.length - 1 && hiddenCount === 0
                  ? ' e '
                  : ', ')}
              <strong className='saved-news-header__keyword'>{keyword}</strong>
            </span>
          ))}
          {hiddenCount > 0 && (
            <>
              {' e '}
              <strong className='saved-news-header__keyword'>
                {hiddenCount} {hiddenCount === 1 ? 'outra' : 'outras'}
              </strong>
            </>
          )}
        </p>
      )}
    </section>
  );
}

export default SavedNewsHeader;
