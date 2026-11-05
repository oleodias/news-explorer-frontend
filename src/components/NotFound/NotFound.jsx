import notFoundIcon from '../../images/not-found.svg';
import './NotFound.css';

// "Nada encontrado" e também a mensagem de erro da busca: o desenho é o
// mesmo, só mudam o título e o texto.
function NotFound({ title, message }) {
  return (
    <section className='not-found'>
      <img alt='' className='not-found__icon' src={notFoundIcon} />
      {title && <h2 className='not-found__title'>{title}</h2>}
      <p className='not-found__message'>{message}</p>
    </section>
  );
}

export default NotFound;
