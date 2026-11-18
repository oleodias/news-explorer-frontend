import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';

// Fora do componente: o mesmo objeto em todos os renders (é dependência do
// useCallback do hook).
const INITIAL_VALUES = { email: '', password: '' };

function LoginPopup({ serverError, onClose, onLogin, onSwitchToRegister }) {
  const { values, errors, isValid, handleChange } =
    useFormWithValidation(INITIAL_VALUES);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  return (
    <PopupWithForm
      altLinkText='Inscreva-se'
      altText='ou'
      buttonText='Entrar'
      isValid={isValid}
      name='login'
      serverError={serverError}
      title='Entrar'
      onAltClick={onSwitchToRegister}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup-form__field'>
        <span className='popup-form__label'>E-mail</span>
        <input
          className={`popup-form__input ${
            errors.email ? 'popup-form__input_invalid' : ''
          }`}
          name='email'
          placeholder='Insira e-mail'
          required
          type='email'
          value={values.email}
          onChange={handleChange}
        />
        <span className='popup-form__error'>{errors.email}</span>
      </label>
      <label className='popup-form__field'>
        <span className='popup-form__label'>Senha</span>
        <input
          className={`popup-form__input ${
            errors.password ? 'popup-form__input_invalid' : ''
          }`}
          name='password'
          placeholder='Insira a senha'
          required
          type='password'
          value={values.password}
          onChange={handleChange}
        />
        <span className='popup-form__error'>{errors.password}</span>
      </label>
    </PopupWithForm>
  );
}

export default LoginPopup;
