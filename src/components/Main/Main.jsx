import SearchForm from '../SearchForm/SearchForm.jsx';
import About from '../About/About.jsx';

// Página principal: busca, resultados (cartões 6 e 7) e "Sobre o autor".
function Main({ onSearch }) {
  return (
    <main className='main'>
      <SearchForm onSearch={onSearch} />
      <About />
    </main>
  );
}

export default Main;
