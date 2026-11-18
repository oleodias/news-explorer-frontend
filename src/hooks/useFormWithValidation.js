import { useCallback, useState } from 'react';

// Mensagens próprias em vez das do navegador: as do navegador mudam com o
// idioma do sistema de quem usa, e o layout tem textos definidos.
function getErrorMessage(input) {
  const { validity } = input;
  if (validity.valueMissing) {
    return 'Esse é um campo obrigatório.';
  }
  if (validity.typeMismatch) {
    return 'E-mail inválido.';
  }
  if (validity.tooShort) {
    return `Mínimo de ${input.minLength} caracteres.`;
  }
  if (validity.tooLong) {
    return `Máximo de ${input.maxLength} caracteres.`;
  }
  return '';
}

// Validação a cada tecla: guarda os valores e os erros de todos os campos
// e diz se o formulário inteiro é válido (para ativar o botão). As regras
// ficam no próprio <input> (required, type="email", minLength); o hook só
// lê o resultado delas pela Constraint Validation API.
export function useFormWithValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const input = evt.target;
    const { name, value } = input;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: getErrorMessage(input) });
    setIsValid(input.closest('form').checkValidity());
  }

  // useCallback: a função é a mesma entre renders, então pode ser usada
  // em dependências de efeitos sem disparar o efeito a cada render.
  const resetForm = useCallback(
    (newValues = initialValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [initialValues],
  );

  return { values, errors, isValid, handleChange, resetForm };
}
