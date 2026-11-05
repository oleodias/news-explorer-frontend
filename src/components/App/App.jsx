import { Navigate, Route, Routes } from 'react-router-dom';
import Main from '../Main/Main.jsx';
import SavedNews from '../SavedNews/SavedNews.jsx';

function App() {
  // Duas páginas: a principal (busca) e a dos artigos salvos. Qualquer outro
  // endereço volta para a principal, para não existir página em branco.
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/saved-news' element={<SavedNews />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;
