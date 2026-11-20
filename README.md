# NewsExplorer — front-end

Aplicação para buscar notícias de qualquer tema na [News API](https://newsapi.org)
e salvar as favoritas numa conta pessoal. É o front-end do Projeto Final do
curso de Desenvolvimento Web da TripleTen Brasil.

🌐 **No ar:** https://leonews.kaiak.top · API: https://api.leonews.kaiak.top

## 📅 Sprints

Projeto da Sprint 19 (Projeto Final), feito em etapas.

| Sprint       | O que foi feito neste repositório                                                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 19 — Etapa 1 | Marcação e estilos em React a partir do Figma, busca na News API, validação dos formulários, salvar e remover cartões (ainda sem back-end; login simulado) |
| 19 — Etapa 3 | Conexão com a API própria: cadastro, login com JWT, sessão que volta ao reabrir a aba, rota protegida e artigos salvos no banco; front-end no ar           |

O back-end (Etapa 2) fica no repositório
[news-explorer-backend](https://github.com/oleodias/news-explorer-backend).

## Telas

| Página inicial                                       | Pop-up de login                                      | Celular (320 px)                                               |
| ---------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| ![Página inicial](docs/screenshots/home-desktop.jpg) | ![Pop-up de login](docs/screenshots/login-popup.jpg) | ![Página inicial no celular](docs/screenshots/home-mobile.jpg) |

## Funcionalidades

- Busca por palavra-chave nas notícias dos últimos 7 dias, com pré-carregador,
  mensagem de "Nada encontrado" e mensagem de erro de conexão
- Resultados de 3 em 3 com o botão "Mostrar mais"
- A última busca fica guardada no `localStorage` e volta ao recarregar a página
- Pop-ups de login, cadastro e sucesso: fecham no X, com clique fora e com Esc
- Validação dos campos a cada tecla, com o botão desativado enquanto o
  formulário está inválido
- Cadastro e login na API própria; o JWT fica no `localStorage`, a sessão
  volta ao reabrir a aba e é apagada ao sair
- Salvar e excluir artigos no banco; página "Artigos salvos" protegida, com
  o nome, a quantidade de artigos e as palavras-chave por popularidade
- Mensagens de erro do servidor nos formulários e aviso quando salvar ou
  excluir falha
- Layout responsivo em três larguras (1440, 768 e 320 px), com menu suspenso
  no celular

## Tecnologias

- React 19, React Router 6 e Context API (usuário logado)
- Vite 8 (servidor de desenvolvimento e build)
- CSS puro com BEM Flat, um arquivo por componente
- Fontes locais (Roboto, Roboto Slab, Inter e Source Sans Pro) em WOFF2 e WOFF
- oxlint e Prettier

## Como rodar

Precisa do Node.js 20 ou mais novo.

```bash
git clone https://github.com/oleodias/news-explorer-frontend.git
cd news-explorer-frontend
npm install
cp .env.example .env   # e troque o valor pela sua chave da News API
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

Para cadastro, login e artigos salvos, rode também o
[back-end](https://github.com/oleodias/news-explorer-backend) em
`localhost:3000`: no modo de desenvolvimento, o app chama a API local; no
build, a API publicada.

> A chave gratuita da News API só funciona a partir de `localhost`. Por isso,
> no modo de desenvolvimento o app chama `newsapi.org` direto, e no build de
> produção chama o proxy da TripleTen (`news-api-proxy.up.railway.app`).

Outros comandos:

| Comando           | O que faz                              |
| ----------------- | -------------------------------------- |
| `npm run build`   | Gera a versão de produção em `dist/`   |
| `npm run preview` | Serve o build localmente para conferir |
| `npm run lint`    | Procura erros no código com o oxlint   |
| `npm run format`  | Formata o código com o Prettier        |

## Estrutura

```
src/
├── components/   um diretório por componente (JSX + CSS)
├── contexts/     CurrentUserContext
├── hooks/        useFormWithValidation
├── utils/        NewsApi, MainApi, constantes, datas, palavras-chave
├── images/
└── vendor/       normalize.css e fontes
```

## Autor

Leonardo Dias Caumo — [LinkedIn](https://www.linkedin.com/in/leonardodiascaumo) ·
[GitHub](https://github.com/oleodias)
