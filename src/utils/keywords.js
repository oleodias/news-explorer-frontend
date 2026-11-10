// Palavras-chave dos artigos salvos, da mais usada para a menos usada.
// Ex.: [natureza, Natureza, yellowstone] → ['natureza', 'yellowstone'].
// Em minúsculas, para "Natureza" e "natureza" contarem como uma só; a
// maiúscula inicial volta na tela, pelo CSS (text-transform).
export function getKeywordsByPopularity(articles) {
  const counts = {};
  for (const article of articles) {
    const keyword = article.keyword.toLowerCase();
    counts[keyword] = (counts[keyword] || 0) + 1;
  }
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
}

// "artigo salvo" ou "artigos salvos", conforme a quantidade.
export function getSavedWord(count) {
  return count === 1 ? 'artigo salvo' : 'artigos salvos';
}
