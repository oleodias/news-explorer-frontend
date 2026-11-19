import Popup from '../Popup/Popup.jsx';
import './InfoPopup.css';

// Pop-up de aviso: um título e um botão em forma de link. Serve para o
// "Cadastro concluído com sucesso!" (link "Entrar", que abre o login) e
// para avisar quando salvar ou excluir um artigo falha (link "Fechar").
function InfoPopup({ title, linkText, onLinkClick, onClose }) {
  return (
    <Popup name='info' onClose={onClose}>
      <h2 className='info-popup__title'>{title}</h2>
      <button className='info-popup__link' type='button' onClick={onLinkClick}>
        {linkText}
      </button>
    </Popup>
  );
}

export default InfoPopup;
