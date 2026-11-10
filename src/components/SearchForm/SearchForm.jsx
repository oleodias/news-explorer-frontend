import { useState } from 'react';
import { EMPTY_KEYWORD_MESSAGE } from '../../utils/constants.js';
import './SearchForm.css';

// O bloco da foto: título, subtítulo e o formulário de busca. O formulário
// só guarda o que está sendo digitado; o que fazer com a palavra-chave é
// decidido no App (onSearch), que faz a requisição à News API.
function SearchForm({ initialKeyword, isLoading, onSearch }) {
  // Começa com a palavra da última busca (vinda do localStorage pelo App).
  const [keyword, setKeyword] = useState(initialKeyword);
  const [isEmptyError, setIsEmptyError] = useState(false);

  function handleKeywordChange(evt) {
    setKeyword(evt.target.value);
    setIsEmptyError(false);
  }

  // Campo vazio (ou só espaços): a busca não sai, e o aviso aparece no
  // próprio campo, como no estado de erro do layout.
  function handleSubmit(evt) {
    evt.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      setKeyword('');
      setIsEmptyError(true);
      return;
    }
    onSearch(trimmedKeyword);
  }

  return (
    <section className='search'>
      <div className='search__content'>
        <h1 className='search__title'>O que está acontecendo no mundo?</h1>
        <p className='search__subtitle'>
          Encontre as últimas notícias sobre qualquer tema e salve elas em sua
          conta pessoal.
        </p>
        <form className='search-form' noValidate onSubmit={handleSubmit}>
          <input
            aria-invalid={isEmptyError}
            aria-label='Tema da busca'
            className={`search-form__input ${
              isEmptyError ? 'search-form__input_invalid' : ''
            }`}
            name='keyword'
            placeholder={isEmptyError ? EMPTY_KEYWORD_MESSAGE : 'Inserir tema'}
            type='text'
            value={keyword}
            onChange={handleKeywordChange}
          />
          <button
            className='search-form__button'
            disabled={isLoading}
            type='submit'
          >
            Procurar
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
