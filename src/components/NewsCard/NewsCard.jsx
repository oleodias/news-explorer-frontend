import { formatDate } from '../../utils/date.js';
import './NewsCard.css';

// Um cartão de notícia. variant 'search' (resultados da busca: ícone de
// salvar) ou 'saved' (artigos salvos: palavra-chave e lixeira).
// O cartão inteiro é um link para a notícia, que abre em nova guia; o botão
// fica fora do link, porque um botão dentro de um <a> não é HTML válido.
function NewsCard({
  article,
  variant,
  isLoggedIn,
  isSaved,
  onSaveClick,
  onDeleteClick,
}) {
  const { title, text, date, source, link, image, keyword } = article;
  const isSavedVariant = variant === 'saved';

  // Deslogado, o ícone de salvar fica inativo e mostra a dica no hover; a
  // lixeira mostra a sua dica sempre.
  let tooltip = '';
  if (isSavedVariant) {
    tooltip = 'Remover dos salvos';
  } else if (!isLoggedIn) {
    tooltip = 'Faça o login para salvar os artigos';
  }

  function handleButtonClick() {
    if (isSavedVariant) {
      onDeleteClick(article);
    } else {
      onSaveClick(article);
    }
  }

  let buttonModifier = 'news-card__button_type_save';
  if (isSavedVariant) {
    buttonModifier = 'news-card__button_type_delete';
  } else if (isSaved) {
    buttonModifier = 'news-card__button_type_saved';
  } else if (!isLoggedIn) {
    buttonModifier = 'news-card__button_type_save news-card__button_inactive';
  }

  const buttonLabel =
    isSavedVariant || isSaved ? 'Remover dos salvos' : 'Salvar o artigo';

  return (
    <li className='news-card'>
      <a
        className='news-card__link'
        href={link}
        rel='noopener noreferrer'
        target='_blank'
      >
        <img alt={title} className='news-card__image' src={image} />
        <div className='news-card__content'>
          <time className='news-card__date' dateTime={date}>
            {formatDate(date)}
          </time>
          <h3 className='news-card__title'>{title}</h3>
          <p className='news-card__text'>{text}</p>
          <p className='news-card__source'>{source}</p>
        </div>
      </a>
      {isSavedVariant && <p className='news-card__keyword'>{keyword}</p>}
      <button
        aria-label={buttonLabel}
        className={`news-card__button ${buttonModifier}`}
        type='button'
        onClick={handleButtonClick}
      />
      {tooltip && <p className='news-card__tooltip'>{tooltip}</p>}
    </li>
  );
}

export default NewsCard;
