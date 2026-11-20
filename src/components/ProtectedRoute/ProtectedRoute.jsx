import { Navigate } from 'react-router-dom';

// HOC de rota protegida: envolve a página que só quem está logado pode ver.
// - ainda conferindo o token guardado: não mostra nada (sem isto, quem está
//   logado e recarrega /saved-news seria mandado para / antes de a
//   conferência terminar);
// - logado: mostra a página (children);
// - deslogado: volta para /, avisando pelo state da navegação que o pop-up
//   de login deve abrir.
function ProtectedRoute({ isLoggedIn, isCheckingAuth, children }) {
  if (isCheckingAuth) {
    return null;
  }
  if (!isLoggedIn) {
    return <Navigate replace state={{ isLoginRequired: true }} to='/' />;
  }
  return children;
}

export default ProtectedRoute;
