import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';

const INITIAL_VALUES = { email: '', password: '', name: '' };

function RegisterPopup({ serverError, onClose, onRegister, onSwitchToLogin }) {
  const { values, errors, isValid, handleChange } =
    useFormWithValidation(INITIAL_VALUES);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  // O nome segue as regras do back-end (2 a 30 caracteres): o erro aparece
  // aqui antes mesmo de a requisição sair.
  return (
    <PopupWithForm
      altLinkText='Entre'
      altText='ou'
      buttonText='Inscrever-se'
      isValid={isValid}
      name='register'
      serverError={serverError}
      title='Inscrever-se'
      onAltClick={onSwitchToLogin}
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
      <label className='popup-form__field'>
        <span className='popup-form__label'>Nome de usuário</span>
        <input
          className={`popup-form__input ${
            errors.name ? 'popup-form__input_invalid' : ''
          }`}
          maxLength={30}
          minLength={2}
          name='name'
          placeholder='Insira seu nome de usuário'
          required
          type='text'
          value={values.name}
          onChange={handleChange}
        />
        <span className='popup-form__error'>{errors.name}</span>
      </label>
    </PopupWithForm>
  );
}

export default RegisterPopup;
