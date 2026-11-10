import {
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
  NEWS_PAGE_SIZE,
  NEWS_PERIOD_DAYS,
} from './constants.js';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

// "2026-11-10": o formato de data que a News API espera em from e to.
function toApiDate(date) {
  return date.toISOString().slice(0, 10);
}

// O fetch só rejeita quando a rede falha; um 401 ou 429 da API chega no
// then() com res.ok === false e vira uma rejeição aqui.
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Erro ${res.status}`));
}

// Converte um artigo da News API nos campos que o resto do app usa, os
// mesmos do modelo "article" do back-end (Fase 2). A palavra-chave entra
// aqui porque a API não a devolve.
function normalizeArticle(apiArticle, keyword) {
  return {
    keyword,
    title: apiArticle.title,
    text: apiArticle.description,
    date: apiArticle.publishedAt,
    source: apiArticle.source.name,
    link: apiArticle.url,
    image: apiArticle.urlToImage,
  };
}

// Artigos retirados do ar voltam como "[Removed]", e alguns vêm sem imagem
// ou sem resumo: esses ficam de fora, porque o cartão (e depois o back-end)
// precisa de todos os campos.
function isComplete(apiArticle) {
  return (
    apiArticle.title &&
    apiArticle.title !== '[Removed]' &&
    apiArticle.description &&
    apiArticle.url &&
    apiArticle.urlToImage
  );
}

export function getArticles(keyword) {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - NEWS_PERIOD_DAYS * DAY_IN_MS);

  // URLSearchParams monta a query string e codifica acentos e espaços.
  const params = new URLSearchParams({
    q: keyword,
    from: toApiDate(weekAgo),
    to: toApiDate(today),
    pageSize: NEWS_PAGE_SIZE,
    apiKey: NEWS_API_KEY,
  });

  return fetch(`${NEWS_API_BASE_URL}/everything?${params}`)
    .then(checkResponse)
    .then((data) =>
      data.articles
        .filter(isComplete)
        .map((apiArticle) => normalizeArticle(apiArticle, keyword)),
    );
}
