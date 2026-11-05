// Converte a data da API ("2020-11-04T10:30:00Z") no formato do layout:
// "4 de novembro de 2020". O Intl.DateTimeFormat já sabe os nomes dos meses
// em português; não é preciso uma lista própria.
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(isoDate) {
  return dateFormatter.format(new Date(isoDate));
}
