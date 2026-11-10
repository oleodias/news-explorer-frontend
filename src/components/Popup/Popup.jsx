import { useEffect } from 'react';
import './Popup.css';

// A moldura de todos os pop-ups: fundo escuro, caixa branca e o botão de
// fechar. Fecha no X, com clique no fundo e com a tecla Esc.
function Popup({ name, onClose, children }) {
  // O ouvinte do Esc só existe enquanto o pop-up está na tela: a função
  // devolvida pelo efeito o remove quando ele sai (sem vazamento).
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [onClose]);

  // Só o clique no próprio fundo fecha; um clique dentro da caixa chega
  // aqui com outro target e é ignorado.
  function handleOverlayMouseDown(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${name}`}
      onMouseDown={handleOverlayMouseDown}
    >
      <div aria-modal='true' className='popup__container' role='dialog'>
        <button
          aria-label='Fechar'
          className='popup__close'
          type='button'
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}

export default Popup;
