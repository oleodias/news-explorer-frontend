// Palavras-chave dos artigos salvos, da mais usada para a menos usada.
// Ex.: [natureza, Natureza, yellowstone] → ['natureza', 'yellowstone'].
// Em minúsculas, para "Natureza" e "natureza" contarem como uma só; a
// maiúscula inicial volta na tela, com capitalize().
export function getKeywordsByPopularity(articles) {
  const counts = {};
  for (const article of articles) {
    const keyword = article.keyword.toLowerCase();
    counts[keyword] = (counts[keyword] || 0) + 1;
  }
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
}

// "natureza" → "Natureza". Feito aqui, e não com o text-transform:
// capitalize do CSS, porque o Chrome ignorava o capitalize na etiqueta do
// cartão (dentro do <li>), embora o uppercase funcionasse no mesmo lugar.
export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// "artigo salvo" ou "artigos salvos", conforme a quantidade.
export function getSavedWord(count) {
  return count === 1 ? 'artigo salvo' : 'artigos salvos';
}
