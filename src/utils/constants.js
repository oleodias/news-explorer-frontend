// Valores fixos do projeto, em MAIÚSCULAS, num lugar só (pedido do
// checklist).

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

// News API. O plano gratuito só aceita chamadas feitas do localhost; no site
// publicado, as chamadas passam pelo proxy da TripleTen, que repassa para a
// News API. import.meta.env.DEV é true no `npm run dev` e false no build.
export const NEWS_API_BASE_URL = import.meta.env.DEV
  ? 'https://newsapi.org/v2'
  : 'https://news-api-proxy.up.railway.app/news/v2';
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
export const NEWS_PAGE_SIZE = 100; // máximo do plano gratuito
export const NEWS_PERIOD_DAYS = 7; // notícias da última semana

// Chave do localStorage onde fica a última busca.
export const SEARCH_STORAGE_KEY = 'news-explorer-search';

export const EMPTY_KEYWORD_MESSAGE = 'Por favor, insira uma palavra-chave';
