import { createContext } from 'react';

// Os dados de quem está logado ({ name, email }), disponíveis para qualquer
// componente sem passar de pai para filho por props. O valor real vem do
// Provider no App; o valor padrão (objeto vazio) só vale fora dele.
export const CurrentUserContext = createContext({});
