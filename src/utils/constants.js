// Valores fixos do projeto, em MAIÚSCULAS, num lugar só (pedido do
// checklist). Os da News API entram no cartão 10.

// Calculado uma vez, quando o módulo carrega, e não a cada render.
export const CURRENT_YEAR = new Date().getFullYear();

// Quantos cartões aparecem de início e a cada "Mostrar mais".
export const CARDS_PER_PAGE = 3;

// Textos dos estados da busca.
export const NOT_FOUND_TITLE = 'Nada encontrado';
export const NOT_FOUND_MESSAGE =
  'Desculpe, mas nada corresponde aos seus termos de pesquisa.';
export const SEARCH_ERROR_MESSAGE =
  'Desculpe, algo deu errado durante a solicitação. Pode haver um problema de conexão ou o servidor pode estar inativo. Por favor, tente novamente mais tarde.';
