import './Preloader.css';

// O círculo gira enquanto a requisição está em andamento. role="status"
// faz o leitor de tela anunciar o texto.
function Preloader() {
  return (
    <section className='preloader' role='status'>
      <span className='preloader__circle' />
      <p className='preloader__text'>Procurando notícias...</p>
    </section>
  );
}

export default Preloader;
