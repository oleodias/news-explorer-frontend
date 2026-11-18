import Popup from '../Popup/Popup.jsx';
import './PopupWithForm.css';

// Um pop-up com formulário: título, os campos (children), a mensagem de erro
// do servidor, o botão de envio e o link para trocar de pop-up ("ou
// Inscreva-se" / "ou Entre"). O botão fica desativado até o formulário
// inteiro ser válido.
function PopupWithForm({
  name,
  title,
  buttonText,
  isValid,
  serverError,
  altText,
  altLinkText,
  onAltClick,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <Popup name={name} onClose={onClose}>
      <h2 className='popup-form__title'>{title}</h2>
      <form className='popup-form' name={name} noValidate onSubmit={onSubmit}>
        {children}
        <p className='popup-form__server-error' role='alert'>
          {serverError}
        </p>
        <button
          className='popup-form__submit'
          disabled={!isValid}
          type='submit'
        >
          {buttonText}
        </button>
      </form>
      <p className='popup-form__alt'>
        {altText}{' '}
        <button
          className='popup-form__alt-link'
          type='button'
          onClick={onAltClick}
        >
          {altLinkText}
        </button>
      </p>
    </Popup>
  );
}

export default PopupWithForm;
