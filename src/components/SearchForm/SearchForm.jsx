import { useState } from 'react';
import './SearchForm.css';

// O bloco da foto: título, subtítulo e o formulário de busca. O formulário
// só guarda o que está sendo digitado; o que fazer com a palavra-chave é
// decidido no App (onSearch), que faz a requisição à News API.
function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  function handleKeywordChange(evt) {
    setKeyword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearch(keyword.trim());
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
            aria-label='Tema da busca'
            className='search-form__input'
            name='keyword'
            placeholder='Inserir tema'
            type='text'
            value={keyword}
            onChange={handleKeywordChange}
          />
          <button className='search-form__button' type='submit'>
            Procurar
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
