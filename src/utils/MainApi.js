import { MAIN_API_BASE_URL, SERVER_ERROR_MESSAGE } from './constants.js';

// Requisições à API própria (news-explorer-backend). Cada função devolve a
// promessa do fetch; quem chama (o App) decide o que fazer no then() e
// trata o erro no catch(), no fim da cadeia.

// O fetch só rejeita quando a rede falha. Uma resposta 400, 401 ou 409
// chega no then() com res.ok === false: aqui ela vira uma rejeição com a
// mensagem que o back-end mandou ({ message }), para o formulário mostrar
// "Este e-mail já está cadastrado" ou "E-mail ou senha incorretos".
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res
    .json()
    .catch(() => ({})) // corpo que não é JSON (ex.: 502 do Nginx)
    .then((body) => {
      // O status vai junto no erro: o App precisa saber se foi um 401
      // (token vencido ou inválido) ou outra falha.
      const error = new Error(body.message || SERVER_ERROR_MESSAGE);
      error.status = res.status;
      return Promise.reject(error);
    });
}

// Monta os cabeçalhos: JSON sempre; Authorization só quando há token.
function getHeaders(token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function request(path, { method = 'GET', token, body } = {}) {
  return fetch(`${MAIN_API_BASE_URL}${path}`, {
    method,
    headers: getHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  }).then(checkResponse);
}

export function signup({ email, password, name }) {
  return request('/signup', {
    method: 'POST',
    body: { email, password, name },
  });
}

export function signin({ email, password }) {
  return request('/signin', { method: 'POST', body: { email, password } });
}

export function getCurrentUser(token) {
  return request('/users/me', { token });
}

export function getSavedArticles(token) {
  return request('/articles', { token });
}

// O corpo leva só os campos do artigo; o dono quem decide é o back-end,
// pelo token.
export function saveArticle(article, token) {
  const { keyword, title, text, date, source, link, image } = article;
  return request('/articles', {
    method: 'POST',
    token,
    body: { keyword, title, text, date, source, link, image },
  });
}

export function deleteArticle(articleId, token) {
  return request(`/articles/${articleId}`, { method: 'DELETE', token });
}
