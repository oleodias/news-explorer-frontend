import Popup from '../Popup/Popup.jsx';
import './InfoPopup.css';

// Aviso de cadastro concluído, com o atalho para o pop-up de login.
function InfoPopup({ onClose, onSwitchToLogin }) {
  return (
    <Popup name='info' onClose={onClose}>
      <h2 className='info-popup__title'>Cadastro concluído com sucesso!</h2>
      <button
        className='info-popup__link'
        type='button'
        onClick={onSwitchToLogin}
      >
        Entrar
      </button>
    </Popup>
  );
}

export default InfoPopup;
